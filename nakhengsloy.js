// ====================================
// SIDEBAR TOGGLE FUNCTIONALITY
// ====================================
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');
const sidebarOverlay = document.getElementById('sidebarOverlay');

let sidebarVisible = true;

function isMobile() {
    return window.innerWidth <= 768;
}

function initSidebarState() {
    if (isMobile()) {
        sidebar.classList.add('hidden');
        sidebar.classList.remove('visible');
        content.classList.add('expanded');
        sidebarVisible = false;
    } else {
        sidebar.classList.remove('hidden');
        sidebar.classList.remove('visible');
        content.classList.remove('expanded');
        sidebarVisible = true;
    }
}

function toggleSidebar() {
    sidebarVisible = !sidebarVisible;
    
    if (isMobile()) {
        if (sidebarVisible) {
            sidebar.classList.remove('hidden');
            sidebar.classList.add('visible');
            sidebarOverlay.classList.add('active');
        } else {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('visible');
            sidebarOverlay.classList.remove('active');
        }
    } else {
        if (sidebarVisible) {
            sidebar.classList.remove('hidden');
            content.classList.remove('expanded');
        } else {
            sidebar.classList.add('hidden');
            content.classList.add('expanded');
        }
    }
}

sidebarToggle.addEventListener('click', toggleSidebar);

sidebarOverlay.addEventListener('click', function() {
    if (isMobile() && sidebarVisible) {
        toggleSidebar();
    }
});

sidebar.addEventListener('click', function(e) {
    if (isMobile() && e.target.tagName === 'A') {
        toggleSidebar();
    }
});

let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        initSidebarState();
    }, 250);
});

initSidebarState();

// ====================================
// MENU DATA & CONTENT MANAGEMENT
// ====================================
const menuData = {
    "components": {
        title: "Circuit Components",
        items: [
            { name: "Resistor / រេសុីស្តង់", url: "componet\\Resistor.html" },
            { name: "ESP32-C3 Supermini", url: "componet\\esp32\\esp32c3supermini.html" }
        ]
    },
    "smart-home": {
        title: "Project Files",
        items: [
            { name: "សៀវភៅរូបមន្ត (Formula Book)", url: "fr\\formulaBook\\formulaBook.html" },
            { name: "កម្រិតទឹក (Water Level)", url: "fr\\formulaBook\\waterlevel.html" }
        ]
    },
    "home": {
        title: "Overview",
        items: [
            { name: "Home Dashboard", url: "home.html" }
        ]
    }
};

const dropdownMenu = document.getElementById('topicDropdown');
const sidebarTitle = document.getElementById('sidebar-title');
const sidebarMenu = document.getElementById('sidebar-menu');
const contentFrame = document.getElementById('content-frame');

function updateMenu(categoryKey) {
    const data = menuData[categoryKey];
    
    if (data) {
        sidebarTitle.textContent = data.title;
        sidebarMenu.innerHTML = '';
        
        data.items.forEach((item, index) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.url;
            a.textContent = item.name;
            a.target = "content-frame";
            
            if(index === 0) {
                a.classList.add('active');
                contentFrame.src = item.url;
            }

            a.addEventListener('click', () => {
                document.querySelectorAll('#sidebar-menu a').forEach(link => link.classList.remove('active'));
                a.classList.add('active');
            });

            li.appendChild(a);
            sidebarMenu.appendChild(li);
        });
    }
}

dropdownMenu.addEventListener('click', (e) => {
    const targetLink = e.target.closest('a');
    if (targetLink) {
        e.preventDefault();
        const selectedTopic = targetLink.getAttribute('data-topic');
        updateMenu(selectedTopic);
    }
});

// Fixed initialization sequence to hook into 'home' default routes
document.addEventListener('DOMContentLoaded', () => {
    updateMenu('home');
});
