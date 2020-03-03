var express = require('express');
var router = express.Router();
var connection = require('../db'); 
var fs = require('fs');
var parser = require('js2xmlparser');
const jsonToTxt = require("json-to-txt");


//shows all programs
router.get('/', function(req, res, next) {
	connection.query("SELECT * FROM programs;", function(err, results){
		if(err){throw err;}
		else{
			res.render('programs/index', {programs: results});
		}
	}); 
});
//add new program
router.get('/new', function(req, res, next){
	res.render('programs/new'); 
}); 
//post route for adding new program
router.post('/', function(req, res, nex){
	var sql = 'INSERT INTO programs(program, program_release, program_version) VALUES(?, ?, ?)';

	connection.query(sql, [req.body.name, req.body.release, req.body.version], function(err, results){
		if(err) {throw err;}
		else{
			console.log(results);
			res.redirect('/programs')
		}
	 }); 
}); 
//search for a specific program
router.get('/search', function(req, res, next){
	res.render('programs/search'); 
}); 
//search results
router.get('/edit', function(req, res, next){
	console.log(req.query.program); 
	connection.query('SELECT * FROM programs WHERE program = ? ;', req.query.program, function(err, results){
		if(err) {throw err;}
		else{
			console.log(results); 
			res.render('programs/edit', {programs: results});
		}
	});
}); 
//show edit page
router.get('/edit', function(req, res, next){
	res.render('programs/edit');
}); 
//edit a specific program
router.get('/edit/:program_id', function(req, res, next){
	connection.query('SELECT * FROM programs WHERE prog_id = ? ; ', req.params.program_id, function(err, results){
		if(err) {throw err;}
		else{
			// console.log(req.params.program_id); 
			// console.log(results[0].prog_id); 
			res.render('programs/show', {program: results}); 
		}
	}); 
}); 
//put route for editing a program
router.put('/:program_id', function(req, res, next){
	console.log(req.body); 
	var sql = 'UPDATE programs SET program = ?, program_release = ?, program_version = ? WHERE prog_id = ?'; 
	connection.query(sql, [req.body.name, req.body.release, req.body.version, req.params.program_id], function(err, results){
		if(err) {throw err;}
		else{
			console.log('program: ' + req.params.program_id + ' updated');	
			res.redirect('/programs'); 
		}
	 }); 
}); 
//show delete page
router.get('/delete', function(req, res, next){
	res.render('programs/delete'); 
});

//destroy for deleting a specific program
router.delete("/:program_id", function(req, res){
	var sql = "DELETE FROM programs WHERE prog_id = ?;"
	connection.query(sql, req.params.program_id, function(err, results){
		if(err){throw err;}
		else{
			console.log("Program: " + req.param.prog_id + " deleted"); 
			res.redirect('/programs'); 
		}
	}); 
});

//download programs xml
router.get('/download/xml', function (req, res, next) {
	connection.query("SELECT * FROM programs;", function (err, result) {

		if (err) { throw err; }
		else {
            console.log(result);
			var object = { program: result };
			var xml = parser.parse("programs", object);
			fs.writeFile('programs.xml', xml, function (err, data) {
				if (err) {
					console.log(err);
				}
				else {
					res.download('programs.xml', function(err, data){
						console.log('programs downloaded');
					});
				}
			});
		}
	});

});

//download programs ascii
router.get('/download/ascii', function (req, res, next) {
	connection.query("SELECT * FROM programs;", function (err, result) {

		if (err) { throw err; }
		else {
			console.log(result);
			const textToWrite = result.map(getProgram).join('\n');
			fs.writeFile('programs.txt', textToWrite, function (err, data) {
				if (err) {
					console.log(err);
				}
				else {
					res.download('programs.txt', function(err, data){
						console.log('programs ascii downloaded');
					});
				}
			});
		}
	});

});

function getProgram(item) {
	var program = [item.prog_id,item.program, item.program_release, item.program_version].join(",");
	return program;
}
  
 


module.exports = router;
