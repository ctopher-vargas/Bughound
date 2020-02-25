var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 	res.render('employees/index'); 
 //  connection.query($query, function(err, rows, fields){
	// 	if(err){
	// 		console.log("An error occured perfoming the query. "); 
	// 		return; 
	// 	}
	// 	console.log("Query succefully executed: ", rows); 
	// }); 

	// connection.end(function(){
		//the connection has been closed
});

router.get('/new', function(req, res, next){
	res.render('employees/new'); 
}); 

router.get('/edit', function(req, res, next){
	res.render('employees/edit'); 
}); 

router.get('/delete', function(req, res, next){
	res.render('employees/delete'); 
}); 

module.exports = router;
