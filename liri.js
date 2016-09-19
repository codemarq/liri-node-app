//  grab data from keys.js and store in a variable
var keys =  require('./keys.js');

// require fs node package
var fs = require('fs');

// require request njs package
var request = require('request');

// twitter
var Twitter = require('twitter'); 

// spotify



// keys
var twitterKeys = keys.twitterKeys;

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
	var client = new Twitter (twitterKeys);
	var params = keys.params;
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
    		console.log(tweets);
  		} else {
  			console.log(response);
  		}
	});

}

// function to run on "spotify-this-thing" command
function spotify() {
	var spotify = require('spotify');
 
	spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    }
    // Do something with 'data' 
    else {
    	console.log(data);
    }
	});
}

// function to run on 'movie-this' command
function movie () {
	// api constructor variables
	var endpoint = 'http://www.omdbapi.com/?t=';
	var nullQuery = 'Mr.+Nobody';
	var query = process.argv[3];
	var params = '&y=&plot=short&r=json&tomatoes=true'

	// handle null entry
	if (process.argv[3]) {
		queryUrl = endpoint + query + params;
	} else {
		queryUrl = endpoint + nullQuery + params;
	}

	// API request
	request(queryUrl, function(error, response, body) {
		// convert JSON string response to JS Object
		var movie = JSON.parse(response.body);

		if (!error && response.statusCode == 200) {
			// console log the attributes listed below
			console.log('Title: ' + movie.Title);
			console.log('Year: ' + movie.Year);
			console.log('IMDB Rating: ' + movie.imdbRating);
			console.log('Country: ' + movie.Country);
			console.log('Language: ' + movie.Language);
			console.log('Plot: ' + movie.Plot);
			console.log('Actors: ' + movie.Actors);
			console.log('Rotten Tomatoes Rating: ' + movie.tomatoRating);
			console.log('Rotten Tomatoes URL: ' + movie.tomatoURL);
		} else {
			console.log('error: '+ response.statusCode)
        	console.log(body)
			}
	})
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