var express = require('express');
var router = express.Router();
var stockTwiit = require('../twiit/stockTwiit');
var loadTwiit = require('../twiit/loadTwiit');

var data = {};
data.title = "TWRRO";
/* GET home page. */
router.get('/', function(req, res, next) {
	loadTwiit(function(twiitArray) 
	{
		data.twiits = twiitArray.reverse();
		
		res.render('index', data);
		data.response=undefined;
	});
});

router.get('/success',function(req,res,next) {	//TEST SUCCESS SKIN PAGE
	data.response ="Success";
	res.render('index', data);
});

router.get('/fail',function(req,res,next) {	//TEST FAIL SKIN PAGE
	data.response ="Fail";
	res.render('index', data);
});

/* POST NEW TWIIT PAGE */
router.post('/new_twiit', function(req, res, next) {
  stockTwiit(req.body, function(error)
	{
		if(error) {
			data.response = "Fail";
			res.redirect('/');
		}
		else {
			data.response = "Success";
			res.redirect('/');
		}
	});
 
});

module.exports = router;
