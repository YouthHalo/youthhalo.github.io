var d = new Date();
var n = d.getHours();
var greeting;
if (n >= 5 && n < 12) {
  greeting = "Good morning!";
} else if (n >= 12 && n < 18) {
  greeting = "Good afternoon!";
} else if (n >= 18 && n < 21) {
  greeting = "Good evening!";
} else {
  greeting = "Good night!";
}

document.querySelector("h1").innerHTML = greeting + " I'm";

window.onscroll = function() {scrollFunction()};
var topnav = document.getElementById("topnav");
function scrollFunction() {
  if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) { //the first condition seems to do nothing
    topnav.style.top = "0";
  } else {
    topnav.style.top = "-4vw";
  }
}
document.querySelectorAll('a[href="/"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // or 'auto', which defaults to instant or 'instant'
    });
  });
});


