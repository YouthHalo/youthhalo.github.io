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

document.addEventListener("DOMContentLoaded", function () {
  const topnav = document.querySelector(".topnav");
  let lastScrollY = window.scrollY;
  let isSticky = false;
  let timeoutId = null;

  window.addEventListener("scroll", function () {
    clearTimeout(timeoutId);
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 0) {
      // Scrolling down
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

    // Reset the timer on any scroll movement
    timeoutId = setTimeout(() => {
      topnav.classList.add("sticky");
      isSticky = true;
    }, 5000);

    lastScrollY = currentScrollY;
  });
});

