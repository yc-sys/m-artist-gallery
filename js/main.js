// JavaScript functionality for the website
document.addEventListener('DOMContentLoaded', function() {
    // Back to top button functionality
    const topBtn = document.getElementById('topBtn');
    if (topBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                topBtn.style.display = 'block';
            } else {
                topBtn.style.display = 'none';
            }
        });

        // Smooth scroll to top when clicked
        topBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.categories-nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#more') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Video button handler (opens provided data-video URL or shows placeholder)
    const videoButtons = document.querySelectorAll('.video-button');
    videoButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const url = this.getAttribute('data-video');
            if (url && url !== '#') {
                // Allow default navigation if target is set to _blank
                if (!this.hasAttribute('target')) {
                    e.preventDefault();
                }
                window.open(url, '_blank');
            } else {
                e.preventDefault();
                alert('该作品的视频讲解将稍后上线，敬请期待。');
            }
        });
    });
});