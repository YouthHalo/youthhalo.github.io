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

    lastScrollY = currentScrollY;
  });
});


// Wait for the page to load completely
window.addEventListener("load", function () {

  const wrapper = document.createElement("div");
  wrapper.className = "loading-wrapper";
  wrapper.style.position = "fixed";
  wrapper.style.top = "0";
  wrapper.style.left = "0";
  wrapper.style.width = "100%";
  wrapper.style.height = "100%";
  wrapper.style.backgroundColor = "white";
  wrapper.style.transition = "opacity 2s";
  document.body.style.background = "white";
  document.body.appendChild(wrapper);

  const img = document.createElement("img");
  img.src = "https://avatars.githubusercontent.com/u/69648246?v=4";
  img.className = "loading-wrapper";
  img.style.position = "fixed";
  img.style.opacity = "1";
  img.style.top = "50%";
  img.style.left = "50%";
  img.style.borderRadius = "100%";
  img.style.transform = "translate(-50%, -60%)";
  img.style.maxWidth = "50%";
  img.style.maxHeight = "50%";
  img.style.transition = "opacity 1s";
  img.style.zIndex = "1001";
  wrapper.appendChild(img);
  document.body.appendChild(img);

  const loadingText = document.createElement("p");
  loadingText.className = "loading-wrapper";
  loadingText.style.position = "absolute";
  loadingText.style.bottom = "10%";
  loadingText.style.left = "50%";
  loadingText.style.transform = "translate(-50%, 0%)";
  loadingText.style.color = "#000";
  loadingText.style.fontSize = "2rem";
  loadingText.style.textAlign = "center";

  let loadingTextContent = "Loading";
  let loadingTextContentIndex = 0;

  const loadingTextInterval = setInterval(() => {
    loadingTextContentIndex = (loadingTextContentIndex + 1) % 4;
    loadingTextContent =
      loadingTextContentIndex === 0
        ? "Loading"
        : loadingTextContentIndex === 1
        ? "Loading."
        : loadingTextContentIndex === 2
        ? "Loading.."
        : "Loading...";
    loadingText.textContent = loadingTextContent;
  }, 500);

  wrapper.appendChild(loadingText);

  setTimeout(() => {
    img.style.opacity = "0";
    wrapper.style.opacity = "0";
    clearInterval(loadingTextInterval);
    setTimeout(() => {
      wrapper.remove();
      img.remove();
      loadingText.remove();
    }, 1000);
  }, 2000);
});

//Removed JS version of hover size effect due to being much smoother in CSS