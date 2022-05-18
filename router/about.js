const express = require("express");
const aboutRouter = express.Router();

aboutRouter.get("/aboutDiabetes", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("../views/about/about_diabetes_login.hbs");
  } else {
    res.render("../views/about/about_diabetes.hbs");
  }
});

aboutRouter.get("/aboutWebsite", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("../views/about/about_website_login.hbs");
  } else {
    res.render("../views/about/about_website.hbs");
  }
});

module.exports = aboutRouter;
