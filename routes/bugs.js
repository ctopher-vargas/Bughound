var express = require('express');
var router = express.Router();
var mysql = require('mysql'); 
var connection = require('../db'); 

router.get('/', function(req, res, next) {
  res.render('bugs/index');
});
//callback hell
router.get('/new', function(req, res, next){
	connection.query("SELECT prog_id, program FROM programs;", function(err, programs){
		if (err) { throw err; }
		else {
			connection.query("SELECT emp_id, username FROM employees;", function(err, users){
				if (err) { throw err; }
				else{
					connection.query("SELECT area_id, prog_id, area FROM areas;", function(err, areas){
						if (err) { throw err; }
						else {
							var program_count = Object.keys(programs).length;
							console.log(program_count);
							res.render('bugs/new', { programs: programs, users: users, areas: areas, program_count: program_count });
						}
					}); 
				}
			});
		}
	});
}); 

router.get('/edit', function(req, res, next){
	res.render('bugs/edit'); 
}); 

router.get('/search', function(req, res, next){

	connection.query("SELECT prog_id, program FROM programs;", function(err, programs){
		if (err) { throw err; }
		else {
			connection.query("SELECT emp_id, username FROM employees;", function(err, users){
				if (err) { throw err; }
				else{
					connection.query("SELECT area_id, prog_id, area FROM areas;", function(err, areas){
						if (err) { throw err; }
						else {
							var program_count = Object.keys(programs).length;
							console.log(program_count);
							res.render('bugs/search', { programs: programs, users: users, areas: areas, program_count: program_count });
						}
					});
				}
			});
		}
	});
}); 

router.get('/delete', function(req, res, next){
	res.render('bugs/delete'); 
}); 

module.exports = router;
