const path = require("path");
const fs = require("fs");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "product.json"
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) cb([]);
    else cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imgUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      console.log("products47", products);

      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
