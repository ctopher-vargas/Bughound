var express = require('express');
var router = express.Router();
var mysql = require('mysql'); 
var connection = require('../db'); 

router.get('/', function(req, res, next) {
  res.render('bugs/index');
});

router.get('/new', function(req, res, next){
	res.render('bugs/new'); 	
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
