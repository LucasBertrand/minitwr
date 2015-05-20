var fs = require( 'fs' );
var twiitStruct = require("./twiitStruct");

/* Read ./twiit/data content, make a structure data from .txt files
 * and return an array of stored twiits 
 * 
 * @param callback {Function} the callback function
 */
module.exports = function (url, callback )
{
	callback(new twiitStruct(url));
};
