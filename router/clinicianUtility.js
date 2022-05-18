const unLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
     
      return res.redirect("/clinician/" + req.user._id.toString());
      //should be id included
    } else {
     
      return next();
    }
  };
  
  const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/clinician/login");
    }
  };
  
  module.exports = {
    isLoggedIn,
    unLoggedIn,
  };