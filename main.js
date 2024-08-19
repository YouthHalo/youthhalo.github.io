var d = new Date();
var n = d.getHours();
var greeting;
if (n >= 0 && n < 12) {
  greeting = "Good morning,";
} else if (n >= 12 && n < 18) {
  greeting = "Good afternoon,";
} else {
  greeting = "Good evening,";
}

document.querySelector("h1").innerHTML = greeting + " Im YouthHalo";
