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

let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        initSidebarState();
    }, 250);
});

initSidebarState();

// ====================================
// SIDEBAR HIGHLIGHT AUTOMATION
// ====================================
function highlightActiveSidebar() {
    const urlParams = new URLSearchParams(window.location.search);
    const currentTopic = urlParams.get('topic') || 'home';
    let currentPage = urlParams.get('page');

    // Sync up with the active defaults setup in PHP index router
    if (!currentPage) {
        if (currentTopic === 'components') currentPage = 'resistor';
        else if (currentTopic === 'smart-home') currentPage = 'formula';
        else currentPage = 'home_dash';
    }

    // Inspect list items inside sidebar navigation and flag active states
    const links = document.querySelectorAll('#sidebar-menu a');
    links.forEach(a => {
        const href = a.getAttribute('href') || '';
        const queryString = href.split('?')[1] || '';
        const linkUrl = new URLSearchParams(queryString);
        if (linkUrl.get('page') === currentPage) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', highlightActiveSidebar);

// ====================================
// THEME TOGGLE (DARK / LIGHT MODE)
// ====================================
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('nakheng-theme', theme);
}

themeToggle.addEventListener('click', function() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    applyTheme(isDark ? 'light' : 'dark');
});
