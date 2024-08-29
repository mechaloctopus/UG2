document.addEventListener('DOMContentLoaded', () => {
    const parallaxContainer = document.querySelector('.parallax-container');
    const sections = document.querySelectorAll('.parallax-section, .content-section');

    function handleScroll() {
        const scrollY = parallaxContainer.scrollTop;
        sections.forEach((section, index) => {
            const sectionTop = index * window.innerHeight;
            const sectionBottom = sectionTop + window.innerHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                const progress = (scrollY - sectionTop) / window.innerHeight;
                animateSection(section, progress);
            }
        });
    }

    function animateSection(section, progress) {
        const title = section.querySelector('.title');
        const man = section.querySelector('.man');
        const mountains = section.querySelectorAll('.mountain');
        const clouds = section.querySelectorAll('.cloud');
        const background = section.querySelector('.background');

        if (title) title.style.transform = `translateY(${progress * 50}px)`;
        if (man) man.style.transform = `translate(-50%, ${progress * -50}px) scale(${1 - progress * 0.3})`;
        mountains.forEach((mountain, index) => {
            mountain.style.transform = `translateX(${progress * (index % 2 ? 50 : -50)}px)`;
        });
        clouds.forEach((cloud, index) => {
            cloud.style.transform = `translateX(${progress * (index % 2 ? 100 : -100)}px)`;
        });
        if (background) background.style.transform = `scale(${1 + progress * 0.1})`;

        // Special animation for section 3
        if (section.id === 'section3') {
            const tree = section.querySelector('.tree');
            const peekMan = section.querySelector('.peek-man');
            if (tree) tree.style.transform = `translateX(${progress * -20}%)`;
            if (peekMan) peekMan.style.transform = `translateX(${progress * 50}%)`;
        }
    }

    parallaxContainer.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set positions
});
