$(document).ready(function() {
  
  // cal textarea length on input
  $('#tweet-text').on('input', function(event) {
    const numChars = $(this).val().length;
    const count = $(this).parentsUntil(".new-tweet").find(".counter");
    
    // update the counter
    count.text(140 - numChars);

    // change color when char length is over 140
    if (numChars > 140) {
      count.addClass('counterLimit');
    } else {
      count.removeClass('counterLimit');
    }
  });
});