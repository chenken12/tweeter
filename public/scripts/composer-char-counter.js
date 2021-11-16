$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('keyup', function (event) {
    const numChars = $(this).val().length;
    const count = $(this).parentsUntil(".new-tweet").find(".counter");
    
    count.text(140 - numChars);
    if (numChars > 140) {
      count.addClass('counterLimit');
    } else {
      count.removeClass('counterLimit');
    }
  });
});