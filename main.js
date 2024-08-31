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

/*document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  var data = "Email: " + email + "\nMessage: " + message;

  var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "message.txt";
  a.click();
  URL.revokeObjectURL(url);

  var formData = new FormData();
  formData.append("file", blob);

  fetch("/upload", {
    method: "POST",
    body: formData
  }).then(function() {
    alert("Message sent!");
  }).catch(function(error) {
    alert("Error sending message: " + error);
  });

  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
});
*/ //no way of sending it to a github pages server