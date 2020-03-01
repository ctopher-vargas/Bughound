var middlewareObj = {}; 


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next(); 
    } 
    req.flash('error', 'Please Login First');
    res.redirect("/login"); 
}

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
}

module.exports = middlewareObj; 
