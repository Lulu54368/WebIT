const express = require("express");
const aboutRouter = express.Router();

aboutRouter.get("/about_diabetes", (req, res) => {
  res.render("../views/about/about_diabetes.hbs");
});

aboutRouter.get("/about_website", (req, res) => {
  res.render("../views/about/about_website.hbs");
});

aboutRouter.get("/login", (req, res) => {
  res.render("../views/about/login.hbs");
});

module.exports = aboutRouter;
