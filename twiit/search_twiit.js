var fs=require('fs');

function TwiitStruct ( path )
{
	// load data thanks to path and extract content
	var data = fs.readFileSync( __dirname + "/data/" + path, "utf8" );
	if ( data )
	{
		this.date = new Date( parseInt( path.replace(/.txt/, "" ))).toLocaleString();
		this.name = data.slice( data.indexOf( "[" ) + 1, data.indexOf( "]" ));
		this.img = data.slice( data.indexOf("{")+1,data.indexOf("}"));
		this.message = data.slice( data.indexOf( "}" ) + 1, data.indexOf( "BOC" ));
		this.filename=path;
	}		
}

module.exports=function(user,callback)
{
	
	fs.readdir( __dirname + "/data/", function( error, files )
	{
		if ( error ) throw error;
		if ( files )
		{
			files=files.reverse();
			var twiit;
			var result = []; 
			for ( var i=0; i < files.length; i++ )
			{
				twiit=new TwiitStruct(files[i]);
				if(twiit.name==user)
				{
					result.push(twiit);
				}
			}
		}
		callback(result);
	});	
}
