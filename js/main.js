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

    // "更多" 下拉菜单：点击展开并在滚动或鼠标移出后延迟关闭，提升可用性
    const moreDropdown = document.querySelector('.more-dropdown');
    if (moreDropdown) {
        const toggle = moreDropdown.querySelector('.dropdown-toggle');
        const menu = moreDropdown.querySelector('.dropdown-content');
        let closeTimer = null;

        const setExpanded = (open) => {
            if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        };

        const openMenu = () => {
            moreDropdown.classList.add('open');
            setExpanded(true);
            clearTimeout(closeTimer);
        };

        const closeMenu = () => {
            moreDropdown.classList.remove('open');
            setExpanded(false);
        };

        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                if (moreDropdown.classList.contains('open')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });
        }

        if (menu) {
            menu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
        }

        moreDropdown.addEventListener('mouseleave', () => {
            clearTimeout(closeTimer);
            closeTimer = setTimeout(closeMenu, 1500); // 鼠标移出后 1.5s 再关闭
        });

        document.addEventListener('click', (e) => {
            if (!moreDropdown.contains(e.target)) {
                closeMenu();
            }
        });

        window.addEventListener('scroll', () => {
            if (moreDropdown.classList.contains('open')) {
                clearTimeout(closeTimer);
                closeTimer = setTimeout(closeMenu, 2000); // 滚动时保持至少 2s 可见
            }
        });

        // 保障“艺术商品”入口点击后可靠跳转
        const artProductLink = moreDropdown.querySelector('.dropdown-content a[href="art-product.html"]');
        if (artProductLink) {
            artProductLink.addEventListener('click', (e) => {
                // 防止外层监听造成的提前关闭或阻断
                e.stopPropagation();
                // 明确执行页面跳转
                window.location.href = 'art-product.html';
            });
        }
    }

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

    // Global image fallback: if an image fails to load, swap to a local placeholder
    // Supports optional per-image fallback via data-fallback="..."
    const addImageFallback = () => {
        const defaultPlaceholder = 'images/product-placeholder.svg';
        document.querySelectorAll('img').forEach(img => {
            const onError = () => {
                const fallback = img.getAttribute('data-fallback') || defaultPlaceholder;
                if (img.src !== fallback) {
                    img.src = fallback;
                }
                img.removeEventListener('error', onError);
            };
            img.addEventListener('error', onError);
        });
    };
    addImageFallback();

    // Replace blocked Unsplash sources with stable picsum placeholders (runtime rewrite)
    const rewriteBlockedImages = () => {
        const blockedSelector = 'img[src*="source.unsplash.com"]';
        const imgs = document.querySelectorAll(blockedSelector);
        if (!imgs.length) return;
        imgs.forEach((img, i) => {
            const seedBase = (img.getAttribute('alt') || 'furniture').trim().replace(/\s+/g, '-');
            const seed = `${seedBase}-${i+1}`;
            img.src = `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/800`;
        });
    };
    rewriteBlockedImages();
});