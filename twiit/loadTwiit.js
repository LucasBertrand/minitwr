var fs = require('fs');

var TwiitStruct = function (path)
{
	this.name;
	this.message;
	this.date;
}

TwiitStruct.prototype.load = function(fileName)
{
	fs.read(__dirname + "/data/" + fileName, function(error, data)
	{
		
		this.date = new Date(parseInt(fileName.replace(/.txt/, "")));
		this.name = data.slice(data.indexOf("<") + 1, data.indexOf(">") + 1);
		this.message = data.slice(data.indexOf(">") + 1, data.length);
	});
};


module.exports = function (callback)
{
	var result = [];
	fs.readdir(__dirname + "/data/", function(error, files)
	{
		for (var i = 0; i < files.length; i++)
		{
			result.push(new TwiitStruct(files[i]));
		}
		callback(result);
	});
	
	
};
