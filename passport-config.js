const LocalStrategy = require('passport-local').Strategy;
const connection = require('./db'); 

function init(passport) {
 	
	passport.use('local', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true //allows us to pass the entire requrest to the callback
	}, function(req, username, password, done) {//callback
		//finds a user with whose username and password match teh username and password in the form
		connection.query("SELECT * FROM employees WHERE username = ? and password = ?", [username, password], function(err, rows){
			if (err){
                return done(err);
			}
			if (!rows.length) {
                return done(null, false, req.flash('error', 'No user found')); // req.flash is the way to set flashdata using connect-flash
        	}
        	if (!( rows[0].password == password)){
        		console.log(rows[0].password);
        		console.log(password);
            	return done(null, false, req.flash('error', 'Password does not match')); // create the loginMessage and save it to session as flashdata
        	}	
            return done(null, rows[0]);			
		
		});
	}));

	passport.serializeUser(function(user, done) {	 
  		return done(null, user);
	});

	passport.deserializeUser(function(id, done) { 
		connection.query('SELECT * FROM employees WHERE emp_id = ?', id.emp_id, function(err, result){
			done(null, result[0]); 
		}); 

	}); 
}

//expose this function to our app
module.exports = init; 