const Cart = require("../models/cart");
const Product = require("../models/product");

exports.PostCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.status(200).send({
    status: true,
    msg: "Added in a cart",
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (const product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.status(200).send({
        products: cartProducts
      });
    });
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  // const prodId = JSON.parse(req.body.productId);
  const prodId = req.params.id;
  console.log(prodId);
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
  });
  res.status(200).send({ status: true, msg: "Cart successfully Deleted" });
};
