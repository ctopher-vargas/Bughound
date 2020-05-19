var express = require('express');
var router = express.Router();
var connection = require('../db');
<<<<<<< HEAD
/* GET users listing. */
router.get('/', function(req, res, next) {
  
	connection.query("SELECT * FROM employees;", function(err, result){
		if(err) {throw err;}
		else{
			res.render('users', {users: result});
		}
	}); 
});

router.put('/:emp_id', function(req, res, next){
	console.log("from put");

	var sql = "UPDATE employees SET name = ?, username = ?, password = ?, userlevel = ? WHERE emp_id = ?;";

	console.log(req.body);
	connection.query(sql, [req.body.name, req.body.username, req.body.password, req.body.userLevel, req.params.emp_id], function(err, result){
		if(err) {throw err;}
		else{
			console.log(result);
		}
	 });


});

router.delete('/', function(req, res, next){
	console.log(req.body);

	connection.query("DELETE FROM employees WHERE emp_id = ?;", req.body.emp_id,function(err, result){
		if(err) {throw err;}
		else{
			console.log(result);
=======
var middleWare = require('../middleware/index.js');
var fs = require('fs');
var parser = require('js2xmlparser');

/* GET users listing. */
router.get('/', middleWare.isLoggedIn, middleWare.isAdmin, function (req, res, next) {
	connection.query("SELECT * FROM employees;", function (err, result) {
		if (err) { throw err; }
		else {
			res.render('employees/index', { users: result });
		}
	});
});
//add new user 
router.get('/new', middleWare.isLoggedIn, middleWare.isAdmin, function (req, res, next) {
	res.render('employees/new');
});
//post route for new user
router.post('/add', middleWare.isLoggedIn, function (req, res, next) {
	var sql = `INSERT INTO employees(name, username, password, userlevel)VALUES(?, ?, ?, ?)`;
	connection.query(sql, [req.body.name, req.body.username, req.body.password, req.body.userLevel], function (err, result) {
		if (err) { throw err; }
		else {
			req.flash('success', req.body.username + " was successfully entered in the database");
			res.redirect('/dbmaintance');
		}
	});
});
//search for users route 
router.get('/search', middleWare.isLoggedIn, middleWare.isAdmin, function (req, res, next) {
	connection.query("SELECT * FROM employees;", function (err, results) {
		if (err) { throw err; }
		else {
			res.render('employees/search', {search: 'user', users: results});
		}
	});
});
//search results
router.get('/search/results', middleWare.isLoggedIn, function (req, res, next) {
	connection.query("SELECT * FROM employees WHERE username = ?;", req.query.username, function (err, results) {
		if (err) { throw err; }
		else {
			if(results.length == 0){
				req.flash('error', 'No user named "'+req.query.username+'" was found')
				res.redirect('/users/search');
			}
			res.render('employees/edit', { user: results });
		}
	});
});
//edit a specific user
router.get('/edit/:emp_id', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next){
	connection.query('SELECT * FROM employees WHERE emp_id = ? ; ', req.params.emp_id, function(err, results){
		if(err) {throw err;}
		else{
			res.render('employees/show', {user: results}); 
>>>>>>> final_edits
		}
	}); 
}); 
//put route for editing a program
router.put('/:emp_id', middleWare.isLoggedIn, middleWare.isAdmin, function(req, res, next){
	console.log(req.body); 
	var sql = 'UPDATE employees SET name = ?, username = ?, password = ?,  userlevel = ? WHERE emp_id = ?'; 
	connection.query(sql, [req.body.name, req.body.username, req.body.password, req.body.userlevel, req.params.emp_id], function(err, results){
		if(err) {throw err;}
		else{
			req.flash('success', req.body.name + " successfully updated")	
			res.redirect('/dbmaintance'); 
		}
	 }); 
}); 

<<<<<<< HEAD
});
 

router.get('/employee', function(req, res, next) {
  
	connection.query("SELECT * FROM employees WHERE username = ?;", req.query.username,function(err, result){
		if(err) {throw err;}
		else{
			console.log(result);
			res.render('user', {users: result});
=======
//destroy for deleting a specific employee
router.delete("/:emp_id", middleWare.isLoggedIn, middleWare.isAdmin, function(req, res){
	var sql = "DELETE FROM employees WHERE emp_id = ?;"
	connection.query(sql, req.params.emp_id, function(err, results){
		if(err){throw err;}
		else{
			req.flash('success', "employee was successfully deleted from the database")
			res.redirect('/dbmaintance'); 
>>>>>>> final_edits
		}
	}); 
}); 

router.get('/add', function(req, res, next){

	res.render('addUser');

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

router.post('/update/:emp_id', function(req, res, next){

	var sql = "UPDATE employees SET name = ?, username = ?, password = ?, userlevel = ? WHERE emp_id = ?;";

	console.log(req.body);
	connection.query(sql, [req.body.name, req.body.username, req.body.password, req.body.userLevel, req.params.emp_id], function(err, result){
		if(err) {throw err;}
		else{
			console.log(result);
		}
	 });

});



router.get('/search', function(req, res, next){
	res.render('search');
});

//download employees xml
router.get('/download/xml', middleWare.isLoggedIn, middleWare.isAdmin, function (req, res, next) {
    connection.query("SELECT * FROM employees;", function (err, result) {

        if (err) { throw err; }
        else {
            console.log(result);
            var object = { employee: result };
            var xml = parser.parse("employees", object);
            fs.writeFile('employees.xml', xml, function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.download('employees.xml', function(err, data){
                        console.log('downloaded?');
                    });
                }
            });
        }
    });

});
router.get('/download/ascii', middleWare.isLoggedIn, middleWare.isAdmin, function (req, res, next) {
    connection.query("SELECT * FROM employees;", function (err, result) {

        if (err) { throw err; }
        else {
            console.log(result);
            const textToWrite = result.map(getUser).join('\n');
            fs.writeFile('employees.txt', textToWrite, function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.download('employees.txt', function(err, data){
                        console.log('downloaded?');
                    });
                }
            });
        }
    });

});

function getUser(item) {
    var user = [item.emp_id, item.name, item.username, item.password, item.userlevel].join(",");
    return user;
}

module.exports = router;

