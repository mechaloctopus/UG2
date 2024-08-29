document.addEventListener('DOMContentLoaded', () => {
    const parallaxContainer = document.querySelector('.parallax-container');
    const section1 = document.getElementById('section1');
    const man = section1.querySelector('.man');
    const leftMountain = section1.querySelector('.mountain.left');
    const rightMountain = section1.querySelector('.mountain.right');
    const leftCloud = section1.querySelector('.cloud.left');
    const rightCloud = section1.querySelector('.cloud.right');
    const title = section1.querySelector('.title');
    const background = section1.querySelector('.background');
    
    const animationDistance = window.innerHeight;
    let animationProgress = 0;

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function updateAnimation(progress) {
        const easedProgress = easeInOutQuad(progress);

        const manScale = 1.5 - easedProgress * 0.7;
        const manY = easedProgress * 40;
        man.style.transform = `translate(-50%, ${manY}%) scale(${manScale})`;

        const mountainX = easedProgress * 60;
        leftMountain.style.transform = `translateX(${-mountainX}%)`;
        rightMountain.style.transform = `translateX(${mountainX}%)`;

        const cloudX = easedProgress * 400;
        leftCloud.style.transform = `translateX(${-cloudX}%)`;
        rightCloud.style.transform = `translateX(${cloudX}%)`;

        title.style.opacity = 1 - easedProgress;
        background.style.transform = `scale(${1 + easedProgress * 0.1})`;
    }

    function handleScroll(event) {
        event.preventDefault();
        
        const delta = event.deltaY || event.detail || -event.wheelDelta;
        const normalizedDelta = delta / Math.abs(delta); // This will be 1 for scrolling down, -1 for scrolling up
        
        animationProgress += normalizedDelta * 0.05; // Adjust this value to control animation speed
        animationProgress = Math.max(0, Math.min(1, animationProgress));
        
        updateAnimation(animationProgress);
        
        if (animationProgress >= 1 && normalizedDelta > 0) {
            // Animation complete, allow scrolling
            parallaxContainer.style.position = 'static';
            window.scrollTo(0, 1); // Scroll slightly to trigger normal scrolling
        } else if (animationProgress <= 0 && normalizedDelta < 0) {
            // Back to top, lock scrolling
            parallaxContainer.style.position = 'fixed';
            window.scrollTo(0, 0);
        } else {
            // During animation, keep container fixed
            parallaxContainer.style.position = 'fixed';
        }
    }

    // Use wheel event for desktop
    window.addEventListener('wheel', handleScroll, { passive: false });

    // Touch events for mobile devices
    let touchStartY;

    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        if (!touchStartY) return;

        const touchY = e.touches[0].clientY;
        const touchDelta = touchStartY - touchY;

        handleScroll({ preventDefault: () => {}, deltaY: touchDelta });

        touchStartY = touchY;
    }, { passive: false });

    // Handle scroll position on page load or refresh
    function handleScrollPosition() {
        const scrollPosition = window.scrollY;
        if (scrollPosition === 0) {
            animationProgress = 0;
            updateAnimation(0);
            parallaxContainer.style.position = 'fixed';
        } else {
            animationProgress = 1;
            updateAnimation(1);
            parallaxContainer.style.position = 'static';
        }
    }

    window.addEventListener('load', handleScrollPosition);
    window.addEventListener('beforeunload', () => {
        if (animationProgress < 1) {
            window.scrollTo(0, 0);
        }
    });

    // Initial call to set positions
    updateAnimation(0);
});
