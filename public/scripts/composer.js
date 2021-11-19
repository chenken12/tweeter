// composer.js

// get the body's height and toggle the button
const scrollHeight = function () {
  if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
    $("#btn-top").slideDown("fast");
  } else {
    $("#btn-top").slideUp("fast");
  }
};

$(document).ready(function() {

  // check height on scroll
  $(window).scroll(scrollHeight);
  
  // on click jump to top and open the textarea
  $("#btn-top").click(() => {
    console.log("clicked");
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    $(".new-tweet").slideDown("slow", "swing");
  });

});