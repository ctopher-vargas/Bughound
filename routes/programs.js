var express = require('express');
var router = express.Router();
var connection = require('../db'); 
var middleWare = require('../middleware/index.js');
var fs = require('fs');
var parser = require('js2xmlparser');

//shows all programs
router.get('/', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next) {
	connection.query("SELECT * FROM programs;", function(err, results){
		if(err){throw err;}
		else{
			res.render('programs/index', {programs: results});
		}
	}); 
});
//add new program
router.get('/new', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next){
	res.render('programs/new'); 
}); 
//post route for adding new program
router.post('/', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, nex){
	var sql = 'INSERT INTO programs(program, program_release, program_version) VALUES(?, ?, ?)';
	connection.query(sql, [req.body.name, req.body.release, req.body.version], function(err, results){
		if(err) {throw err;}
		else{
			console.log(results);
			req.flash("success", req.body.name + " successfully entered in the database")
			res.redirect('/dbmaintance')
		}
	 }); 
}); 
//search for a specific program
router.get('/search', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next){
	connection.query("SELECT * FROM programs;", function(err, results){
		if(err){throw err;}
		else{
			if(results.length == 0){
				req.flash('error', 'There are no programs, please add a new one');
				res.redirect('/programs/new');
			}
			res.render('programs/search', {search: 'program', programs: results}); 
		}
	});
}); 
//search results
router.get('/search/results', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next){
	connection.query('SELECT * FROM programs WHERE program = ? ;', req.query.program, function(err, results){
		if(err) {throw err;}
		else{
			if(results.length == 0){
				req.flash('error', 'No program named "'+req.query.program+'" was found')
				res.redirect('/programs/search');
			}
			res.render('programs/edit', {programs: results});
		}
	});
}); 
//show edit page
router.get('/edit', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next){
	res.render('programs/edit');
}); 
//edit a specific program
router.get('/edit/:program_id', middleWare.isLoggedIn, function(req, res, next){
	connection.query('SELECT * FROM programs WHERE prog_id = ? ; ', req.params.program_id, function(err, results){
		if(err) {throw err;}
		else{
			res.render('programs/show', {program: results, method: ''}); 
		}
	}); 
}); 
//put route for editing a program
router.put('/:program_id', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next){
	console.log(req.body); 
	var sql = 'UPDATE programs SET program = ?, program_release = ?, program_version = ? WHERE prog_id = ?'; 
	connection.query(sql, [req.body.name, req.body.release, req.body.version, req.params.program_id], function(err, results){
		if(err) {throw err;}
		else{
			req.flash('success', req.body.name + " successfully updated")
			console.log('program: ' + req.params.program_id + ' updated');	
			res.redirect('/dbmaintance'); 
		}
	 }); 
}); 
//show delete page
router.get('/delete', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next){
	res.render('programs/delete'); 
});

//destroy for deleting a specific program
router.delete("/:program_id", middleWare.isLoggedIn, middleWare.isAdmin, function(req, res){
	var sql = "DELETE FROM programs WHERE prog_id = ?;";
	connection.query("DELETE FROM areas WHERE prog_id =?;", req.params.program_id, function(err, results){
		if(err){throw err;}
		else{
			connection.query('DELETE FROM programs WHERE prog_id = ?;', req.params.program_id, function(err, results){
				if(err){throw err;}
				else{
					req.flash('success', 'Progam successfully deleted');
					res.redirect('/dbmaintance');
				}
			});
		}
	});
});

//download programs xml
router.get('/download/xml', middleWare.isLoggedIn, middleWare.isAdmin, function (req, res, next) {
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
router.get('/download/ascii', middleWare.isLoggedIn, middleWare.isAdmin, function (req, res, next) {
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
