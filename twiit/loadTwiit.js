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
		this.date = new Date( parseInt( path.replace(/.txt/, "" ))).toLocaleString();
		this.name = data.slice( data.indexOf( "<" ) + 1, data.indexOf( ">" ));
		this.message = data.slice( data.indexOf( ">" ) + 1, data.indexOf( "{" ) );
		this.img = data.slice( data.indexOf("{")+1,(data.length)-1);
	}		
}

/* Read ./twiit/data content, make a structure data from .txt files
 * and return an array of stored twiits 
 * 
 * @param callback {Function} the callback function
 */
module.exports = function ( callback )
{

	var result = []; 
	fs.readdir( __dirname + "/data/", function( error, files )
	{
		if ( error ) throw error;
		if ( files )
		{
			for ( var i = 0; i < files.length; i++ )
			{
				result.push( new TwiitStruct( files[i] ));
				console.log("========================>",result[i].img);				
			}
		}
		callback( result );
	});	
	
};
