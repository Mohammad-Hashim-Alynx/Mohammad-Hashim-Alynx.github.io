// ================= SCROLL REVEAL ANIMATIONS =================
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < windowHeight - 100) {
            section.classList.add('active');
        }
    });
}

// Initialize scroll reveal
if (reveals.length > 0) {
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    revealOnScroll();
}

// ================= DROPDOWN FUNCTIONALITY =================
function initDropdown() {
    const dropdownToggle = document.getElementById('dropdownToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    // Exit if no dropdown exists on this page
    if (!dropdownToggle || !dropdownMenu) {
        console.log('No dropdown elements found on this page');
        return;
    }
    
    console.log('Dropdown elements found, initializing...');
    
    let isDropdownOpen = false;
    
    // Function to open dropdown
    function openDropdown() {
        if (isDropdownOpen) return;
        
        dropdownMenu.classList.add('active');
        dropdownToggle.classList.add('active');
        dropdownToggle.setAttribute('aria-expanded', 'true');
        isDropdownOpen = true;
        
        // Lock body scroll on mobile
        if (window.innerWidth <= 768) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
        }
        
        console.log('Dropdown opened');
    }
    
    // Function to close dropdown
    function closeDropdown() {
        if (!isDropdownOpen) return;
        
        dropdownMenu.classList.remove('active');
        dropdownToggle.classList.remove('active');
        dropdownToggle.setAttribute('aria-expanded', 'false');
        isDropdownOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
        
        console.log('Dropdown closed');
    }
    
    // Function to toggle dropdown
    function toggleDropdown() {
        if (isDropdownOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }
    
    // ================= EVENT LISTENERS =================
    
    // Toggle on button click
    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation(); // CRITICAL: Prevent other handlers
        
        console.log('Dropdown toggle clicked');
        toggleDropdown();
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(event) {
        // If click is NOT inside dropdown or toggle button
        if (!dropdownMenu.contains(event.target) && !dropdownToggle.contains(event.target)) {
            closeDropdown();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isDropdownOpen) {
            closeDropdown();
        }
    });
    
    // Prevent dropdown from closing when clicking inside it
    dropdownMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Allow scrolling inside dropdown without affecting page
    dropdownMenu.addEventListener('wheel', function(e) {
        e.stopPropagation();
    }, { passive: true });
    
    // Handle mobile view changes
    window.addEventListener('resize', function() {
        // If dropdown is open and we switch to desktop, restore scroll
        if (window.innerWidth > 768 && isDropdownOpen) {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
        }
        // If dropdown is open and we switch to mobile, lock scroll
        else if (window.innerWidth <= 768 && isDropdownOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
        }
    });
    
    console.log('Dropdown controller initialized successfully');
}

// ================= INITIALIZE EVERYTHING =================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded - initializing scripts');
    
    // Initialize dropdown
    initDropdown();
    
    console.log('All scripts initialized');
});

// Re-check reveal animations on resize
window.addEventListener('resize', revealOnScroll);