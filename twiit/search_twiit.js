var fs=require('fs');
var twiitStruct = require("./twiitStruct");

module.exports=function(user, callback)
{
	fs.readdir( __dirname + "/data/", function( error, twiits )
	{
		if ( error ) throw error;
		if ( twiits )
		{
			twiits = twiits.reverse();
			var twiit;
			var result = [];

			for ( var i=0; i < twiits.length; i++ )
			{
				twiit = new twiitStruct(twiits[i]);
				if(twiit.name === user)
				{
					result.push(twiit);
				}
			}
		}
		callback(result);
	});

};
