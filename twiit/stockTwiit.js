var fs = require( 'fs' );

/* Receive twiit's data from the client, create a txt file and store it 
 * in ./twiit/data
 * The name of the files is the timestamp of submitted twiit
 * 
 * @param callback {Function} the callback function
 */
module.exports = function ( data, callback )
{
	
	var path = __dirname+ "/data/" + Date.now()+ ".txt";
	var content = "<" + data.user_name + ">" + data.twiit;
	fs.writeFile( path, content, function( error )
	{		
		callback( error )
	});
	
	
};
