document.addEventListener('DOMContentLoaded', () => {
    const sections = [
        {
            background: document.getElementById('background1'),
            title: document.getElementById('title1'),
            man: document.getElementById('man1'),
            mountainLeft: document.getElementById('mountainLeft1'),
            mountainRight: document.getElementById('mountainRight1'),
            cloudLeft: document.getElementById('cloudLeft1'),
            cloudRight: document.getElementById('cloudRight1')
        },
        {
            title: document.getElementById('title2'),
            paragraph: document.getElementById('paragraph2'),
            image: document.getElementById('image2')
        },
        {
            background: document.getElementById('background3'),
            tree: document.getElementById('tree'),
            man: document.getElementById('man3')
        },
        {
            background: document.getElementById('background4'),
            title: document.getElementById('title4'),
            man: document.getElementById('man4'),
            mountainLeft: document.getElementById('mountainLeft4'),
            mountainRight: document.getElementById('mountainRight4'),
            cloudLeft: document.getElementById('cloudLeft4'),
            cloudRight: document.getElementById('cloudRight4')
        }
    ];

    let ticking = false;
    let lastScrollY = 0;

    const animate = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        sections.forEach((section, index) => {
            const sectionTop = index * windowHeight;
            const sectionBottom = (index + 1) * windowHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                const progress = (scrollY - sectionTop) / windowHeight;
                
                switch(index) {
                    case 0:
                    case 3:
                        animateParallaxSection(section, progress, index === 3);
                        break;
                    case 1:
                        animateContentSection(section, progress);
                        break;
                    case 2:
                        animatePeekSection(section, progress);
                        break;
                }
            }
        });

        ticking = false;
    };

    const animateParallaxSection = (section, progress, reverse) => {
        const direction = reverse ? -1 : 1;
        section.title.style.opacity = Math.max(0, 1 - progress * 2);
        section.title.style.transform = `translateY(${progress * 50 * direction}px)`;
        
        const manScale = Math.max(0.5, 1 - progress * 0.5);
        const manTranslateY = progress * -50 * direction;
        section.man.style.transform = `translate(-50%, ${manTranslateY}px) scale(${manScale})`;

        section.cloudLeft.style.transform = `translateX(${-progress * 100 * direction}px)`;
        section.cloudRight.style.transform = `translateX(${progress * 100 * direction}px)`;

        section.mountainLeft.style.transform = `translateX(${-progress * 50 * direction}px)`;
        section.mountainRight.style.transform = `translateX(${progress * 50 * direction}px)`;

        const backgroundScale = 1 + progress * 0.1;
        section.background.style.transform = `scale(${backgroundScale})`;
    };

    const animateContentSection = (section, progress) => {
        const opacity = Math.min(1, progress * 2);
        const translateY = Math.max(0, 20 - progress * 40);
        
        section.title.style.opacity = opacity;
        section.paragraph.style.opacity = opacity;
        section.image.style.opacity = opacity;
        
        section.title.style.transform = `translateY(${translateY}px)`;
        section.paragraph.style.transform = `translateY(${translateY}px)`;
        section.image.style.transform = `translateY(${translateY}px)`;
    };

    const animatePeekSection = (section, progress) => {
        const manTranslateX = Math.min(50, progress * 100);
        section.man.style.transform = `translateX(${manTranslateX}%)`;

        const treeTranslateX = Math.min(0, 20 - progress * 40);
        section.tree.style.transform = `translateX(${treeTranslateX}%)`;

        const backgroundScale = 1 + progress * 0.1;
        section.background.style.transform = `scale(${backgroundScale})`;
    };

    const requestTick = () => {
        if (!ticking) {
            requestAnimationFrame(animate);
        }
        ticking = true;
    };

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        requestTick();
    }, { passive: true });

    // Initial animation
    animate();
});
