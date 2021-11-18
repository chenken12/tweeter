/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  
  //$('#tweets-container').empty();
  for(tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    //console.log($tweet);
    $('#tweets-container').append($tweet); 
  }

}

const createTweetElement = function(tweet) {
  let $tweet = `
    <article class="tweet-content">
      <header class="user">
        <div class="user-profile">
          <img class="user-avatars" src="${tweet.user.avatars}">
          <a>${tweet.user.name}</a> 
        </div>
        <a class="userhandle">${tweet.user.handle}</a>
      </header>
      <p>${tweet.content.text}</p>
      <footer class="d-and-i">
        <a>${timeago.format(tweet.created_at)}</a>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `;
  // ...
  return $tweet;
}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$( document ).ready(function() {
  // const $tweet = createTweetElement(tweetData);

  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like

  renderTweets(data);
  //$('#tweets-container').append($tweet); 
  // Handler for .ready() called.
  //console.log("test hello");
  let tweetdb = '/tweets';

  $.get(tweetdb).then(data => {
    console.log("what happened?");
    console.log(data);
  });

  $( "#target" ).submit(function( event ) {
    //alert( "Handler for .submit() called." );
    event.preventDefault();
    const input = $( this ).serialize();
    const length = $( this ).find("#tweet-text").val().length;

    //if char is less then 140 then send a post request and reset textbox and counter
    if (length <= 140) {
      $.ajax({
        type: "POST",
        url: tweetdb,
        data: input
      });
      $(this).find("#tweet-text").val("");
      $(this).find(".counter").val("140");
    }

  });

});