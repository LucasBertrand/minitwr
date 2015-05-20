var fs = require( 'fs' );
var twiitStruct = require("./twiitStruct");

/* Read ./twiit/data content, make a structure data from .txt files
 * and return an array of stored twiits 
 *
 * @param page {Number} the current page of the client
 * @param callback {Function} the callback function
 */
module.exports = function(page, callback)
{
	var i,
		limit,
		maxPage,
		result = [],
		twiitsPerPage = 10;

	fs.readdir( __dirname + "/data/", function( err, twiits )
	{
		if ( err ) throw err;
		if ( twiits )
		{
			i = (page * twiitsPerPage);
			limit = (i + twiitsPerPage < twiits.length)? i + twiitsPerPage : twiits.length;
			maxPage = Math.floor((twiits.length - 1) / twiitsPerPage);
			twiits = twiits.reverse();
			for ( i; i < limit; i++ )
				result.push( new twiitStruct( twiits[i] ));
		}
		callback(maxPage, result);
	});
};
