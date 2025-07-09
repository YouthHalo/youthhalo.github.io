window.scrollTo(0, 0);
window.onbeforeunload = function () {
	window.scrollTo(0, 0);
};

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

const repoContainer = document.getElementById("repos");
const repoScrollWidth = repoContainer.scrollWidth;
let scrollSpeed = 1.5;
let scrollSpeedDecimalTracker = 0;

window.addEventListener("load", () => {
	self.setInterval(() => {
		const scrollLimit = (repoContainer.scrollWidth - repoContainer.clientWidth) * 0.62; //0.6133
		if (repoContainer.scrollLeft >= scrollLimit) {
			repoContainer.scrollTo({ left: 0 });
		} else if (scrollSpeed > 1) {
			repoContainer.scrollTo({ left: repoContainer.scrollLeft + scrollSpeed });
		} else {
			if (scrollSpeedDecimalTracker >= 1) {
				repoContainer.scrollTo({
					left: repoContainer.scrollLeft + Math.floor(scrollSpeedDecimalTracker)
				});
				scrollSpeedDecimalTracker =
					scrollSpeedDecimalTracker - Math.floor(scrollSpeedDecimalTracker);
			} else {
				scrollSpeedDecimalTracker = scrollSpeedDecimalTracker + scrollSpeed;
			}
		}

		// Calculate and print the scrollbar position in %
		const scrollPositionPercent = (repoContainer.scrollLeft / scrollLimit) * 100;
		console.log(`Scroll Position: ${scrollPositionPercent.toFixed(2)}%`);
	}, 15);
});

repoContainer.addEventListener("mouseenter", () => {
	scrollSpeed = 0.75;
});

repoContainer.addEventListener("mouseleave", () => {
	scrollSpeed = 1.5;
});

/*
document.querySelectorAll('a[href="#about"]').forEach(function (a) {
	a.addEventListener("click", function (e) {
	e.preventDefault();
	window.scrollTo({
	top: 0,
		behavior: "smooth", // or 'auto', which defaults to instant or 'instant'
	});
	});
});

document.querySelectorAll('a[href="#projects"]').forEach(function (a) {
  a.addEventListener("click", function (e) {
	e.preventDefault();
	const h2 = document.querySelector('h2:has-text("Projects")');
	window.scrollTo({
		top: h2.offsetTop,
	  behavior: "smooth", // or 'auto', which defaults to instant or 'instant'
	});
  });
});

document.querySelectorAll('a[href="#repos"]').forEach(function (a) {
  a.addEventListener("click", function (e) {
	e.preventDefault();
	const contactSection = document.querySelector(".repos");
	window.scrollTo({
	top: h2.offsetTop,
	  behavior: "smooth", // or 'auto', which defaults to instant or 'instant'
	});
  });
}); */ //these dont do anything yet

document.addEventListener("mousedown", (e) => {
	const circle = document.createElement("div");
	circle.className = "cursor-circle";
	circle.style.position = "absolute";
	circle.style.width = "1px"; // Initial width for the circle
	circle.style.height = "1px"; // Initial height for the circle
	circle.style.borderRadius = "50%"; // Make it a circle
	circle.style.border = "2px solid white"; // Set border color and thickness
	circle.style.outline = "2px solid rgba(255, 255, 255, 0.5)"; // Set outline color and thickness
	circle.style.backgroundColor = "transparent"; // Make background transparent
	circle.style.left = e.pageX + "px"; // Position at click
	circle.style.top = e.pageY + "px";
	circle.style.pointerEvents = "none"; // Ignore pointer events
	circle.style.transition =
		"width 0.2s ease, height 0.2s ease, left 0.2s ease, top 0.2s ease"; // Smooth transition
	circle.style.opacity = "0.75";

	document.body.appendChild(circle);

	// Trigger the transition
	setTimeout(() => {
		circle.style.width = "20px"; // Final width for the circle
		circle.style.height = "20px"; // Final height for the circle
		circle.style.left = e.pageX - 10 + "px"; // Adjust for final size
		circle.style.top = e.pageY - 10 + "px"; // Adjust for final size
	}, 0);

	// Remove the circle after the animation
	setTimeout(() => {
		circle.style.opacity = "0";
		circle.style.transition = "opacity 0.3s ease";
	}, 300); // Delay the opacity transition to allow the circle to grow
	setTimeout(() => {
		circle.remove();
	}, 600); // Match the transition duration
});

document.addEventListener("dblclick", (e) => {
	const circle = document.createElement("div");
	circle.className = "cursor-circle";
	circle.style.position = "absolute";
	circle.style.width = "1px"; // Initial width for the circle
	circle.style.height = "1px"; // Initial height for the circle
	circle.style.borderRadius = "50%"; // Make it a circle
	circle.style.border = "2px solid cyan"; // Set border color and thickness
	circle.style.outline = "2px solid rgba(0, 255, 255, 0.5)"; // Set outline color and thickness
	circle.style.backgroundColor = "transparent"; // Make background transparent
	circle.style.left = e.pageX + "px"; // Position at click
	circle.style.top = e.pageY + "px";
	circle.style.pointerEvents = "none"; // Ignore pointer events
	circle.style.transition =
		"width 0.2s ease, height 0.2s ease, left 0.2s ease, top 0.2s ease"; // Smooth transition
	circle.style.opacity = "0.75";

	document.body.appendChild(circle);

	// Trigger the transition
	setTimeout(() => {
		circle.style.width = "20px"; // Final width for the circle
		circle.style.height = "20px"; // Final height for the circle
		circle.style.left = e.pageX - 10 + "px"; // Adjust for final size
		circle.style.top = e.pageY - 10 + "px"; // Adjust for final size
	}, 0);

	// Remove the circle after the animation
	setTimeout(() => {
		circle.style.opacity = "0";
		circle.style.transition = "opacity 0.3s ease";
	}, 300); // Delay the opacity transition to allow the circle to grow
	setTimeout(() => {
		circle.remove();
	}, 600); // Match the transition duration
});
