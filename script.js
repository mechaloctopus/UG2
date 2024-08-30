document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    let lastScrollY = window.scrollY;
    let targetScrollY = window.scrollY;

    let gifSection, gifImage, gifHeight, frameHeight;
    let lastFrame = 0;

    function initImages() {
        // Title Section
        setImageSource('.logo', IMAGES.LOGO);
        setImageSource('.sparkle', IMAGES.SPARKLE);

        // Section 1
        setBackgroundImage('.section#section1 .background', IMAGES.BACKGROUND);
        setBackgroundImage('.section#section1 .mountain.left', IMAGES.LEFT_MOUNTAIN);
        setBackgroundImage('.section#section1 .mountain.right', IMAGES.RIGHT_MOUNTAIN);
        setBackgroundImage('.section#section1 .cloud.left', IMAGES.LEFT_CLOUD);
        setBackgroundImage('.section#section1 .cloud.right', IMAGES.RIGHT_CLOUD);
        setBackgroundImage('.section#section1 .man', IMAGES.MAN);

        // Section 2
        setBackgroundImage('.section#section2 .background', IMAGES.BACKGROUND2);
        setBackgroundImage('.section#section2 .tree-container .tree', IMAGES.TREE);
        setBackgroundImage('.section#section2 .tree-container .man2', IMAGES.MAN2);

        // Section 3
        setBackgroundImage('.section#section3 .background', IMAGES.BACKGROUND);
        setBackgroundImage('.section#section3 .gem', IMAGES.GEM);
    }

    function setBackgroundImage(selector, url) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.backgroundImage = `url('${url}')`;
            element.style.backgroundSize = 'cover';
            element.style.backgroundPosition = 'center';
            element.style.backgroundRepeat = 'no-repeat';
        });
    }

    function setImageSource(selector, url) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.src = url;
        });
    }

    function initGif() {
        gifSection = document.getElementById('gif-section');
        if (!gifSection) return;

        gifImage = gifSection.querySelector('.gif-image');
        if (!gifImage) return;

        gifImage.onload = () => {
            gifHeight = gifImage.naturalHeight;
            frameHeight = gifHeight / TOTAL_FRAMES;
        };

        gifImage.src = GIF_URL;
    }

    function updateParallax() {
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

            if (progress > -0.25 && progress < 1.25) {
                const easedProgress = easeInOutCubic(Math.max(0, Math.min(1, (progress - 0.25) / 0.5)));

                if (section.classList.contains('title-section')) {
                    updateTitleSection(section, easedProgress);
                } else if (section.id === 'section1') {
                    updateSection1(section, easedProgress);
                } else if (section.id === 'section2') {
                    updateSection2(section, easedProgress);
                } else if (section.id === 'section3') {
                    updateSection3(section, easedProgress);
                } else if (section.id === 'gif-section') {
                    updateGifFrame(easedProgress);
                }
            }
        });
    }

    function updateTitleSection(section, easedProgress) {
        const logo = section.querySelector('.logo');
        const sparkle = section.querySelector('.sparkle');

        // Logo zoom effect
        const scale = 1 + Math.sin(easedProgress * Math.PI) * 0.1; // Subtle zoom in and out
        logo.style.transform = `scale(${scale})`;

        // Sparkle opacity effect
        const sparkleOpacity = Math.sin(easedProgress * Math.PI * 2) * 0.5 + 0.5; // Fades in and out twice
        sparkle.style.opacity = sparkleOpacity;
    }

    function updateSection1(section, easedProgress) {
        const background = section.querySelector('.background');
        const leftMountain = section.querySelector('.mountain.left');
        const rightMountain = section.querySelector('.mountain.right');
        const leftCloud = section.querySelector('.cloud.left');
        const rightCloud = section.querySelector('.cloud.right');
        const man = section.querySelector('.man');
        const title = section.querySelector('.title');

        background.style.transform = `scale(${1 + easedProgress * 0.2})`;
        leftMountain.style.transform = `translateX(${-easedProgress * 20}%)`;
        rightMountain.style.transform = `translateX(${easedProgress * 20}%)`;
        leftCloud.style.transform = `translateX(${-easedProgress * 100}%)`;
        rightCloud.style.transform = `translateX(${easedProgress * 100}%)`;
        man.style.transform = `translate(-50%, ${-easedProgress * 20}%) scale(${1 - easedProgress * 0.3})`;
        title.style.opacity = Math.max(0, 1 - Math.abs(easedProgress - 0.5) * 2);
    }

    function updateSection2(section, easedProgress) {
        const background = section.querySelector('.background');
        const treeContainer = section.querySelector('.tree-container');
        const man2 = section.querySelector('.man2');

        background.style.transform = `scale(${1 + easedProgress * 0.1})`;

        if (easedProgress < 0.3) {
            const enterProgress = easedProgress / 0.3;
            const xPosition = enterProgress * 120;
            treeContainer.style.transform = `translateX(${xPosition}%)`;
            man2.style.transform = 'rotate(0deg)';
        } else if (easedProgress < 0.4) {
            const leanProgress = (easedProgress - 0.3) / 0.1;
            const leanAngle = leanProgress * 15;
            treeContainer.style.transform = 'translateX(120%)';
            man2.style.transform = `rotate(${leanAngle}deg)`;
        } else {
            const exitProgress = (easedProgress - 0.4) / 0.6;
            const xPosition = 120 - exitProgress * 140;
            const scale = 1 + exitProgress * 0.5;
            treeContainer.style.transform = `translateX(${xPosition}%) scale(${scale})`;
            man2.style.transform = 'rotate(15deg)';
        }
    }

    function updateSection3(section, easedProgress) {
        const gem = section.querySelector('.gem');
        if (easedProgress < 0.2) {
            const spiralInProgress = easedProgress / 0.2;
            const xPosition = (1 - spiralInProgress) * 100;
            const yPosition = spiralInProgress * 50;
            const rotation = spiralInProgress * 720;
            gem.style.transform = `translate(${xPosition}%, ${yPosition}%) rotate(${rotation}deg)`;
            gem.style.opacity = spiralInProgress;
        } else if (easedProgress < 0.8) {
            gem.style.transform = `translate(0%, 50%) rotate(720deg)`;
            gem.style.opacity = 1;
        } else {
            const spiralOutProgress = (easedProgress - 0.8) / 0.2;
            const xPosition = spiralOutProgress * 100;
            const yPosition = (1 - spiralOutProgress) * 50;
            const rotation = 720 + spiralOutProgress * 720;
            gem.style.transform = `translate(${xPosition}%, ${yPosition}%) rotate(${rotation}deg)`;
            gem.style.opacity = 1 - spiralOutProgress;
        }
    }

    function updateGifFrame(progress) {
        if (!gifImage || !frameHeight) return;

        let currentFrame = Math.floor(progress * (TOTAL_FRAMES - 1));
        currentFrame = Math.max(0, Math.min(currentFrame, TOTAL_FRAMES - 1));

        if (currentFrame !== lastFrame) {
            const frameOffset = currentFrame * frameHeight;
            gifImage.style.transform = `translateY(-${frameOffset}px)`;
            lastFrame = currentFrame;
        }
    }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function smoothScroll() {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;

        const currentSection = [...sections].findIndex(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= window.innerHeight * 0.25 && rect.bottom >= window.innerHeight * 0.75;
        });

        if (sections[currentSection] && sections[currentSection].classList.contains('parallax-container')) {
            targetScrollY += delta * PARALLAX_SCROLL_SPEED;
        } else {
            targetScrollY += delta * NORMAL_SCROLL_SPEED;
        }

        lastScrollY = currentScrollY;

        window.scrollTo(0, lastScrollY + (targetScrollY - lastScrollY) * SCROLL_EASING);

        updateParallax();
        requestAnimationFrame(smoothScroll);
    }

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
    }, { passive: true });

    initImages();
    initGif();
    smoothScroll();
});
