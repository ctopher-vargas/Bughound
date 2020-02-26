var express = require('express');
var router = express.Router();
var connection = require('../db');

//shows all programs to edit areas
router.get('/', function(req, res, next) {
	connection.query("SELECT * FROM programs;", function(err, results){
		if(err){throw err;}
		else{
			res.render('areas/search', {programs: results});
		}
	}); 
});
//get area
router.get('/:id', function(req, res, next){
    connection.query("SELECT * FROM areas WHERE prog_id = ?;",req.params.id, function(err, result){
		if(err) {throw err;}
		else{
			res.render('areas/index', {areas: result, id: req.params.id});
		}
	}); 
});
//add new area
router.post('/:id', function(req, res, next){
    console.log(req.body);
    var sql = 'INSERT INTO areas(area, prog_id) VALUES(?, ?)'; 
	connection.query(sql, [req.body.area, req.params.id], function(err, result){
		if(err) {throw err;}
		else{
			res.redirect(req.get('referer'));
		}
	});
});
//update area 
router.put('/area/:id', function(req, res, next){
    console.log(req.body);
    var sql = "UPDATE areas SET area = ? WHERE area_id = ?;";
	console.log(req.get('referer'));
	connection.query(sql, [req.body.updateAreaTxt, req.params.id], function(err, result){
		if(err) {throw err;}
		else{
			res.redirect(req.get('referer'));
		}
	 });
});

module.exports = router;