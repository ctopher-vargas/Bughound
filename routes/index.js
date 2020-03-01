var express = require('express');
var router = express.Router();
var connection = require('../db'); 
var passport = require('passport');
var middleWare = require('../middleware/index.js'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Bughound' });
});
//database maintance page
router.get('/dbmaintance', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next){
	res.render('dbmaintance');
}); 
//login page
router.get('/login', function(req, res, next){
	res.render('login'); 
}); 

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), function(req, res) {
    res.redirect('/');
});

router.get("/logout", function(req, res){
    req.logout(); 
    req.flash("success", "logged out"); 
    res.redirect("/"); 
}); 

module.exports = router;
