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
		contact: "/contact"
		
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
	// Update display name (use real name if available, otherwise username)
	document.getElementById("github-name").textContent = user.name || user.login;
	// Update bio text
	document.getElementById("github-bio").textContent =
		user.bio || "Developer & Creator";
	// Update location information
	document.getElementById("github-location").textContent =
		user.location || "Ontario, Canada";
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

// Terminal Text Input System - Click-to-focus terminal input
let terminalText = "";
let isShowingTempMessage = false; // Flag to track if showing temporary message
let isTerminalFocused = false; // Track if terminal is focused for input
const terminalTextElement = document.getElementById("terminal-text");
const terminalCursorElement = document.querySelector(".terminal-cursor");
const terminalInputArea = document.getElementById("terminal-input-area");

//Focus terminal for input
terminalInputArea.addEventListener("click", () => {
	focusTerminal();
});

//Unfocus terminal when clicking elsewhere
document.addEventListener("click", (event) => {
	if (!terminalInputArea.contains(event.target)) {
		unfocusTerminal();
	}
});

//Enable input and show cursor
function focusTerminal() {
	isTerminalFocused = true;
	terminalCursorElement.classList.remove("hidden");
	terminalInputArea.classList.add("terminal-focused");
}

//Disable input and hide cursor
function unfocusTerminal() {
	isTerminalFocused = false;
	terminalCursorElement.classList.add("hidden");
	terminalInputArea.classList.remove("terminal-focused");
}

// Only capture input when terminal is focused
document.addEventListener("keydown", (event) => {
	// Only handle input if terminal is focused
	if (!isTerminalFocused) return;
	
	// Prevent default behavior for special keys when terminal is focused
	if (
		event.key === "Backspace" ||
		event.key === "Enter" ||
		event.key === "Escape" ||
		event.key === " " // Prevent spacebar from scrolling page
	) {
		event.preventDefault();
	}

	// Handle different key types
	switch (event.key) {
		
		case "Backspace":
			terminalText = terminalText.slice(0, -1);
			updateTerminalDisplay();
			break;

		case "Enter":
			processTerminalCommand(terminalText.trim());
			terminalText = "";
			updateTerminalDisplay();
			break;

		case "Escape":
			terminalText = "";
			updateTerminalDisplay();
			unfocusTerminal(); // Unfocus on escape
			break;

		default:
			// Add characters to terminal text
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

function updateTerminalDisplay() {
	if (terminalTextElement && !isShowingTempMessage) {
		terminalTextElement.textContent = terminalText;
	}
}

// Show Temporary Message - Display message for 2 seconds then return to normal
function showTempMessage(message, color = '#ff6b6b') {
	if (!terminalTextElement) return;
	
	isShowingTempMessage = true;
	const originalColor = terminalTextElement.style.color;
	
	// Show the temporary message with specified color
	terminalTextElement.textContent = message;
	terminalTextElement.style.color = color;
	
	// After 2 seconds, restore normal terminal display
	setTimeout(() => {
		isShowingTempMessage = false;
		terminalTextElement.style.color = originalColor;
		updateTerminalDisplay();
	}, 2000);
}

// Process Terminal Commands - Handle terminal command execution
function processTerminalCommand(command) {
	if (!command) return;
	
	console.log('Processing terminal command:', command);
	
	// Split command into parts (command and arguments)
	const parts = command.toLowerCase().split(' ');
	const cmd = parts[0];
	const args = parts.slice(1);
	
	switch (cmd) {
		case 'cd':
			handleCdCommand(args);
			break;
			
		case 'neofetch':
			handleNeofetchCommand();
			break;
			
		case 'ls':
		case 'dir':
			handleLsCommand();
			break;
			
		case 'help':
			handleHelpCommand();
			break;
			
		case 'clear':
			// Clear command handled by existing logic
			break;
			
		default:
			// Unknown command - show error message in terminal
			showTempMessage(`command not found: ${cmd}`);
			break;
	}
}

// Handle CD Command - Navigate to different sections
function handleCdCommand(args) {
	if (args.length === 0) {
		// cd with no arguments goes to home
		showSection('home');
		return;
	}
	
	const target = args[0].toLowerCase();
	const currentPath = window.location.pathname;
	
	// Map of valid cd targets to sections
	const sectionMap = {
		'~': 'home',
		'projects': 'projects',
		'contact': 'contact',
		'..': 'home', // Go back to home
		'/': 'home'
	};
	
	// check if target valid
	if (!sectionMap[target]) {
		showTempMessage(`cd: ${target}: No such file or directory`);
		return;
	}
	
	// Prevent direct navigation between projects and contact
	if (currentPath === '/projects' && target === 'contact') {
		showTempMessage(`cd: ${target}: No such file or directory`);
		return;
	}
	
	if (currentPath === '/contact' && target === 'projects') {
		showTempMessage(`cd: ${target}: No such file or directory`);
		return;
	}
	
	// Navigate to the target section
	showSection(sectionMap[target]);
}

// Handle Neofetch Command - Open GitHub profile
function handleNeofetchCommand() {
	showTempMessage('Opening GitHub profile...', '#4a9eff');
	window.open(`https://github.com/${USERNAME}`, '_blank');
}

// Handle LS Command - Show available sections
function handleLsCommand() {
	if (window.location.pathname === '/') {
		showTempMessage('home  projects  contact', '#4a9eff');
	} else {
		return; 
	}
}

// Handle Help Command - Show available commands
function handleHelpCommand() {
	showTempMessage('cd [dir] | neofetch | ls | clear | help', '#ffeb3b');
}

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
