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


// Hide the page until it's faded in
document.querySelector("body").style.opacity = 0;

// Wait for the page to load completely
window.addEventListener("load", function () {
  // Use requestAnimationFrame to create a smooth fade-in effect
  // This is a more efficient way to animate elements

  function fadeIn() {
    var opacity = +document.querySelector("body").style.opacity.replace(",", ".") + 0.02;
    document.querySelector("body").style.opacity = opacity;
    if (opacity < 1) {
      window.requestAnimationFrame(fadeIn);
    } else if (opacity >= 1) {
      opacity = 1;
    }
  }
  setTimeout(() => {
    fadeIn();
  }, 2500);
  const img = document.createElement("img");
  img.src = "https://avatars.githubusercontent.com/u/69648246?v=4";
  img.style.position = "fixed";
  img.style.top = "50%";
  img.style.left = "50%";
  img.style.transform = "translate(-50%, -50%)";
  img.style.maxWidth = "100%";
  img.style.maxHeight = "100%";
  img.style.transition = "opacity 2.5s";
  img.style.zIndex = "1001";
  document.body.appendChild(img);
  setTimeout(() => {
    img.style.opacity = "0";
    setTimeout(() => {
      img.remove();
    }, 2500);
  }, 2500);
});
