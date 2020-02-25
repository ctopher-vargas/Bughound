var express = require('express');
var areaRouter = express.Router();
var connection = require('../db');

areaRouter.get('/:id', function(req, res, next){

    connection.query("SELECT * FROM areas WHERE prog_id = ?;",req.params.id, function(err, result){
		if(err) {throw err;}
		else{
			res.render('areas', {areas: result, id: req.params.id});
		}
	}); 
});



areaRouter.post('/:id', function(req, res, next){

    console.log(req.body);

    var sql = `INSERT INTO areas
            (
                area, prog_id
            )
            VALUES
            (
                ?, ?
            )`;
	 

	 connection.query(sql, [req.body.area, req.params.id], function(err, result){
		if(err) {throw err;}
		else{
			res.redirect(req.get('referer'));
		}
	 }

	 );

});

areaRouter.put('/area/:id', function(req, res, next){

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

module.exports = areaRouter;