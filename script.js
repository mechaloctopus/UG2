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

    function easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
    }

    function handleScroll() {
        const scrollY = parallaxContainer.scrollTop;
        const sectionHeight = section1.offsetHeight;
        const rawProgress = scrollY / (sectionHeight * 1.5); // Slow down the scroll effect
        const progress = Math.min(rawProgress, 1);
        const easedProgress = easeOutCubic(progress);

        // Man starts big at the bottom center and slowly moves up and gets smaller
        const manScale = 1.5 - easedProgress * 0.7;
        const manY = 20 - easedProgress * 40; // Start at 20% from bottom, move up to -20%
        man.style.transform = `translate(-50%, ${manY}%) scale(${manScale})`;
        man.style.bottom = '0%'; // Ensure the man starts at the bottom

        // Mountains move out slowly
        const mountainX = easedProgress * 15;
        leftMountain.style.transform = `translateX(${-mountainX}%)`;
        rightMountain.style.transform = `translateX(${mountainX}%)`;

        // Clouds move out quickly over the mountains
        const cloudX = easedProgress * 100;
        leftCloud.style.transform = `translateX(${-cloudX}%)`;
        rightCloud.style.transform = `translateX(${cloudX}%)`;

        // Title fades out
        title.style.opacity = 1 - easedProgress;

        // Subtle zoom effect on background
        background.style.transform = `scale(${1 + easedProgress * 0.1})`;

        // Fade in the next section
        const nextSection = document.getElementById('section2');
        if (nextSection) {
            const nextSectionStart = sectionHeight * 0.8;
            const nextSectionProgress = (scrollY - nextSectionStart) / (sectionHeight * 0.2);
            nextSection.style.opacity = Math.max(0, Math.min(1, nextSectionProgress));
        }
    }

    parallaxContainer.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set positions
});
