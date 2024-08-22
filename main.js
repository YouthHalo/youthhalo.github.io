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

document.querySelector("h1").innerHTML = greeting + " Im YouthHalo";

window.onscroll = function() {scrollFunction()};
var topnav = document.getElementById("topnav");
function scrollFunction() {
  if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
    topnav.style.top = "0";
  } else {
    topnav.style.top = "-4vw";
  }
}

// realised that a loading screen is a bad practice

