<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NakHeng Electronic</title>
    <link rel="stylesheet" href="nakhengsloy.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script>
        (function() {
            const saved = localStorage.getItem('nakheng-theme');
            if (saved === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
            }
        })();
    </script>
</head>
<body>

    <?php
    // 1. Get the active topic group from the dropdown selection (defaults to 'home')
    $current_topic = $_GET['topic'] ?? 'home';

    // 2. Map default landing pages for each category topic
    $default_pages = [
        'home' => 'home_dash',
        'components' => 'resistor',
        'smart-home' => 'formula'
    ];

    // 3. Fallback to the default page if no specific page parameter is requested yet
    $page = $_GET['page'] ?? ($default_pages[$current_topic] ?? 'home_dash');
    ?>

    <header class="navbar">
        <div class="logo">
            <div class="logo-text">
                <span class="logo-n">Nak</span><span class="logo-h">Heng</span>
            </div>
            <div class="tagline">WEBSITE ANH</div>
        </div>

        <div class="nav-actions">
            <div class="dropdown">
                <button class="dropbtn">
                    <i class="fas fa-th-large"></i> Categories <i class="fas fa-chevron-down"></i>
                </button>
                <div class="dropdown-content" id="topicDropdown">
                    <a href="?topic=home"><i class="fas fa-home"></i> Home</a>
                    <a href="?topic=components"><i class="fas fa-microchip"></i> Components</a>
                    <a href="?topic=smart-home"><i class="fas fa-project-diagram"></i> Projects</a>
                </div>
            </div>

            <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle Sidebar">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    </header>

    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <div class="main-container">
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <i class="fas fa-folder-open text-accent"></i>
                <h3 id="sidebar-title">
                    <?php
                    // Dynamic Sidebar Context Title based on URL topic parameter
                    switch ($current_topic) {
                        case 'components':
                            echo "Circuit Components";
                            break;
                        case 'smart-home':
                            echo "Project Files";
                            break;
                        default:
                            echo "Overview";
                            break;
                    }
                    ?>
                </h3>
            </div>
            <ul id="sidebar-menu">
                <?php
                // Server-Side Menu Rendering matching the active topic state
                if ($current_topic === 'components') {
                    echo '<li><a href="?topic=components&page=resistor" class="' . ($page == 'resistor' ? 'active' : '') . '">Resistor / រេសុីស្តង់</a></li>';
                    echo '<li><a href="?topic=components&page=esp32" class="' . ($page == 'esp32' ? 'active' : '') . '">ESP32-C3 Supermini</a></li>';
                } elseif ($current_topic === 'smart-home') {
                    echo '<li><a href="?topic=smart-home&page=formula" class="' . ($page == 'formula' ? 'active' : '') . '">សៀវភៅរូបមន្ត (Formula Book)</a></li>';
                    echo '<li><a href="?topic=smart-home&page=water" class="' . ($page == 'water' ? 'active' : '') . '">កម្រិតទឹក (Water Level)</a></li>';
                } else {
                    echo '<li><a href="?topic=home&page=home_dash" class="' . ($page == 'home_dash' ? 'active' : '') . '">Home Dashboard</a></li>';
                }
                ?>
            </ul>
        </aside>

        <main class="content" id="content">
            <div class="frame-wrapper">
                <?php
                // Clean Include Injection Router
                switch ($page) {
                    case 'resistor':
                        include 'componet/Resistor.html';
                        break;
                    case 'esp32':
                        include 'componet/esp32/esp32c3supermini.html';
                        break;
                    case 'formula':
                        include 'fr/formulaBook/formulaBook.html';
                        break;
                    case 'water':
                        include 'fr/formulaBook/waterlevel.html';
                        break;
                    case 'home_dash':
                    default:
                        include 'home.html';
                        break;
                }
                ?>
            </div>
        </main>
    </div>

    <script src="nakhengsloy.js"></script>
</body>
</html>
