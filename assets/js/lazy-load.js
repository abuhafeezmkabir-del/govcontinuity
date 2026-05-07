// GovContinuity Bureau - Lazy Loading System
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('Lazy load system initialized');
    
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, 50);
                
                const children = entry.target.querySelectorAll('.lazy-load, .lazy-load-left, .lazy-load-right, .lazy-load-scale, .lazy-load-flip, .lazy-load-blur');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('revealed');
                    }, index * 80 + 50);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const lazyElements = document.querySelectorAll('.lazy-load, .lazy-load-left, .lazy-load-right, .lazy-load-scale, .lazy-load-flip, .lazy-load-blur');
    console.log('Found ' + lazyElements.length + ' lazy-load elements');
    
    lazyElements.forEach((el) => {
        revealObserver.observe(el);
    });

    // Image lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    const tempImg = new Image();
                    tempImg.onload = () => { img.src = img.dataset.src; img.classList.add('loaded'); };
                    tempImg.onerror = () => { img.src = img.dataset.src; };
                    tempImg.src = img.dataset.src;
                } else {
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '100px 0px', threshold: 0.01 });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
});