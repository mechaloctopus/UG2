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
    let isAnimating = true;
    let lastScrollY = 0;
    let accumulatedScroll = 0;

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function updateAnimation(progress) {
        const easedProgress = easeInOutQuad(progress);

        const manScale = 1.5 - easedProgress * 0.7;
        const manY = easedProgress * 40;
        man.style.transform = `translate(-50%, -${manY}%) scale(${manScale})`;

        const mountainX = easedProgress * 60;
        leftMountain.style.transform = `translateX(${-mountainX}%)`;
        rightMountain.style.transform = `translateX(${mountainX}%)`;

        const cloudX = easedProgress * 400;
        leftCloud.style.transform = `translateX(${-cloudX}%)`;
        rightCloud.style.transform = `translateX(${cloudX}%)`;

        title.style.opacity = 1 - easedProgress;
        background.style.transform = `scale(${1 + easedProgress * 0.1})`;
    }

    function handleScroll() {
        const scrollY = parallaxContainer.scrollTop;
        const scrollDelta = scrollY - lastScrollY;
        
        if (isAnimating) {
            accumulatedScroll += scrollDelta;
            const progress = Math.min(Math.max(accumulatedScroll / animationDistance, 0), 1);
            updateAnimation(progress);

            if (progress >= 1) {
                isAnimating = false;
            } else if (progress <= 0) {
                isAnimating = true;
            }

            // Prevent default scroll behavior during animation
            parallaxContainer.scrollTop = lastScrollY;
        }

        lastScrollY = scrollY;
    }

    // Use passive scroll event for better performance
    parallaxContainer.addEventListener('scroll', handleScroll, { passive: true });

    // Touch events for mobile devices
    let touchStartY;

    parallaxContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    parallaxContainer.addEventListener('touchmove', (e) => {
        if (!touchStartY) return;

        const touchY = e.touches[0].clientY;
        const touchDelta = touchStartY - touchY;

        if (isAnimating) {
            e.preventDefault();
            accumulatedScroll += touchDelta;
            const progress = Math.min(Math.max(accumulatedScroll / animationDistance, 0), 1);
            updateAnimation(progress);

            if (progress >= 1) {
                isAnimating = false;
            } else if (progress <= 0) {
                isAnimating = true;
            }
        }

        touchStartY = touchY;
    }, { passive: false });

    // Initial call to set positions
    updateAnimation(0);
});
