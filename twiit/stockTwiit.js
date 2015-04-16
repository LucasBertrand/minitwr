var fs = require('fs');

module.exports = function (data, callback)
{
	
	var path = __dirname+ "/data/" + Date.now()+ ".txt";
	var content = "<" + data.user_name + ">" + data.twiit;
	fs.writeFile(path, content, function(error)
		{
			if (error) throw error
			callback(error)
		});
	
	
};
