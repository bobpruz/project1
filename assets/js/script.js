var clientId = "24be7e6be3f7436d805064d0564da324";
var clientSecret = "9db0771e96094645ab8e228b4944ebb3";

var getGiphy = function () {
  var apiKey = "lMeCuGeeFgj0ElHn0XP950UPRWGyFOkm";
  // fetch random giphy
  fetch(
    "https://api.giphy.com/v1/gifs/random?api_key=" +
      apiKey +
      "&tag=nature&rating=g&limit=1"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var giphy = data.data.images.downsized_medium.url;
      // populate image to quote div
      $("#daily-quote-image").attr("src", giphy);
    });
};

var getPlaylist = function () {
  // FETCH REQUEST WITH clientId AND clientSecret
  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  }).then(function (response) {
    response.json().then(function (token) {
      // FETCH genre
      fetch(`https://api.spotify.com/v1/browse/categories?offset=4`, {
        method: "GET",
        headers: { Authorization: "Bearer " + token.access_token },
      })
        .then(function (genres) {
          return genres.json();
        })
        .then(function (genreList) {
          console.log(genreList)
          var random = genreList.categories.items.length;
          var genreId = Math.floor(Math.random() * random);
          var genre = genreList.categories.items[genreId].id;
          console.log(genre);
          // fetch playlist
          fetch(
            `https://api.spotify.com/v1/browse/categories/${genre}/playlists?limit=50`,
            {
              method: "GET",
              headers: { Authorization: "Bearer " + token.access_token },
            }
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (playlist) {
              var random = playlist.playlists.items.length;
              var playlistNumber = Math.floor(Math.random() * random);
              var songs =
                playlist.playlists.items[playlistNumber].uri.split(":");
              // populate spotify player with list
              $("#spotify").attr(
                "src",
                "https://open.spotify.com/embed/playlist/" + songs[2]
              );
            });
        });
    });
  });
};

// Quote Generator
const text = document.getElementById("quote");
const author = document.getElementById("author");
const tweetButton = document.getElementById("tweet");

const getNewQuote = async () => {
  //api for quotes
  var url = "https://type.fit/api/quotes";

  // fetch the data from api
  const response = await fetch(url);
  console.log(typeof response);
  //convert response to json and store it in quotes array
  const allQuotes = await response.json();

  // Generates a random number between 0 and the length of the quotes array
  const indx = Math.floor(Math.random() * allQuotes.length);

  //Store the quote present at the randomly generated index
  const quote = allQuotes[indx].text;

  //Store the author of the respective quote
  const auth = allQuotes[indx].author;

  if (auth == null) {
    author = "Anonymous";
  }

  //function to dynamically display the quote and the author
  text.innerHTML = quote;
  author.innerHTML = "~ " + auth;
};

// main application control
var mainRun = function () {
  getNewQuote();

  getGiphy();

  getPlaylist();
};

$(".refreshBtn").on("click", getPlaylist);

mainRun();
