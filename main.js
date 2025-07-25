const USERNAME = "YouthHalo";

// Section Navigation System - Controls terminal-style page navigation
function showSection(sectionId, updateHistory = true) {
	// Hide all section slices by removing 'active' class
	document.querySelectorAll(".section-slice").forEach((section) => {
		section.classList.remove("active");
	});

	// Show the selected section by adding 'active' class
	document.getElementById(sectionId).classList.add("active");

	// Update terminal navigation tabs - remove active state from all tabs
	document.querySelectorAll(".nav-tab").forEach((tab) => {
		tab.classList.remove("active");
	});
	// Add active state to the clicked tab
	document
		.querySelector(`[data-section="${sectionId}"]`)
		.classList.add("active");

	// Update terminal path display to show current location like terminal
	const pathMap = {
		home: "~",
		projects: "/projects",
		contact: "/contact",
	};
	document.getElementById("current-path").textContent = pathMap[sectionId];

	// Breaks when refreshing the page on anything that is not the home section
	if (updateHistory) {
		const urlMap = {
			home: "/",
			projects: "/projects",
			contact: "/contact",
		};
		const newUrl = urlMap[sectionId];
		history.pushState({ section: sectionId }, "", newUrl);
	}
}

// Browser History Management - Handle back/forward button navigation
window.addEventListener("popstate", (event) => {
	if (event.state && event.state.section) {
		// Navigate to section from browser history
		showSection(event.state.section, false);
	} else {
		// Handle direct URL access when no state exists
		const path = window.location.pathname;
		const sectionMap = {
			"/": "home",
			"/projects": "projects",
			"/contact": "contact",
		};
		const section = sectionMap[path] || "home";
		showSection(section, false);
	}
});

// Page Initialization - Determine which section to show based on current URL
function initializePage() {
	const path = window.location.pathname;
	const sectionMap = {
		"/": "home",
		"/projects": "projects",
		"/contact": "contact",
	};
	const section = sectionMap[path] || "home";
	showSection(section, false);
}

// Terminal Navigation Event Listeners - Handle terminal tab clicks
document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".nav-tab").forEach((tab) => {
		tab.addEventListener("click", () => {
			const section = tab.getAttribute("data-section");
			showSection(section);
		});
	});
});

// Projects System - Handle tag filtering for HTML-based projects
function initializeProjects() {
	sortProjectsByDate();
	setupTagFiltering();
	setupProjectImages();
}

// Sort Projects by Creation Date - Automatically sort projects from newest to oldest
function sortProjectsByDate() {
	const projectsContainer = document.getElementById('projects-grid');
	if (!projectsContainer) return;
	
	// Get all project cards
	const projectCards = Array.from(projectsContainer.querySelectorAll('.custom-project-card'));
	
	// Sort by creation date (newest first)
	projectCards.sort((a, b) => {
		const dateA = getCreationDate(a);
		const dateB = getCreationDate(b);
		return dateB - dateA; // Newest first (descending order)
	});
	
	// Clear container and re-append in sorted order
	projectsContainer.innerHTML = '';
	projectCards.forEach(card => {
		projectsContainer.appendChild(card);
	});
}

// Extract Creation Date - Parse the first date from project-dates span
function getCreationDate(projectCard) {
	const datesElement = projectCard.querySelector('.project-dates');
	if (!datesElement) return new Date(0); // Fallback to epoch if no date
	
	const datesText = datesElement.textContent.trim();
	const firstDate = datesText.split(' - ')[0]; // Get first part before dash
	
	// Parse date (handle both full month names and abbreviations)
	return parseProjectDate(firstDate);
}

// Parse Project Date - Convert date string to Date object
function parseProjectDate(dateString) {
	// Clean up the date string
	const cleanDate = dateString.trim();
	
	// Month mapping for abbreviations and full names
	const monthMap = {
		'jan': 0, 'january': 0,
		'feb': 1, 'february': 1,
		'mar': 2, 'march': 2,
		'apr': 3, 'april': 3,
		'may': 4,
		'jun': 5, 'june': 5,
		'jul': 6, 'july': 6,
		'aug': 7, 'august': 7,
		'sep': 8, 'september': 8,
		'oct': 9, 'october': 9,
		'nov': 10, 'november': 10,
		'dec': 11, 'december': 11
	};
	
	// Split date string (e.g., "Jan 2025" or "January 2025")
	const parts = cleanDate.toLowerCase().split(' ');
	if (parts.length >= 2) {
		const monthStr = parts[0];
		const year = parseInt(parts[1]);
		
		if (monthMap.hasOwnProperty(monthStr) && !isNaN(year)) {
			return new Date(year, monthMap[monthStr], 1);
		}
	}
	
	// Fallback: try to parse as-is
	const fallbackDate = new Date(cleanDate);
	return isNaN(fallbackDate.getTime()) ? new Date(0) : fallbackDate;
}

// Setup Project Images - Handle image loading and fallbacks
function setupProjectImages() {
	document.querySelectorAll('.custom-project-card').forEach(card => {
		const img = card.querySelector('.project-image');
		const placeholder = card.querySelector('.project-placeholder');
		
		if (img && img.src && img.src.trim() !== '' && img.src !== window.location.href) {
			// Show image if src is provided and not empty
			img.style.display = 'block';
			placeholder.style.display = 'none';
			
			// Handle image load errors
			img.onerror = () => {
				img.style.display = 'none';
				placeholder.style.display = 'flex';
			};
		} else {
			// Show placeholder if no image
			img.style.display = 'none';
			placeholder.style.display = 'flex';
		}
	});
}

// Tag Filtering System - Handle project filtering by tags
function setupTagFiltering() {
	const tagButtons = document.querySelectorAll('.tag-btn');
	
	tagButtons.forEach(button => {
		button.addEventListener('click', () => {
			// Update active button
			tagButtons.forEach(btn => btn.classList.remove('active'));
			button.classList.add('active');
			
			const selectedTag = button.getAttribute('data-tag');
			
			// Get current project cards (need to re-query each time)
			const projectCards = document.querySelectorAll('.custom-project-card');
			
			// Filter projects
			projectCards.forEach(card => {
				const cardTags = card.getAttribute('data-tags');
				
				if (selectedTag === 'all' || cardTags.includes(selectedTag)) {
					card.classList.remove('project-hidden');
				} else {
					card.classList.add('project-hidden');
				}
			});
		});
	});
}

// GitHub API Integration - Fetch user profile data (keeping for profile info)
async function fetchGitHubData() {
	try {
		// Fetch user profile information from GitHub API
		const userResponse = await fetch(
			`https://api.github.com/users/${USERNAME}`
		);
		const userData = await userResponse.json();

		// Update the profile information only (not projects)
		updateProfile(userData);
	} catch (error) {
		console.error("Error fetching GitHub data:", error);
	}
}

// Profile Data Display - Update home section with GitHub profile information
function updateProfile(user) {
	// Update profile avatar image
	//document.getElementById("profile-avatar").src = user.avatar_url;
	// Update display name (use real name if available, otherwise username)
	document.getElementById("github-name").textContent = user.name || user.login;
	// Update bio text
	document.getElementById("github-bio").textContent =
		user.bio || "Developer & Creator";
	// Update location information
	document.getElementById("github-location").textContent =
		user.location || "Unknown";
	// Update follower count
	document.getElementById("github-followers").textContent = user.followers;
	// Update repository count
	document.getElementById("github-repos").textContent = user.public_repos;
	// Update GitHub profile link
	document.getElementById("github-link").href = user.html_url;
	// Update email link (if email is public)
	document.getElementById("email-link").href = `mailto:${
		user.email || "contact@example.com"
	}`;
}

// Terminal Text Input System - Capture keyboard input and display in terminal
let terminalText = "";
const terminalTextElement = document.getElementById("terminal-text");

// Keyboard Input Handler - Capture all keyboard input on the page
document.addEventListener("keydown", (event) => {
	// Prevent default behavior for special keys that we want to handle
	if (
		event.key === "Backspace" ||
		event.key === "Enter" ||
		event.key === "Escape"
	) {
		event.preventDefault();
	}

	// Handle different key types
	switch (event.key) {
		case "Backspace":
			// Remove last character from terminal text
			terminalText = terminalText.slice(0, -1);
			updateTerminalDisplay();
			break;

		case "Enter":
			// Clear terminal text on Enter
			terminalText = "";
			updateTerminalDisplay();
			break;

		case "Escape":
			// Clear all terminal text on Escape
			terminalText = "";
			updateTerminalDisplay();
			break;

		default:
			// Add printable characters to terminal text
			if (
				event.key.length === 1 &&
				!event.ctrlKey &&
				!event.altKey &&
				!event.metaKey
			) {
				terminalText += event.key;
				updateTerminalDisplay();
			}
			break;
	}
});

// Update Terminal Display - Refresh the terminal text display
function updateTerminalDisplay() {
	if (terminalTextElement) {
		terminalTextElement.textContent = terminalText;
	}
}

// Handle 404 Redirects - Check if we're being redirected from 404 page
function handle404Redirect() {
	const hash = window.location.hash;
	if (hash.startsWith('#redirect=')) {
		// Extract the original path from the hash
		const originalPath = decodeURIComponent(hash.substring(10)); // Remove '#redirect='
		console.log('Handling 404 redirect to:', originalPath);
		
		// Clear the hash and update the URL
		history.replaceState(null, '', originalPath);
		
		// Navigate to the correct section
		const sectionMap = {
			'/': 'home',
			'/projects': 'projects',
			'/contact': 'contact'
		};
		const section = sectionMap[originalPath] || 'home';
		showSection(section, false);
		return true; // Indicate that we handled a redirect
	}
	return false; // No redirect to handle
}

// Application Initialization - Set up page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
	// First check if we're handling a 404 redirect
	if (!handle404Redirect()) {
		// If no redirect, initialize normally based on current URL
		initializePage();
	}
	// Initialize custom projects system
	initializeProjects();
	// Fetch and display GitHub data for profile
	fetchGitHubData();
	// Initialize terminal text display
	updateTerminalDisplay();
});
