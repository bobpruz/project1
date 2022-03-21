

var clientId = '24be7e6be3f7436d805064d0564da324';
var clientSecret = '9db0771e96094645ab8e228b4944ebb3';

var getGenre = function() {
  // FETCH REQUEST WITH clientId AND clientSecret 
  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  }).then(function(response) {
    response.json().then(function(token) {
      // FETCH available-genre-seeds ARRAY
      fetch(
        `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token.access_token },
        }
      )
        .then(function (genres) {
          return genres.json();
        })
        .then(function (genreList) {
          // CONSOLE.LOG ARRAY OF GENRES
          console.log(genreList);
        });
    })
  })
}

getGenre();