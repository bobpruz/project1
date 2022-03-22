

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

// Quote Generator 
const text=document.getElementById("quote");
const author=document.getElementById("author");
const tweetButton=document.getElementById("tweet");

const getNewQuote = async () =>
{
    //api for quotes
    var url="https://type.fit/api/quotes";    

    // fetch the data from api
    const response=await fetch(url);
    console.log(typeof response);
    //convert response to json and store it in quotes array
    const allQuotes = await response.json();

    // Generates a random number between 0 and the length of the quotes array
    const indx = Math.floor(Math.random()*allQuotes.length);

    //Store the quote present at the randomly generated index
    const quote=allQuotes[indx].text;

    //Store the author of the respective quote
    const auth=allQuotes[indx].author;

    if(auth==null)
    {
        author = "Anonymous";
    }

    //function to dynamically display the quote and the author
    text.innerHTML=quote;
    author.innerHTML="~ "+auth;

    //tweet the quote
    tweetButton.href="https://twitter.com/intent/tweet?text="+quote+" ~ "+auth;
}
getNewQuote();