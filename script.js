document.addEventListener('DOMContentLoaded', () => {
    const background = document.getElementById('background');
    const title = document.getElementById('title');
    const man = document.getElementById('man');
    const cloudLeft = document.getElementById('cloudLeft');
    const cloudRight = document.getElementById('cloudRight');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;

        // Title fade out
        title.style.opacity = Math.max(0, 1 - scrollPosition / 300);

        // Man floating up and getting smaller
        const manScale = Math.max(0.5, 1 - scrollPosition / 1000);
        const manTranslateY = -scrollPosition * 0.5;
        man.style.transform = `translateX(-50%) translateY(${manTranslateY}px) scale(${manScale})`;

        // Clouds moving
        cloudLeft.style.transform = `translateX(${-scrollPosition * 0.2}px)`;
        cloudRight.style.transform = `translateX(${scrollPosition * 0.2}px)`;

        // Background zooming out
        const backgroundScale = Math.max(1, 1 + scrollPosition / 1000);
        background.style.transform = `scale(${backgroundScale})`;
    });
});
