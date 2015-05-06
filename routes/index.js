var express = require('express');
var router = express.Router();
var stockTwiit = require('../twiit/stockTwiit');
var loadTwiit = require('../twiit/loadTwiit');
var twiit_page = require('../twiit/twiit_page');

var data = {};
var twiit={};

/* GET home page. */
router.get('/', function(req, res, next) {
	loadTwiit(function(twiitArray) 
	{
		data.twiits = twiitArray.reverse();
		data.title = "TWR";
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
router.post('/new_twiit', function(req, res, next)
	{
		if(req.body.extension=="jpg"||req.body.extension=="jpeg"||req.body.extension=="png"||req.body.extension=="bmp"||req.body.extension=="gif")
		{
			stockTwiit(req.body,req.files, function(error)
			{
				if(error)
				{
					console.log(error);
					data.response = "Fail";
					res.redirect('/');
				}
				else
				{
					data.response = "Success";
					res.redirect('/');
				}
			});
		}
		else
		{
			data.response="Bad";
			res.redirect('/');
		}
 
});

/*******************************************************************************************/


router.get('/twiit_page', function(req, res, next)
{
	
	var url=req.query.twiit;
	twiit_page(url,function(file)
	{
		file.title="Twiit de "+file.name
		res.render('twiit_page',file);
	});
});

module.exports = router;
