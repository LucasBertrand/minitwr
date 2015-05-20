var fs = require("fs");

module.exports = function ( commentary, files, user, callback ) {
	var path = __dirname + "/data/" + files;
	var content = fs.readFileSync(path, "utf8");
	content = content + ((user)? user + ": " : "") + commentary + " | ";
	fs.writeFile( path, content, function( err ) {
		if (err) throw err;
		callback();
	});
};
