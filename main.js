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

document.addEventListener("DOMContentLoaded", function () {
  const topnav = document.querySelector(".topnav");
  let lastScrollY = window.scrollY;
  let isSticky = false;
  let timeoutId = null;

  window.addEventListener("scroll", function () {
    clearTimeout(timeoutId);
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 20) {
      // Scrolling down
      console.log("hi");
      if (!isSticky) {
        topnav.classList.add("sticky");
        isSticky = true;
      }
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up
      if (isSticky) {
        topnav.classList.remove("sticky");
        isSticky = false;
      }
    }

    lastScrollY = currentScrollY;
  });
});

// realised that a loading screen is a bad practice

