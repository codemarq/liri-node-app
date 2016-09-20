//  grab data from keys.js and store in a variable
var keys = require('./keys.js');

// require fs node package
var fs = require('fs');

// require request njs package
var request = require('request');

// twitter
var Twitter = require('twitter'); 

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

// started to repeat this code, so made a function
function writeTweets (array) {
	for (var i = 0; i < array.length; i++) {
		// console log
		console.log('=========================================');
		// write last tweets in decending order to terminal
		console.log('# ' + (array.length -(i)) + ': ' + array[i].text);
		console.log('Created at: ' + array[i].created_at);

		// append to log.txt
		appendLog('=========================================');
		// write last tweets in decending order to log.txt
		appendLog('# ' + (array.length -(i)) + ': ' + array[i].text);
		appendLog('Created at: ' + array[i].created_at);
	}
}

// function to run on "my-tweets" command.
// this should show in Terminal the last 20 tweets and created time
function myTweets () {
	var client = new Twitter (twitterKeys);
	var params = keys.params;

	// append to log.txt that this was run
	appendLog('my-Tweets was run.');

	// call to twitter
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		// variable to store response as a JS Object
		var twitterArr = JSON.parse(response.body); 

		// if no error on request:
		if (!error) {
			// some liri speak
			console.log(process.argv[2] + '. Ok, got it! Here are the last tweets');
			appendLog(process.argv[2] + '. Ok, got it! Here are the last tweets');
			// if less than 20 tweets:
			if (twitterArr.length <= 20) {
				// write tweets
				writeTweets(twitterArr);
				// else make copy array that is the last 20 tweets 
			} else {
				// copy array made of last 20 tweets
				var recent = twitterArr.slice((twitterArr.length - 20), (twitterArr.length + 1));
				// write tweets 
				writeTweets(recent);
			}

		// if error on request:
  		} else {
  			console.log('Error: ' + error);
  			appendLog('Twitter Error: ' + error);
  		}
	});
}

// function to run on "spotify-this-thing" command
function spotify (arg) {
	// spotify
	var spotify = require('spotify');

	// log message that this app was run
	appendLog("Spotify-This-Song was run.");
	
	if (process.argv[3]) {
		song = process.argv[3];
	} else if (arg) {
		song = arg;
	} else {	
		// console log cute liri message
		console.log('Something went wrong, did you mean "The Sign" by the 90s Swedish pop Super-group Ace of Base?');
		// append to log.txt
		appendLog('Something went wrong, did you mean "The Sign" by the 90s Swedish pop Super-group Ace of Base?');
		
		song = 'The Sign ace of base';
	}

	spotify.search({ type: 'track', query: song }, function (error, response) {
	    if (error) {
	        console.log('Error occurred: ' + error);
	        appendLog('Spotify Error Occurred: ' + error);
	        return;
	    }
	    // Do something with 'data' 
	    else {
	    	// store response array
	    	var responseArr = response.tracks.items;

	    	// console log a message from Liri:
	    	console.log('Ok, Got it! Here are the top results for "spotify-this-song-' + process.argv[3] + '"');
	    	// console.log only 10 results.
	    	for (var i = 0; i < 10; i++) {
	    		// console.logs of results
	    		console.log('Result #: ' + (i + 1));
	    		console.log('Artist: ' + responseArr[i].artists[0].name);
	    		console.log('Song Name: ' + responseArr[i].name);
	    		console.log('Preview Link: ' + responseArr[i].preview_url);
	    		console.log('Album: ' + responseArr[i].album.name);
	    		console.log('=========================================');

	    		// appendlog the results to log.txt
	    		appendLog('Result #: ' + (i + 1));
	    		appendLog('Artist: ' + responseArr[i].artists[0].name);
	    		appendLog('Song Name: ' + responseArr[i].name);
	    		appendLog('Preview Link: ' + responseArr[i].preview_url);
	    		appendLog('Album: ' + responseArr[i].album.name);
	    		appendLog('=========================================');
	    	}
	    }  
	});
}

// function to run on 'movie-this' command
function movie () {
	// api constructor variables
	var endpoint = 'http://www.omdbapi.com/?t=';
	var nullQuery = 'Mr.+Nobody';
	var query = process.argv[3];
	var params = '&y=&plot=short&r=json&tomatoes=true';

	// handle null entry
	if (process.argv[3]) {
		queryUrl = endpoint + query + params;
	} else {
		queryUrl = endpoint + nullQuery + params;
	}

	appendLog('Movie-This was run.');

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

			// append to log.txt file
			appendLog('Title: ' + movie.Title);
			appendLog('Year: ' + movie.Year);
			appendLog('IMDB Rating: ' + movie.imdbRating);
			appendLog('Country: ' + movie.Country);
			appendLog('Language: ' + movie.Language);
			appendLog('Plot: ' + movie.Plot);
			appendLog('Actors: ' + movie.Actors);
			appendLog('Rotten Tomatoes Rating: ' + movie.tomatoRating);
			appendLog('Rotten Tomatoes URL: ' + movie.tomatoURL);

		} else {
			console.log('error: '+ response.statusCode);
			appendLog('Movie-This error: '+ response.statusCode);
        	console.log(body);
			}
	});
}

// function to run on 'do-what-it-says' command
function says () {
	fs.readFile("random.txt", 'utf8', function (error, data) {
		// create an array of text
		var dataArr = data.split(',');
		// call spotify
		spotify(dataArr[1]);
	});
	appendLog('Do-What-It-Says was run.');
}

// function to write to log file
function appendLog (log) {
	// store arg log in variable-can probably skip this step
	var logtext = log + '\n';

	fs.appendFile('log.txt', logtext, function (error) {
		if (error) {
			console.log(error);
		} 
	});
}