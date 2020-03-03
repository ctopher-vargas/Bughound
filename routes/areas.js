var express = require('express');
var router = express.Router();
var connection = require('../db');
var middleWare = require('../middleware/index.js');
var fs = require('fs');
var parser = require('js2xmlparser');

//shows all programs to edit areas
router.get('/', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next) {
	connection.query("SELECT * FROM programs;", function(err, results){
		if(err){throw err;}
		else{
			if(results.length == 0){
				req.flash('error', 'There are no programs, please add a new one')
				res.redirect('../programs/new')
			}
			res.render('areas/search', {programs: results});
		}
	}); 
});
//get area
router.get('/:id', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next){
    connection.query("SELECT * FROM areas WHERE prog_id = ?;",req.params.id, function(err, result){
		if(err) {throw err;}
		else{
			res.render('areas/index', {areas: result, id: req.params.id});
		}
	}); 
});
//add new area
router.post('/:id', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next){
    var sql = 'INSERT INTO areas(area, prog_id) VALUES(?, ?)'; 
	connection.query(sql, [req.body.area, req.params.id], function(err, result){
		if(err) {throw err;}
		else{
			req.flash('success', req.body.area + ' successfully added');
			res.redirect('/areas/'+req.params.id);
		}
	});
});
//update area
router.put('/:prog_id/:area_id', middleWare.isLoggedIn, middleWare.isAdmin,  function(req, res, next){
    var sql = "UPDATE areas SET area = ? WHERE area_id = ?;";
	console.log(req.get('referer'));
	connection.query(sql, [req.body.updateAreaTxt, req.params.area_id], function(err, result){
		if(err) {throw err;}
		else{
			req.flash('success', 'Area successfully updated');
			res.redirect('/areas/'+req.params.prog_id);
		}
	});
});
//delete area
router.delete('/:prog_id/:area_id', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next){
	connection.query("DELETE FROM areas WHERE area_id = ?;", req.params.area_id, function(err, result){
		if(err) {throw err;}
		else{
			req.flash('success', 'Area successfully deleted');
			res.redirect('/areas/'+req.params.prog_id);
		}
	}); 
});

//download areas xml for a particular program
router.get('/:prog_id/download/xml', middleWare.isLoggedIn, middleWare.isAdmin, function (req, res, next) {
    connection.query("SELECT * FROM areas WHERE prog_id = ?;", req.params.prog_id, function (err, result) {

        if (err) { throw err; }
        else {
            console.log(result);
            var object = { area: result };
            var xml = parser.parse("areas", object);
            fs.writeFile('areas.xml', xml, function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.download('areas.xml', function(err, data){
                        console.log('areas downloaded');
                    });
                }
            });
        }
    });

});

//download all areas
router.get('/download/xml', middleWare.isLoggedIn, middleWare.isAdmin, function (req, res, next) {
    connection.query("SELECT * FROM areas;", function (err, result) {
        if (err) { throw err; }
        else {
            console.log(result);
            var object = { area: result };
            var xml = parser.parse("areas", object);
            fs.writeFile('areas.xml', xml, function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.download('areas.xml', function(err, data){
                        console.log('areas downloaded');
                    });
                }
            });
        }
    });

});

//download areas text for a particular program
router.get('/:prog_id/download/ascii', middleWare.isLoggedIn, middleWare.isAdmin, function (req, res, next) {
    connection.query("SELECT * FROM areas WHERE prog_id = ?;", req.params.prog_id, function (err, result) {

        if (err) { throw err; }
        else {
            console.log(result);
            const textToWrite = result.map(getArea).join('\n');
            fs.writeFile('areas.txt', textToWrite, function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.download('areas.txt', function(err, data){
                        console.log('areas downloaded');
                    });
                }
            });
        }
    });

});

router.get('/download/ascii', middleWare.isLoggedIn, middleWare.isAdmin, function (req, res, next) {
    connection.query("SELECT * FROM areas;", function (err, result) {

        if (err) { throw err; }
        else {
            console.log(result);
            const textToWrite = result.map(getArea).join('\n');
            fs.writeFile('allareas.txt', textToWrite, function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.download('allareas.txt', function(err, data){
                        console.log('all areas downloaded');
                    });
                }
            });
        }
    });

});

function getArea(item) {
    var area = [item.area_id,item.prog_id, item.area].join(",");
    return area;
}

module.exports = router;