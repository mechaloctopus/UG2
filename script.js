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
        
        if (isAnimating) {
            animationProgress += delta / animationDistance;
            animationProgress = Math.max(0, Math.min(1, animationProgress));
            
            updateAnimation(animationProgress);
            
            if (animationProgress >= 1) {
                isAnimating = false;
            }
        } else {
            parallaxContainer.scrollTop += delta;
        }

        if (parallaxContainer.scrollTop === 0 && delta < 0) {
            isAnimating = true;
            animationProgress = 1;
        }
    }

    // Use wheel event for desktop
    parallaxContainer.addEventListener('wheel', handleScroll, { passive: false });

    // Touch events for mobile devices
    let touchStartY;

    parallaxContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: false });

    parallaxContainer.addEventListener('touchmove', (e) => {
        if (!touchStartY) return;

        const touchY = e.touches[0].clientY;
        const touchDelta = touchStartY - touchY;

        handleScroll({ preventDefault: () => {}, deltaY: touchDelta });

        touchStartY = touchY;
    }, { passive: false });

    // Initial call to set positions
    updateAnimation(0);
});
