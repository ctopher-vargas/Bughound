var express = require('express');
var router = express.Router();
var connection = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
	connection.query("SELECT * FROM employees;", function(err, result){
		if(err) {throw err;}
		else{
			res.render('employees/index', {users: result});
		}
	}); 
});
//add new user 
router.get('/new', function(req, res, next){
	res.render('employees/new');
});
//post route for new user
router.post('/add', function(req, res, next) {
	var sql = `INSERT INTO employees(name, username, password, userlevel)VALUES(?, ?, ?, ?)`; 
	 connection.query(sql, [req.body.name, req.body.username, req.body.password, req.body.userLevel], function(err, result){
		if(err) {throw err;}
		else{
			console.log(result);
			res.redirect('/users'); 
		}
	 });
});
//post route for updating 
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
//put route for updating users
router.put('/', function(req, res, next){
	var sql = "UPDATE employees SET name = ?, username = ?, password = ?, userlevel = ? WHERE emp_id = ?;";
	console.log(req.body);
	console.log(req.get('referer') + 'in put');
	connection.query(sql, [req.body.name, req.body.username, req.body.password, req.body.userLevel, req.body.emp_id], function(err, result){
		if(err) {throw err;}
		else{
			res.redirect(303, req.get('referer'));
		}
	});
}); 

//route for deleting user
router.delete('/', function(req, res, next){
	console.log(req.body);
	connection.query("DELETE FROM employees WHERE emp_id = ?;", req.body.emp_id,function(err, result){
		if(err) {throw err;}
		else{
			res.redirect(303, req.get('referer'));
		}
	}); 
}); 
//search for users route 
router.get('/search', function(req, res, next){
	res.render('employees/search');
});
//search results
router.get('/employee', function(req, res, next) {
	connection.query("SELECT * FROM employees WHERE username = ?;", req.query.username,function(err, result){
		if(err) {throw err;}
		else{
			console.log(result);
			res.render('employees/edit', {users: result});
		}
	}); 
}); 

module.exports = router;

