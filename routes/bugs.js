var express = require('express');
var router = express.Router();
var mysql = require('mysql'); 

var connection = mysql.createConnection({
	host		: process.env.DB_HOST,
	user 		: process.env.DB_USER, 
	password 	: process.env.DB_PW, 
	database 	: process.env.DB_NAME	
}); 

router.get('/', function(req, res, next) {
  res.render('bugs/index');
});

router.get('/new', function(req, res, next){
	// connection.connect(function(err) {
	// 	//in case of error
	// 	if(err){
	// 		console.log('que paso?');
	// 		console.log(err.code); 
	// 		console.log(err.fatal); 
	// 	} else {
	// 		console.log('database succesfully connected'); 

	// 	}
	// }); 
	//testing to see if my db is actually working
	res.render('bugs/new'); 
	// connection.query("SELECT * FROM bug", function(err, result){
	// 	if(err) throw err; 
	// 	console.log("result: "+ result[0]); 
	// }); 
}); 

router.get('/edit', function(req, res, next){
	res.render('bugs/edit'); 
}); 

router.get('/search', function(req, res, next){
	res.render('bugs/search'); 
}); 

router.get('/delete', function(req, res, next){
	res.render('bugs/delete'); 
}); 

module.exports = router;
