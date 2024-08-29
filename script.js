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
    let targetProgress = 0;
    let isAnimating = false;
    let lastScrollTop = 0;

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

    function animateProgress() {
        if (Math.abs(targetProgress - animationProgress) > 0.001) {
            animationProgress += (targetProgress - animationProgress) * 0.1;
            updateAnimation(animationProgress);
            requestAnimationFrame(animateProgress);
        } else {
            isAnimating = false;
            if (targetProgress >= 1) {
                parallaxContainer.style.position = 'absolute';
            } else if (targetProgress <= 0) {
                parallaxContainer.style.position = 'fixed';
            }
        }
    }

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = scrollTop > lastScrollTop ? 1 : -1;
        
        if (scrollTop <= animationDistance) {
            targetProgress = scrollTop / animationDistance;
            parallaxContainer.style.position = 'fixed';
            parallaxContainer.style.top = '0';
        } else {
            targetProgress = 1;
            parallaxContainer.style.position = 'absolute';
            parallaxContainer.style.top = `${animationDistance}px`;
        }

        if (!isAnimating) {
            isAnimating = true;
            requestAnimationFrame(animateProgress);
        }

        lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Touch events for mobile devices
    let touchStartY;

    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!touchStartY) return;

        const touchY = e.touches[0].clientY;
        const touchDelta = touchStartY - touchY;

        window.scrollBy(0, touchDelta);

        touchStartY = touchY;
    }, { passive: true });

    // Handle scroll position on page load or refresh
    function handleScrollPosition() {
        const scrollPosition = window.scrollY;
        if (scrollPosition <= animationDistance) {
            targetProgress = scrollPosition / animationDistance;
            parallaxContainer.style.position = 'fixed';
            parallaxContainer.style.top = '0';
        } else {
            targetProgress = 1;
            parallaxContainer.style.position = 'absolute';
            parallaxContainer.style.top = `${animationDistance}px`;
        }
        animationProgress = targetProgress;
        updateAnimation(animationProgress);
    }

    window.addEventListener('load', handleScrollPosition);
    window.addEventListener('resize', () => {
        animationDistance = window.innerHeight;
        handleScrollPosition();
    });

    // Initial call to set positions
    handleScrollPosition();
});
