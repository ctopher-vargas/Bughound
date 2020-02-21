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

router.get('/user', function(req, res, next) {
  
	connection.query("SELECT * FROM employees WHERE username = ?;", req.query.username,function(err, result){
		if(err) {throw err;}
		else{
			res.render('users', {users: result});
		}
	}); 
}); 

router.get('/add', function(req, res, next){

	res.render('add_user');

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

router.get('/search', function(req, res, next){
	res.render('search');
});

module.exports = router;
