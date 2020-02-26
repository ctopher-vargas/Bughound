var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Bughound' });
});
//database maintance page
router.get('/dbmaintance', function(req, res, next){
	res.render('dbmaintance'); 
}); 
//login page
router.get('/login', function(req, res, next){
	res.render('login'); 
}); 

module.exports = router;
