document.addEventListener('DOMContentLoaded', () => {
    const parallaxContainer = document.querySelector('.parallax-container');
    const section1 = document.getElementById('section1');
    const man = section1.querySelector('.man');
    const leftMountain = section1.querySelector('.mountain.left');
    const rightMountain = section1.querySelector('.mountain.right');
    const leftCloud = section1.querySelector('.cloud.left');
    const rightCloud = section1.querySelector('.cloud.right');
    const title = section1.querySelector('.title');

    function handleScroll() {
        const scrollY = parallaxContainer.scrollTop;
        const sectionHeight = section1.offsetHeight;
        const progress = Math.min(scrollY / sectionHeight, 1);

        // Man moves up and gets smaller
        man.style.transform = `translate(-50%, ${progress * -30}%) scale(${1 - progress * 0.5})`;

        // Mountains move out slowly
        leftMountain.style.transform = `translateX(${-progress * 20}%)`;
        rightMountain.style.transform = `translateX(${progress * 20}%)`;

        // Clouds move out more quickly
        leftCloud.style.transform = `translateX(${-progress * 50}%)`;
        rightCloud.style.transform = `translateX(${progress * 50}%)`;

        // Title fades out
        title.style.opacity = 1 - progress;

        // Optional: subtle zoom effect on background
        section1.querySelector('.background').style.transform = `scale(${1 + progress * 0.1})`;
    }

    parallaxContainer.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set positions
});
