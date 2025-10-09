// JavaScript functionality for the website
document.addEventListener('DOMContentLoaded', function() {
    // Back to top button functionality (supports multiple markup variants)
    const backToTopAnchor = document.getElementById('topBtn')
        || document.querySelector('.back-to-top a')
        || document.getElementById('back-to-top');
    const backToTopContainer = document.querySelector('.back-to-top')
        || document.getElementById('back-to-top');
    const toggleEl = backToTopContainer || backToTopAnchor;

    if (toggleEl) {
        // Show/hide based on scroll position
        const onScroll = () => {
            if (window.pageYOffset > 100) {
                toggleEl.style.display = 'block';
            } else {
                toggleEl.style.display = 'none';
            }
        };
        window.addEventListener('scroll', onScroll);
        onScroll();

        // Click to scroll to top smoothly
        const clickTarget = backToTopAnchor || toggleEl;
        clickTarget.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
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

    // Critics page: search filter for review cards
    const searchInput = document.getElementById('criticSearch');
    if (searchInput) {
        const cards = Array.from(document.querySelectorAll('.review-card'));
        const normalize = (s) => (s || '').toLowerCase().trim();
        const getText = (el, sel) => {
            const n = el.querySelector(sel);
            return n ? n.textContent : '';
        };

        const filterCards = (q) => {
            const query = normalize(q);
            if (!query) {
                cards.forEach(c => c.style.display = '');
                return;
            }
            cards.forEach(card => {
                const title = normalize(getText(card, '.review-title'));
                const summary = normalize(getText(card, '.review-summary'));
                const match = title.includes(query) || summary.includes(query);
                card.style.display = match ? '' : 'none';
            });
        };

        // Input handler with light debounce
        let t = null;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(t);
            const val = e.target.value;
            t = setTimeout(() => filterCards(val), 150);
        });
    }
});