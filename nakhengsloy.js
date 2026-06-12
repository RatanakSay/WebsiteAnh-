let sidebarVisible = true;

// Check if mobile
function isMobile() {
    return window.innerWidth <= 768;
}

// Initialize sidebar state based on screen size
function initSidebarState() {
    if (isMobile()) {
        sidebar.classList.add('hidden');
@@ -28,12 +26,10 @@ function initSidebarState() {
    }
}

// Toggle sidebar
function toggleSidebar() {
    sidebarVisible = !sidebarVisible;

    if (isMobile()) {
        // Mobile behavior
        if (sidebarVisible) {
            sidebar.classList.remove('hidden');
            sidebar.classList.add('visible');
@@ -44,7 +40,6 @@ function toggleSidebar() {
            sidebarOverlay.classList.remove('active');
        }
    } else {
        // Desktop behavior
        if (sidebarVisible) {
            sidebar.classList.remove('hidden');
            content.classList.remove('expanded');
@@ -55,24 +50,20 @@ function toggleSidebar() {
    }
}

// Event listeners
sidebarToggle.addEventListener('click', toggleSidebar);

// Close sidebar when clicking overlay (mobile only)
sidebarOverlay.addEventListener('click', function() {
    if (isMobile() && sidebarVisible) {
        toggleSidebar();
    }
});

// Close sidebar when clicking a link on mobile
sidebar.addEventListener('click', function(e) {
    if (isMobile() && e.target.tagName === 'A') {
        toggleSidebar();
    }
});

// Reinitialize on window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
@@ -81,72 +72,58 @@ window.addEventListener('resize', function() {
    }, 250);
});

// Initialize on page load
initSidebarState();

// ====================================
// MENU DATA & CONTENT MANAGEMENT
// ====================================

// Data routing links Top Dropdown Menu items to Sidebar lists and local HTML target paths
const menuData = {

    "components": {
        title: "Circuit Components",
        items: [
            { name: "Resistor/រេសុីស្តង់", url: "componet\\Resistor.html" },
            { name: "Esp32C3 supermini", url: "componet\\esp32\\esp32c3supermini.html" },
            

            { name: "Resistor / រេសុីស្តង់", url: "componet\\Resistor.html" },
            { name: "ESP32-C3 Supermini", url: "componet\\esp32\\esp32c3supermini.html" }
        ]
    },
    "smart-home": {
        title: "project",
        title: "Project Files",
        items: [
            { name: "សៀវភៅរូបមន្ត", url: "fr\\formulaBook\\formulaBook.html" },
            { name: "កម្រិតទឹក", url: "fr\\formulaBook\\waterlevel.html" },
            { name: "សៀវភៅរូបមន្ត (Formula Book)", url: "fr\\formulaBook\\formulaBook.html" },
            { name: "កម្រិតទឹក (Water Level)", url: "fr\\formulaBook\\waterlevel.html" }
        ]
    },
    "home": {
    title: "Home",
    items: [
        { name: "Home Page", url: "home.html" }
    ]
},
        title: "Overview",
        items: [
            { name: "Home Dashboard", url: "home.html" }
        ]
    }
};

// DOM Elements
const dropdownMenu = document.getElementById('topicDropdown');
const sidebarTitle = document.getElementById('sidebar-title');
const sidebarMenu = document.getElementById('sidebar-menu');
const contentFrame = document.getElementById('content-frame');

// Function to rebuild sidebar items and load corresponding iframe source page
function updateMenu(categoryKey) {
    const data = menuData[categoryKey];

    if (data) {
        // Update Sidebar Header Text
        sidebarTitle.textContent = data.title;
        
        // Clear previous sidebar elements
        sidebarMenu.innerHTML = '';

        // Loop through items array and insert dynamic DOM list entries
        data.items.forEach((item, index) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.url;
            a.textContent = item.name;
            a.target = "content-frame"; // Explicit target mapping ensuring execution happens strictly within our frame block
            a.target = "content-frame";

            // Default select the first choice upon menu swapping
            if(index === 0) {
                a.classList.add('active');
                contentFrame.src = item.url;
            }

            // Sync visual active highlight classes when switching sidebar entries manually
            a.addEventListener('click', () => {
                document.querySelectorAll('#sidebar-menu a').forEach(link => link.classList.remove('active'));
                a.classList.add('active');
@@ -158,16 +135,16 @@ function updateMenu(categoryKey) {
    }
}

// Global hook processing header drop-menu item clicks
dropdownMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
    const targetLink = e.target.closest('a');
    if (targetLink) {
        e.preventDefault();
        const selectedTopic = e.target.getAttribute('data-topic');
        const selectedTopic = targetLink.getAttribute('data-topic');
        updateMenu(selectedTopic);
    }
});

// Structural initialization sequence running directly on first page-mount
// Fixed initialization sequence to hook into 'home' default routes
document.addEventListener('DOMContentLoaded', () => {
    updateMenu('consumer');
    updateMenu('home');
});
