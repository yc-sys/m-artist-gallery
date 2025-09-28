// Main JavaScript file for M Artist website

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // For future implementation of smooth scrolling to sections
            console.log('Navigation link clicked:', this.textContent);
        });
    });
    
    // For future implementation of gallery features, modal windows, etc.
});