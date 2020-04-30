var middlewareObj = {}; 

//checks to make sure user is logged in
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next(); 
    } 
    req.flash('error', 'Please login');
    res.redirect("/login"); 
};
//makes it so that user cannot view log in page once logged in
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
