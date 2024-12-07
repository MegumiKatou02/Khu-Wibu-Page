function createSakura() {
    const sakuraContainer = document.querySelector('.sakura-container');
    if (!sakuraContainer) return;
    
    const sakura = document.createElement('div');
    const size = Math.random() * 10 + 5;
    const startPositionLeft = Math.random() * window.innerWidth;
    const animationDuration = Math.random() * 5 + 5;

    sakura.classList.add('sakura');
    sakura.style.width = `${size}px`;
    sakura.style.height = `${size}px`;
    sakura.style.left = `${startPositionLeft}px`;
    sakura.style.animationDuration = `${animationDuration}s`;

    sakuraContainer.appendChild(sakura);

    setTimeout(() => {
        sakura.remove();
    }, animationDuration * 1000);
}

setInterval(createSakura, 300);