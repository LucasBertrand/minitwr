var fs = require( 'fs' );

/* Create a structure data from twiits's .txt
 * 
 * @constructor
 * @param path {String} the name of the file (ex: 4654548843.txt)
 */
function TwiitStruct ( path )
{
	// load data thanks to path and extract content
	var data = fs.readFileSync( __dirname + "/data/" + path, "utf8" );
	if ( data )
	{
		this.date = parseInt( path.replace(/.txt/, "" ));
		this.name = data.slice( data.indexOf( "[" ) + 1, data.indexOf( "]" ));
		this.img = data.slice( data.indexOf("{")+1,data.indexOf("}"));
		this.message = data.slice( data.indexOf( "}" ) + 1, data.indexOf( "BOC" ));
		this.filename = path;
	}		
}

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
				result.push( new TwiitStruct( twiits[i] ));
		}
		callback(maxPage, result);
	});
};
