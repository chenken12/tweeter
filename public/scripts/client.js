/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// loop thought the tweet and append it
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

// the tweet box layout
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
      <footer>
        <a>${timeago.format(tweet.created_at)}</a>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `;

  return $tweet;
};

// Preventing XSS with Escaping
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$( document ).ready(function() {
  const tweetdb = '/tweets';

  // load tweets on first visit / refresh
  loadTweets();

  // toggle the write tweet textarea
  $(".toggle-tweet").click(() => {
    $(".new-tweet").slideToggle("slow", "swing");
    $("#tweet-text").focus();
  })

  // for the tweet button
  $("#send-tweet").submit(function( event ) {
    event.preventDefault();
    $("#input-error").slideUp();

    const input = $(this).serialize();
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
      // if no errors then post
      $.ajax({
        type: "POST",
        url: tweetdb,
        data: input
      }).done(loadTweets);

      // reset textbox and counter
      $(this).find("#tweet-text").val("");
      $(this).find(".counter").val("140");
    }
  });
});
