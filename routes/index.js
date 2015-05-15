var express = require('express');
var router = express.Router();
var stockTwiit = require('../twiit/stockTwiit');
var loadTwiit = require('../twiit/loadTwiit');
var twiit_page = require('../twiit/twiit_page');
var stockcomment = require('../twiit/stockcomment');

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

/**************************************************************************************/

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
	if(req.body.user_name!=undefined)	//test if user_name is present
	{
		console.log("===========================>name correct");
		if(req.files.image)		//test if image is present
		{
			console.log("===========================>req.files.image");	
			if(req.files.image.extension=="png"||req.files.image.extension=="bmp"||req.files.image.extension=="gif"||req.files.image.extension=="jpeg"||req.files.image.extension=="jpg")	//test if image extension is png, jpeg,jpg,bmp,gif
			{
				console.log("===========================>req.files.image.extension");
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
			else		//Image extension is not png
			{
				console.log("===========================>req.files.image non");
				data.response="Bad";
				res.redirect('/');
			}
		}
		else		//image is not present
		{
			console.log("===========================>req.files non");
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
	}
	else		//no user_name
	{
		data.response="no_user";
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
		file.twiit=url;
		res.render('twiit_page',file);
	});
});

router.post('/stock_comment',function(req,res,next)
{
console.log("========================++>",req.body.twiit);
	stockcomment(req.body.commentaire,req.body.twiit,req.body.user,function(error)
	{
		if(error)
		{
			console.log(error);
		}
		else
		{
			res.redirect('/twiit_page?twiit='+req.body.twiit);
		}
	});
});

module.exports = router;
