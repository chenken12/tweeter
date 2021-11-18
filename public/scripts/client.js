/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for(tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    //console.log($tweet);
    $('#tweets-container').append($tweet); 
  }
};

const loadTweets = function() {
  $.get('/tweets').then(renderTweets);
};

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
      <p>${escape(tweet.content.text)}</p>
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
};

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$( document ).ready(function() {
  const tweetdb = '/tweets';

  loadTweets();

  $( "#target" ).submit(function( event ) {
    //alert( "Handler for .submit() called." );
    event.preventDefault();
    $("#input-error").slideUp();
    const input = $( this ).serialize();
    const value = $(this).find("#tweet-text").val();
    
    //if char is less then 140 then send a post request and reset textbox and counter
    if (!value.trim()) {
      $("#input-error")
        .html("⚠️ Plz input a message before sending! ⚠️")
        .slideDown();
    } else if (value.length > 140) {
      $("#input-error")
        .html("⚠️ Too Long. Please type under 140 characters! ⚠️")
        .slideDown();
    } else {
      $.ajax({
        type: "POST",
        url: tweetdb,
        data: input
      });
      $(this).find("#tweet-text").val("");
      $(this).find(".counter").val("140");

      //dalay write because sometime is reload without new tweet
      setTimeout(function(){
        loadTweets(); 
      }, 1000);
    }
  });

});