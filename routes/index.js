var express = require('express');
var router = express.Router();
var connection = require('../db'); 
var passport = require('passport');
var middleWare = require('../middleware/index.js'); 

///landing page
router.get('/', function(req, res, next) {
	res.render('landing');
});
//home page
router.get('/home', middleWare.isLoggedIn, function(req, res, next){
	res.render('index', { title: 'Bughound'});
});
//database maintance page
router.get('/dbmaintance', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next){
	res.render('dbmaintance');
}); 
//login page
router.get('/login', middleWare.notLoggedIn, function(req, res, next){
	res.render('login'); 
}); 
//login
router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), function(req, res) {
    res.redirect('/home');
});
//logout
router.get('/logout', function(req, res){
    req.logout(); 
    req.flash("success", "logged out"); 
    res.redirect("/login"); 
}); 
router.get('/export', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next){
	res.render('export');
}); 
router.get('/export/f', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next){
	res.redirect('../'+req.query.area+'/download/'+req.query.format)
});

module.exports = router;
