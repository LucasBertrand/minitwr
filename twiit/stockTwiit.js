var fs = require( 'fs' );

/* Receive twiit's data from the client, create a txt file and store it 
 * in ./twiit/data
 * The name of the files is the timestamp of submitted twiit
 * 
 * @param callback {Function} the callback function
 */
module.exports = function ( body, files, callback )
{
	console.log("+++++++++++++++++++++++++++++++++++++++OUI CA ENREGISTRE");
	var path = __dirname+ "/data/" + Date.now()+ ".txt";
	if (files.image) 
	{
		var content = "[" + body.user_name + "]" + "{/images/image_twiit/"+files.image.name + "}" + body.twiit;
		fs.writeFile( path, content, function( error )
		{		
			fs.readFile(files.image.path, function (err, data)
			{
 				var newPath =files.image.path;
  				fs.writeFile(newPath, data, function (error)
				{
					callback( error );
				});
			});
		});
	}
	else 
	{
		var content = "[" + body.user_name + "]" + "{}" + body.twiit;
		fs.writeFile( path, content, function( error ) {	
			callback( error );
		});
	}
};
