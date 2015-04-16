var express = require('express');
var router = express.Router();
var stockTwiit = require('../twiit/stockTwiit');

var data = { title: "TWR"};
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', data);
	data.response=undefined;
});

router.get('/success',function(req,res,next) {	//TEST SUCCESS SKIN PAGE
	data.response ="Success";
	data.image="/images/valide.png";
	res.render('index', data);
});

router.get('/fail',function(req,res,next) {	//TEST FAIL SKIN PAGE
	data.response ="Fail";
	data.image="/images/refuse.jpg";
	res.render('index', data);
});

/* POST NEW TWIIT PAGE */
router.post('/new_twiit', function(req, res, next) {
  stockTwiit(req.body, function(error)
	{
		if(error) {
			data.response = "Fail";
			data.image="/images/refuse.jpg";
			res.redirect('/');
		}
		else {
			data.response = "Success";
			data.image="/images/valide.png";
			res.redirect('/');
		}
	});
 
});

module.exports = router;
