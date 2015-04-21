var express = require( 'express' );
var router = express.Router();
var stockTwiit = require( '../twiit/stockTwiit' );
var loadTwiit = require( '../twiit/loadTwiit' );

var data = { title: "MiniTwr" };

// Get home page
router.get('/', function( req, res, next ) 
{
	// get stored twiits (in ../twiit/data) and send it to the client
	loadTwiit(function( twiitArray ) 
	{
		data.twiits = twiitArray;
		res.render( 'index', data );
	});
	data.twiitsLoaded = undefined;
});

// Receive new twiit
router.post( '/new_twiit', function( req, res, next ) 
{
	stockTwiit( req.body, function( error )
	{		
		// inform client if the twiit was succefully stored
		data.twiitsLoaded = ( error )? false : true;
		// emulate the GET request for home page
		res.redirect('/');
	}); 
});

module.exports = router;
