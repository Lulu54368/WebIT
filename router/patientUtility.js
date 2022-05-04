const unLoggedIn = (req, res, next) =>{
    if(req.isAuthenticated()){
        return res.redirect('patient/home')
        //should be id included
    }
    next;
}
const isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/patient/login');
    }
}
module.exports = {
    isLoggedIn,
    unLoggedIn
}