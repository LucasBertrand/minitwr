var fs = require( 'fs' );

module.exports = function ( commentaire, files,user, callback )
{
	console.log("+++++++++++++++++++++++++++++++++++++++OUI CA ENREGISTRE");
	var path = __dirname+ "/data/" + files;
		var content =  fs.readFileSync(path, "utf8" );
		content = content +user+": "+commentaire+"|";
		fs.writeFile( path, content, function( error )
		{		
			callback(error);
		});
}
