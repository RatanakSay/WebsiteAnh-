// Data routing links Top Dropdown Menu items to Sidebar lists and local HTML target paths
const menuData = {
    "consumer": {
        title: "Project",
        items: [
            { name: "s", url:"kk.html" },
            { name: "SIna", url: "laptops.html" },
            { name: "shit", url: "audio.html" },
            { name: "MORE shit", url: "wearables.html" }
        ]
    },
    "components": {
        title: "Circuit Components",
        items: [
            { name: "Microcontrollers", url: "microcontrollers.html" },
            { name: "Resistors & Capacitors", url: "resistors.html" },
            { name: "Sensors & Modules", url: "sensors.html" },
            { name: "Relays & Switches", url: "switches.html" }
        ]
    },
    "smart-home": {
        title: "project",
        items: [
            { name: "សៀវភៅរូបមន្ត", url:  "fr\formulaBook\formulaBook.html" },
            { name: "កម្រិតទឹក", url: "fr\formulaBook\waterlevel.html" },
            { name: "shit", url: "thermostats.html" },
            { name: "shit", url: "assistants.html" }
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
            
            // Default select the first choice upon menu swapping
            if(index === 0) {
                a.classList.add('active');
                contentFrame.src = item.url;
            }

            // Sync visual active highlight classes when switching sidebar entries manually
            a.addEventListener('click', () => {
                document.querySelectorAll('#sidebar-menu a').forEach(link => link.classList.remove('active'));
                a.classList.add('active');
            });

            li.appendChild(a);
            sidebarMenu.appendChild(li);
        });
    }
}

// Global hook processing header drop-menu item clicks
dropdownMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const selectedTopic = e.target.getAttribute('data-topic');
        updateMenu(selectedTopic);
    }
});

// Structural initialization sequence running directly on first page-mount
document.addEventListener('DOMContentLoaded', () => {
    updateMenu('consumer');
});
