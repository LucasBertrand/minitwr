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
			// save image
			fs.readFile(files.image.path, function (err, data)
			{
				if (err) throw err;
 				var imgPath = files.image.path;
  				fs.writeFile(imgPath, data, function (err)
				{
					if (err) {
						return callback(err);
					}
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
