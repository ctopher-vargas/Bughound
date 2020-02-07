var express = require('express');
var router = express.Router();
var connection = require('../db');

router.get('/', function(req, res, next) {
	console.log('alex with node and mon');
	
  res.render('bugs');
 
});

router.get('/new', function(req, res, nex){
	
	//testing to see if my db is actually working
	 
	connection.query("SELECT * FROM people;", function(err, result){
		if(err) throw err; 
		console.log("result: "+ result[0]); 
		res.status(200).json({
			message: "good",
			people: result
		});
	}); 
}); 

router.get('/edit', function(req, res, nex){
	res.render('editbug'); 
})

module.exports = router;
