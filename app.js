var createError 	= require('http-errors');
var express 		= require('express');
var path 			= require('path');
var bodyParser 		= require('body-parser');
var cookieParser    = require('cookie-parser');
var logger 			= require('morgan');
var methodOverride 	= require('method-override'); 
var session 		= require('express-session');
//var bcrypt 			= require('bcrypt');
var passport		= require('passport');
var initPassport    = require('./passport-config');
var flash			= require('connect-flash');  
var indexRouter 	= require('./routes/index');
var usersRouter 	= require('./routes/users');
var bugsRouter 		= require('./routes/bugs'); 
var programsRouter 	= require('./routes/programs'); 
var areasRouter 	= require('./routes/areas');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));	
app.use(express.json());
app.use(express.urlencoded({ extended: false }));	
app.use(bodyParser.urlencoded({extended: true})); 
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash()); 

//initialize session
app.use(session({
	secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

//passport set up
initPassport(passport);
app.use(passport.initialize());
app.use(passport.session());	

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success"); 
    res.locals.error   = req.flash("error"); 
    next(); 	
});

// set routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bugs', bugsRouter); 
app.use('/programs', programsRouter);
app.use('/areas', areasRouter);



app.get('*', function(req, res){
  res.sendFile(__dirname+'/public/views/error.ejs');
});
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
