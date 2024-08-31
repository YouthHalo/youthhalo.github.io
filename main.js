document.body.classList.remove("nojs");
window.scrollTo(0, 0);
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

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

window.onscroll = function () {
  scrollFunction();
};
var topnav = document.getElementById("topnav");
function scrollFunction() {
  if (
    document.body.scrollTop > 450 ||
    document.documentElement.scrollTop > 450
  ) {
    //the first condition seems to do nothing
    topnav.style.top = "0";
  } else {
    topnav.style.top = "-4vw";
  }
}

document.querySelectorAll('a[href="/"]').forEach(function (a) {
  a.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth", // or 'auto', which defaults to instant or 'instant'
    });
  });
});

document.querySelectorAll(".project").forEach(function (project) {
  project.addEventListener("click", function (e) {
    document.querySelectorAll(".project").forEach(function (p) {
      //p.classList.remove('clicked'); removing this helps with the clicking on the same project
    });
    if (project.classList.contains("clicked")) {
      project.classList.remove("clicked");
    } else {
      project.classList.add("clicked");
    }
  });
  project.addEventListener("mouseleave", function (e) {
    project.classList.remove("clicked");
  });
});

console.log(document.documentElement.clientWidth)
const repoContainer = document.getElementById('repos');
const repoScrollWidth = repoContainer.scrollWidth;
window.addEventListener('load', () => {
  self.setInterval(() => {
    if (repoContainer.scrollLeft > repoScrollWidth * (2.213)) { //2.213 only really works for 1366x768 with real width of 1349px
      repoContainer.scrollTo(0, 0);
    } else {
      repoContainer.scrollTo(repoContainer.scrollLeft + 1, 0);
    }
  }, 15);
});


/* //a much better implementation but i wasn't able to get it to work
const repoContainer = document.getElementById("repos");
const repoScrollWidth = repoContainer.scrollWidth;

window.addEventListener("load", () => {
  self.setInterval(() => {
    const first = document.querySelector("#repos .card");

    if (!isElementInViewport(first)) {
      repoContainer.appendChild(first);
      repoContainer.scrollTo(repoContainer.scrollLeft - first.offsetWidth, 0);
    }
    if (repoContainer.scrollLeft !== repoScrollWidth) {
      repoContainer.scrollTo(repoContainer.scrollLeft + 1, 0);
    }
  }, 15);
});

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return rect.right > 0;
} */
