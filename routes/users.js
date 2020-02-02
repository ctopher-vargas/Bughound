var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  connection.query($query, function(err, rows, fields){
		if(err){
			console.log("An error occured perfoming the query. "); 
			return; 
		}
		console.log("Query succefully executed: ", rows); 
	}); 

	connection.end(function(){
		//the connection has been closed
	}); 
});

module.exports = router;
