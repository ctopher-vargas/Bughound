var express = require('express');
var router = express.Router();
var mysql = require('mysql'); 
var connection = require('../db'); 

router.get('/', function(req, res, next) {
	connection.query("SELECT bugs.bug_id, bugs.problem_summary, programs.program FROM bugs, programs WHERE bugs.prog_id = programs.prog_id;",
		function(err, results){
		if(err) {throw err;}
		else{
			res.render('bugs/index', {bugs: results});
		}

		});

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

router.post('/search', function (req, res, next) {

	let s = JSON.parse(JSON.stringify(req.body));

	let [sql, sqlParams] = constructSearchQuery(s);

	console.log(sql);
	console.log(sqlParams.toString());

	connection.query(sql, sqlParams, function (err, bugs) {
			if (err){throw err}
			else{
				res.render('bugs/index', {bugs: bugs});
			}
	});


});

router.get('/delete', function(req, res, next){
	res.render('bugs/delete'); 
});

function constructSearchQuery(s){
	let sql = '';
	let sqlParams = [];
	for (var key in s) {
		if (s.hasOwnProperty(key)) {
			sql += " bugs." + key + " = ? AND";
			sqlParams.push(s[key]);
		}
	}

	if(sqlParams.length === 0)
		sql =  "SELECT bugs.bug_id, programs.program, bugs.problem_summary from bugs INNER JOIN programs ON bugs.prog_id = programs.prog_id;";
	else{
		sql = "SELECT bugs.bug_id, programs.program, bugs.problem_summary FROM bugs INNER JOIN programs ON bugs.prog_id = programs.prog_id WHERE" + sql
		sql = sql.substring(0 , sql.length - 3);

	}
	return [sql, sqlParams];
}

module.exports = router;
