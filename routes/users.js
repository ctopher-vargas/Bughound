var express = require('express');
var router = express.Router();
var connection = require('../db');
/* GET users listing. */
router.get('/', function(req, res, next) {
  
  connection.query("SELECT * FROM people;", function(err, result){
	if(err) throw err; 
	console.log("result: "+ result[0]); 
}); 
res.send('respond with a resource');
});

module.exports = router;
