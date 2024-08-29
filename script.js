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
        const subtitles = section.querySelectorAll('.subtitle');
        const floatingTexts = section.querySelectorAll('.floating-text');
        const background = section.querySelector('.background');

        if (title) {
            title.style.transform = `translateY(${progress * 50}px) scale(${1 - progress * 0.3})`;
            title.style.opacity = 1 - progress;
        }

        subtitles.forEach((subtitle, index) => {
            const direction = index % 2 === 0 ? -1 : 1;
            subtitle.style.transform = `translateX(${progress * 100 * direction}px)`;
            subtitle.style.opacity = 1 - progress;
        });

        floatingTexts.forEach((text, index) => {
            const verticalDirection = index % 2 === 0 ? -1 : 1;
            const horizontalDirection = index % 3 === 0 ? -1 : 1;
            text.style.transform = `translate(${progress * 50 * horizontalDirection}px, ${progress * 50 * verticalDirection}px)`;
            text.style.opacity = 1 - progress;
        });

        if (background) {
            background.style.transform = `scale(${1 + progress * 0.1})`;
        }

        // Special animation for content section
        if (section.classList.contains('content-section')) {
            const contentWrapper = section.querySelector('.content-wrapper');
            if (contentWrapper) {
                contentWrapper.style.transform = `translateY(${(1 - progress) * 50}px)`;
                contentWrapper.style.opacity = progress;
            }
        }
    }

    parallaxContainer.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set positions
});
