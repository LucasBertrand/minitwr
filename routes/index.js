var express = require("express");
var router = express.Router();
var stockTwiit = require("../twiit/stockTwiit");
var loadTwiit = require("../twiit/loadTwiit");
var twiit_page = require("../twiit/twiit_page");
var stockcomment = require("../twiit/stockcomment");

/* Load the stored twiits and joint with it a status response
 *
 * @param req - the client request
 * @param res - the client response
 * @param response - the statut response of the posted twiit (optionnal)
 */
function twiitsRender (req, res, response) {
	var page = req.query.page || 0;
	var data = {response: response || null};

	loadTwiit(page, function(maxPage, twiitArray)
	{
		data.twiits = twiitArray;
		data.title = "TWR";
		data.suivant = "/?page=" + (parseInt(page) + parseInt("1"));
		data.precedent = "/?page=" + (page - 1);
		data.page = page;
		data.maximum = maxPage;
		res.render("index", data);
	});
}

router.get("/", function(req, res, next) {
	twiitsRender(req, res);
});

router.post("/new_twiit", function(req, res, next)
{
	var response = {};
	// this condition does not avoid only space character in user name
	// we can enhance that with a regexp
	if (req.body.user_name)
	{
		if (req.files.image) {
			var imageValid = Boolean(
				req.files.image.extension === "png" ||
				req.files.image.extension === "bmp" ||
				req.files.image.extension === "gif" ||
				req.files.image.extension === "jpeg" ||
				req.files.image.extension === "jpg");
			if (imageValid)
			{
				stockTwiit(req.body, req.files, function(err)
				{
					response.success = !err;
					response.message = (err)? "Fail - Twiit not valid !" : "Success - Well played boy !";
					return twiitsRender(req, res, response);
				});
			} else {
				response.success = false;
				response.message = "Your file is not a valid image";
				return twiitsRender(req, res, response);
			}
		}
		else
		{
			if (!req.body.twiit)
			{
				response.success = false;
				response.message = "Fail - Nothing to post !";
				return twiitsRender(req, res, response);
			}
			else
			{
				stockTwiit(req.body, null, function(err)
				{
					response.success = !err;
					response.message = (err)? "Fail - Twiit not valid !" : "Success - Well played boy !";

					return twiitsRender(req, res, response);
				});
			}
		}
	}
	else
	{
		response.success = false;
		response.message = "Fail - Whats your name ?";
		return twiitsRender(req, res, response);
	}
});

router.get("/twiit_page", function(req, res, next)
{
	var url = req.query.twiit;
	twiit_page(url, function(file){
		file.title = "Twiit de " + file.name;
		file.twiit = url;
		file.page = req.query.page;
		res.render("twiit_page", file);
	});
});

router.post("/stock_comment", function(req, res, next)
{
	if (req.body.commentaire) {
		stockcomment(req.body.commentaire, req.body.twiit, req.body.user, function (err) {
			res.redirect("twiit_page?twiit=" + req.body.twiit + "&page=" + req.body.page);
		});
	} else {
		res.redirect("twiit_page?twiit=" + req.body.twiit + "&page=" + req.body.page);
	}

});

module.exports = router;