const unLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("/patient/"+req.user._id.toString());
    return res.redirect("/patient/"+req.user._id.toString());
    //should be id included
  }
  console.log("not authenticated");
  return next();
};
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("authenticated");
    return next();
  } else {
    res.redirect("/patient/login");
  }
};
module.exports = {
  isLoggedIn,
  unLoggedIn,
};
