const express = require("express");
const aboutRouter = express.Router();

aboutRouter.get("/aboutDiabetes", (req, res) => {
  res.render("../views/about/about_diabetes.hbs");
});

aboutRouter.get("/aboutWebsite", (req, res) => {
  res.render("../views/about/about_website.hbs");
});

module.exports = aboutRouter;
