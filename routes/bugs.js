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


	console.log(req.body);
	constructSearchQuery(req.body);
	const sql = "SELECT bugs.bug_id, bugs.problem_summary, programs.program FROM bugs INNER JOIN programs ON bugs.prog_id = programs.prog_id WHERE bugs.prog_id = ? AND severity = ? ;"
	connection.query(sql
	, [req.body.prog_id, req.body.report_type, req.body.severity, req.body.area_id, req.body.assigned_to], function (err, bugs) {
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
	let sql = "";
	let sqlParams = [];
	if(s.prog_id != null){
		sql += " prog_id = ? AND";
		sqlParams.push(s.prog_id);
	}
	if(s.report_type != null){
		sql += " report_type = ? AND";
		sqlParams.push(s.report_type);
	}
	if(s.severity != null){
		sql += " severity = ? AND";
		sqlParams.push(s.severity);
	}
	if(s.area_id != null){
		sql += " area_id = ? AND";
		sqlParams.push(s.area_id);
	}
	if (s.assigned_to != null){
		sql += " assigned_to = ? AND";
		sqlParams.push(s.assigned_to);
	}
	if(s.status != null){
		sql += " status = ? AND ";
		sqlParams.push(s.status);
	}
	if(s.priority != null){
		sql += " priority = ? AND";
		sqlParams.push(s.priority);
	}
	if(s.resolution != null){
		sql += " resolution = ?;";
		sqlParams.push(s.resolution);
	}

	console.log(sql.substring(sql.length -3 , sql.length) === "AND");

	if(sqlParams.length === 0)
		return "SELECT * from bugs;";
	console.log("SELECT * from bugs WHERE" + sql);
	return "SELECT * from bugs WHERE" + sql;

}

module.exports = router;
