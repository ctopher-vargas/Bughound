var express = require('express');
var router = express.Router();
var connection = require('../db');
/* GET users listing. */
router.get('/', function(req, res, next) {
  
	connection.query("SELECT * FROM employees;", function(err, result){
		if(err) {throw err;}
		else{
			res.render('users', {users: result});
		}
	}); 
});

router.put('/:emp_id', function(req, res, next){
	console.log("from put");

	var sql = "UPDATE employees SET name = ?, username = ?, password = ?, userlevel = ? WHERE emp_id = ?;";

	console.log(req.body);
	connection.query(sql, [req.body.name, req.body.username, req.body.password, req.body.userLevel, req.params.emp_id], function(err, result){
		if(err) {throw err;}
		else{
			console.log(result);
		}
	 });


});

router.delete('/', function(req, res, next){
	console.log(req.body);

	connection.query("DELETE FROM employees WHERE emp_id = ?;", req.body.emp_id,function(err, result){
		if(err) {throw err;}
		else{
			console.log(result);
		}
	}); 

});
 

router.get('/employee', function(req, res, next) {
  
	connection.query("SELECT * FROM employees WHERE username = ?;", req.query.username,function(err, result){
		if(err) {throw err;}
		else{
			console.log(result);
			res.render('user', {users: result});
		}
	}); 
}); 

router.get('/add', function(req, res, next){

	res.render('addUser');

});

router.post('/add', function(req, res, next) {

	var sql = `INSERT INTO employees
            (
                name, username, password, userlevel
            )
            VALUES
            (
                ?, ?, ?, ?
            )`;
	 

	 connection.query(sql, [req.body.name, req.body.username, req.body.password, req.body.userLevel], function(err, result){
		if(err) {throw err;}
		else{
			console.log(result);
		}
	 }

	 );

});

router.post('/update/:emp_id', function(req, res, next){

	var sql = "UPDATE employees SET name = ?, username = ?, password = ?, userlevel = ? WHERE emp_id = ?;";

	console.log(req.body);
	connection.query(sql, [req.body.name, req.body.username, req.body.password, req.body.userLevel, req.params.emp_id], function(err, result){
		if(err) {throw err;}
		else{
			console.log(result);
		}
	 });

});



router.get('/search', function(req, res, next){
	res.render('search');
});

module.exports = router;
