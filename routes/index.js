var express = require('express');
var router = express.Router();
var stockTwiit = require('../twiit/stockTwiit');

var data = { title: "TWR"};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', data);
});

/*SUCCESS PAGE*/
router.get('/success_twiit', function(req, res, next) {
  res.render('index', data);
});

/*FAIL PAGE*/
router.get('/fail_twiit', function(req, res, next) {
  res.render('index', data);
});

/* POST NEW TWIIT PAGE */
router.post('/new_twiit', function(req, res, next) {
  stockTwiit(req.body, function(error)
	{
		if(error) {
			data.response = "fail";
			res.redirect('/');
		}
		else {
			data.response = "success";
			res.redirect('/');
		}
	});
 
});

module.exports = router;
