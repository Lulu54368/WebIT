const express = require("express");
const aboutRouter = express.Router();

aboutRouter.get("/about_diabetes", (req, res) => {
  res.render("../views/about/aboutdiabetes.hbs");
});

aboutRouter.get("/about_website", (req, res) => {
  res.render("../views/about/aboutthiswebsite.hbs");
});

aboutRouter.get("/login", (req, res) => {
  res.render("../views/about/login.hbs");
});

module.exports = aboutRouter;
