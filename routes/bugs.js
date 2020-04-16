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
							res.render('bugs/new', { programs: programs, users: users, areas: areas, program_count: program_count });
						}
					}); 
				}
			});
		}
	});
}); 

router.post('/', function(req, res, next){
	var sql = 'INSERT INTO bugs(prog_id, area_id, report_type, severity, problem_summary, reproducible, problem,' +
			  'suggested_fix, reported_by, date, assigned_to, comments, status, priority, resolution,' + 
			  'resolution_version, resolved_by, resolved_date, tested_by, tested_date, treat_as) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'; 
	var reproducible = false; 
	if(req.body.reproducible){
		reproducible = true; 
	}

    connection.query(sql, [req.body.prog_id, req.body.area_id, req.body.report_type, req.body.severity,
    					   req.body.problem_summary, req.body.reproducible, req.body.problem, req.body.suggested_fix, 
    					   req.body.reported_by, req.body.date, req.body.assigned_to, req.body.comments,
    					   req.body.status, req.body.priority, req.body.resolution, req.body.resolution_version, 
    					   req.body.resolved_by, req.body.resolved_date, req.body.tested_by, req.body.tested_date, req.body.treat_as], function(err, result){
    	if(err){throw err; }
    	else {
    		console.log(result);
			req.flash("success", " bug successfully entered in the database")
			res.redirect('/home')
    	}
    }); 
});  

router.get('/edit', function(req, res, next){
	res.render('bugs/edit'); 
}); 

router.get('/search', function(req, res, next){
	res.render('bugs/search'); 
}); 

router.get('/delete', function(req, res, next){
	res.render('bugs/delete'); 
}); 

module.exports = router;
