var fs = require( 'fs' );

/* Perform time elapsed since sending
 *
 * @param t0 {Number} timestamp of sending
 */
function insertTimeElapsed (t0) {
    var timeElapsed = Date.now() - t0;
    var seconds = Math.floor(timeElapsed / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var result;
    if (!minutes) {
        result = Math.floor(seconds) + " second(s) ago";
    } else if (!hours) {
        result = Math.floor(minutes) + " minute(s) ago";
    } else {
        result = Math.floor(hours) + " hour(s) ago";
    }
    return result;
}

module.exports = function TwiitStruct ( path )
{
    // load data thanks to path and extract content
    var data = fs.readFileSync( __dirname + "/data/" + path, "utf8" );
    var timestamp = parseInt( path.replace(/.txt/, "" ));
    if ( data )
    {
        this.elapsed = insertTimeElapsed(timestamp);
        this.date = new Date(timestamp).toLocaleString();
        this.name = data.slice( data.indexOf( "[" ) + 1, data.indexOf( "]" ));
        this.img = data.slice( data.indexOf("{")+1,data.indexOf("}"));
        this.message = data.slice( data.indexOf( "}" ) + 1, data.indexOf( "BOC" ));
        this.filename = path;
        this.comments = data.slice(data.indexOf("BOC") + 3, data.length - 1).split("|");
        this.comments.pop();
    }
};