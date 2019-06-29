exports.get404 = (req, res, next) => {
  res.status(400).send({ pageTitle: "Page Not Found",path:'/404' });
};
