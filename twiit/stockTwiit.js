var fs = require( 'fs' );

/* Receive twiit's data from the client, create a txt file and store it in ./twiit/data
 * The name of the files is the timestamp of submitted twiit
 *
 * @param body - the submitted information
 * @param files - contain optional image from the client
 * @param callback
 */
module.exports = function ( body, files, callback )
{
	var path = __dirname + "/data/" + body.date + ".txt";
	var content;

	if (files && files.image)
	{
		// Here "BOC" mean Begin Of Comments, see stockcomment.js
		content = "[" + body.user_name + "]" + "{/images/image_twiit/" + files.image.name + "}" + body.twiit + "BOC";

		fs.writeFile( path, content, function( err )
		{
			if (err) throw err;
			fs.readFile(files.image.path, function (err, data)
			{
				if (err) throw err;
 				var newPath = files.image.path;
  				fs.writeFile(newPath, data, function (err)
				{
					if (err) {
						return callback(err);
					}
					var twiit = {};
					twiit.date = new Date(body.date);
					twiit.name = body.user_name;
					twiit.img = "/images/image_twiit/" + files.image.name;
					twiit.message = body.twiit;
					twiit.filename = path;
					return callback();
				});
			});
		});
	}
	else 
	{
		content = "[" + body.user_name + "]" + "{}" + body.twiit + "BOC";
		fs.writeFile( path, content, function( err ) {
			if (err) {
				return callback(err);
			}
			return callback();
		});
	}
};
