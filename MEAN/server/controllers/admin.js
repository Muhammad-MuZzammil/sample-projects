const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getAddProducts = (req, res, next) => {
  res.status(200).send({
    pageTitle: "Add Product",
    path: "/admin/add-product"
  });
};

exports.postAddProducts = (req, res, next) => {
  const id = Math.random().toString();
  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(id, title, imgUrl, price, description);
  product.save();

  res.status(200).send(product);
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    Cart.getCart(cart => {
      console.log(cart)
      res.status(200).send({
        prod: products,
        cart: cart
      });
    });
  });
};
