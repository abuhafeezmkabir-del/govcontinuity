// GovContinuity Bureau - Lazy Loading System

document.addEventListener('DOMContentLoaded', function() {
    
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                const children = entry.target.querySelectorAll('.lazy-load, .lazy-load-left, .lazy-load-right, .lazy-load-scale, .lazy-load-flip, .lazy-load-blur');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 100}ms`;
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.lazy-load, .lazy-load-left, .lazy-load-right, .lazy-load-scale, .lazy-load-flip, .lazy-load-blur').forEach(el => {
        revealObserver.observe(el);
    });

    // Image lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    const tempImg = new Image();
                    tempImg.onload = () => {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                    };
                    tempImg.src = img.dataset.src;
                } else {
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '100px 0px' });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
});