//  grab data from keys.js and store in a variable
var keys =  require('./keys.js');

var Twitter = require('twitter'); 
var twitterKeys = keys.twitterKeys;

// require fs node package
var fs = require('fs');

// command variable
var command = process.argv[2];
// var data = process.argv[3];

// ternary for commands
command == 'my-tweets' ? myTweets() :
command == 'spotify-this-song' ? spotify() :
command == 'movie-this' ? movie() :
command == 'do-what-it-says' ? says() :
console.log('Check your spelling and try again!');

// function to run on "my-tweets" command.
// this should show in Terminal the last 20 tweets and created time
function myTweets () {
	params = keys.params;
	twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
    		console.log(tweets);
  		}
	});

}

// function to run on "spotify-this-thing" command
function spotify() {
	var spotify = require('spotify');
 
	spotify.search({ type: 'track', query: process.argsv[3] }, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    }
    // Do something with 'data' 
	});
}

// function to run on 'movie-this' command
function movie () {

}

// function to run on 'do-what-it-says' command
/* * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
	* It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
	* Feel free to change the text in that document to test out the feature for other commands.
*/
function says () {

}

/* BONUS
### BONUS

* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

* Make sure you append each command you run to the `log.txt` file. 

* Do not overwrite your file each time you run a command.
*/