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

    let animationProgress = 0;
    const animationDuration = 5000; // Animation duration in milliseconds
    let animationStartTime = null;
    let isAnimating = false;

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function updateAnimation(progress) {
        const easedProgress = easeInOutQuad(progress);

        // Man animation
        const manScale = 1.5 - easedProgress * 0.7;
        const manY = easedProgress * 40;
        man.style.transform = `translate(-50%, -${manY}%) scale(${manScale})`;

        // Mountains animation (slower)
        const mountainX = easedProgress * 60;
        leftMountain.style.transform = `translateX(${-mountainX}%)`;
        rightMountain.style.transform = `translateX(${mountainX}%)`;

        // Clouds animation
        const cloudX = easedProgress * 150;
        leftCloud.style.transform = `translateX(${-cloudX}%)`;
        rightCloud.style.transform = `translateX(${cloudX}%)`;

        // Title fade out
        title.style.opacity = 1 - easedProgress;

        // Background zoom
        background.style.transform = `scale(${1 + easedProgress * 0.1})`;
    }

    function animateStep(timestamp) {
        if (!animationStartTime) animationStartTime = timestamp;
        const elapsed = timestamp - animationStartTime;

        if (elapsed < animationDuration) {
            animationProgress = elapsed / animationDuration;
            updateAnimation(animationProgress);
            requestAnimationFrame(animateStep);
        } else {
            isAnimating = false;
            parallaxContainer.style.overflowY = 'auto';
        }
    }

    function handleScroll(event) {
        if (isAnimating) {
            event.preventDefault();
            parallaxContainer.scrollTo(0, 0);
            return;
        }

        if (animationProgress < 1) {
            event.preventDefault();
            if (!isAnimating) {
                isAnimating = true;
                animationStartTime = null;
                parallaxContainer.style.overflowY = 'hidden';
                requestAnimationFrame(animateStep);
            }
        }
    }

    parallaxContainer.addEventListener('scroll', handleScroll, { passive: false });

    // Initial call to set positions
    updateAnimation(0);
});
