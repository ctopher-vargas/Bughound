var middlewareObj = {}; 


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next(); 
    } 
    req.flash('error', 'Please login');
    res.redirect("/login"); 
};

middlewareObj.notLoggedIn = function(req, res, next){
	 if(!req.isAuthenticated()){
        return next(); 
    } 
    //req.flash('error', 'Please login');
    res.redirect("/home"); 
};

middlewareObj.isLoggedIn2up = function(req, res, next){
    if(req.isAuthenticated() && req.user.userlevel > 1){
        return next();
    } else {
		req.flash('error', 'Not authorized');
	}
};

middlewareObj.isAdmin = function(req, res, next){
	if(req.isAuthenticated()){
		if(req.user.userlevel == 3) {
			return next(); 
		}
		else {
			req.flash('error', 'Must be an Admin'); 
			res.redirect("back"); 
		}
	}
};

module.exports = middlewareObj; 
