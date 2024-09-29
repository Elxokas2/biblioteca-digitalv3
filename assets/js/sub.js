document.addEventListener('DOMContentLoaded', function() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const dropdownToggles = document.querySelectorAll('.dropdown__toggle');
    const themeToggle = document.getElementById('theme-toggle');

    // Toggle menu on mobile
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from propagating to document
        navMenu.classList.toggle('show-menu');
        if (navMenu.classList.contains('show-menu')) {
            navToggle.innerHTML = '<i class="ri-close-line"></i>';
        } else {
            navToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
        }
    });

    // Toggle dropdowns on mobile
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownMenu = toggle.nextElementSibling;
                dropdownMenu.classList.toggle('show');
                toggle.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show-menu');
            navToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
        }
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.setAttribute('data-theme', 
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
        );
        themeToggle.innerHTML = document.body.getAttribute('data-theme') === 'dark' 
            ? '<i class="ri-sun-line"></i>' 
            : '<i class="ri-moon-line"></i>';
    });

    // Responsive behavior
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('show-menu');
            navToggle.innerHTML = '<i class="ri-menu-3-line"></i>';
            dropdownToggles.forEach(toggle => {
                toggle.classList.remove('active');
                toggle.nextElementSibling.classList.remove('show');
            });
        }
    });
});

