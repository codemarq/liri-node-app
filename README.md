# liri-node-app
Liri is a Language Interpretation and Recognition Interface. Liri will be a command line Node.js app that takes in parameters and gives you back data.

## API's used

* [Twitter](https://www.npmjs.com/package/twitter)
* [Spotify](https://www.npmjs.com/package/spotify)
* [Request](https://www.npmjs.com/package/request)
* [OMDB API](http://www.omdbapi.com).

## Node commands in this app:

### node liri.js my-tweets
Posts my recent tweets to console (limit 20)

### node liri.js spotify-this-song <song name>
Searches the Spotify API and returns the following to console:
* Artist
* Song Name
* Preview Link
* Album
If no song name is used with the above command, it will return the above values for "The Sign" by Ace of Base

### node liri.js movie-this <movie name>
Pass in a movie name, use OMDB API to show the following:
* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.
* Rotten Tomatoes Rating.
* Rotten Tomatoes URL.
Default output for null user input is "Mr. Nobody" and console log 'It's on Netflix.'

### node liri.js do-what-it-says
This actually will choose a random command to run.  If the command requires an argument, it will read the argument from random.txt in this repo