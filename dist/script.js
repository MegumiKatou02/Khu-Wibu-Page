"use strict";
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        var _a;
        if ((_a = e.currentTarget.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.startsWith('#')) {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo(0, 0);
            }
            else {
                if (targetId) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        }
    });
});
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navigation');
    if (window.scrollY > 50) {
        nav === null || nav === void 0 ? void 0 : nav.classList.add('scrolled');
    }
    else {
        nav === null || nav === void 0 ? void 0 : nav.classList.remove('scrolled');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle === null || themeToggle === void 0 ? void 0 : themeToggle.querySelector('i');
    themeToggle === null || themeToggle === void 0 ? void 0 : themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            themeIcon === null || themeIcon === void 0 ? void 0 : themeIcon.classList.remove('fa-moon');
            themeIcon === null || themeIcon === void 0 ? void 0 : themeIcon.classList.add('fa-sun');
        }
        else {
            themeIcon === null || themeIcon === void 0 ? void 0 : themeIcon.classList.remove('fa-sun');
            themeIcon === null || themeIcon === void 0 ? void 0 : themeIcon.classList.add('fa-moon');
        }
    });
});
let isControlsVisible = false;
let isMusicPlaying = false;
document.addEventListener('click', (e) => {
    const musicToggle = document.querySelector('.music-toggle');
    const audioControls = document.querySelector('.audio-controls');
    const target = e.target;
    if (!(musicToggle === null || musicToggle === void 0 ? void 0 : musicToggle.contains(target)) && !(audioControls === null || audioControls === void 0 ? void 0 : audioControls.contains(target))) {
        isControlsVisible = false;
        audioControls === null || audioControls === void 0 ? void 0 : audioControls.classList.remove('show');
    }
});
document.addEventListener('visibilitychange', () => {
    const audio = document.getElementById('bgMusic');
    if (!audio)
        return;
    if (document.hidden) {
        // isControlsVisible = false; *need check
        audio.pause();
    }
    else {
        if (isMusicPlaying) {
            audio.play();
        }
        // isControlsVisible = true; *need check
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgMusic');
    if (!audio)
        return;
    audio.volume = 0.05;
    const musicToggle = document.querySelector('.music-toggle');
    const audioControls = document.querySelector('.audio-controls');
    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    const currentTime = document.querySelector('.current-time');
    const duration = document.querySelector('.duration');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    let hasInteracted = false;
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };
    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percent}%`;
        if (currentTime)
            currentTime.textContent = formatTime(audio.currentTime);
        if (duration)
            duration.textContent = formatTime(audio.duration);
    });
    // Click on progress bar
    progressContainer === null || progressContainer === void 0 ? void 0 : progressContainer.addEventListener('click', (e) => {
        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    });
    musicToggle === null || musicToggle === void 0 ? void 0 : musicToggle.addEventListener('click', () => {
        if (!isControlsVisible) {
            // audio.play();
            // isMusicPlaying = true; 
            isControlsVisible = true;
            audioControls === null || audioControls === void 0 ? void 0 : audioControls.classList.add('show');
        }
        else {
            isControlsVisible = false;
            audioControls === null || audioControls === void 0 ? void 0 : audioControls.classList.remove('show');
        }
    });
    playPauseBtn === null || playPauseBtn === void 0 ? void 0 : playPauseBtn.addEventListener('click', () => {
        var _a, _b;
        console.log('hello');
        if (isMusicPlaying) {
            isMusicPlaying = false;
            audio.pause();
            playPauseBtn.classList.remove('playing');
            (_a = document.querySelector('.music-icon')) === null || _a === void 0 ? void 0 : _a.classList.remove('rotating');
        }
        else {
            isMusicPlaying = true;
            audio.play();
            playPauseBtn.classList.add('playing');
            (_b = document.querySelector('.music-icon')) === null || _b === void 0 ? void 0 : _b.classList.add('rotating');
        }
    });
    const startMusicOnFirstInteraction = () => {
        if (!hasInteracted) {
            isMusicPlaying = true;
            audio.play();
            hasInteracted = true;
            playPauseBtn === null || playPauseBtn === void 0 ? void 0 : playPauseBtn.classList.add('playing');
            document.removeEventListener('click', startMusicOnFirstInteraction);
        }
    };
    document.addEventListener('click', startMusicOnFirstInteraction);
});
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slider');
    if (!slides.length || !slider)
        return;
    let currentSlide = 0;
    const slideInterval = 6000;
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length / 2) {
            slider.style.transform = `translateX(-${currentSlide * 12.5}%)`; // Tiếp tục lướt
            setTimeout(() => {
                slider.style.transition = 'none';
                currentSlide = 0;
                slider.style.transform = `translateX(0)`;
                setTimeout(() => {
                    slider.style.transition = 'transform 1s ease-in-out';
                }, 50);
            }, 1000);
        }
        else {
            slider.style.transform = `translateX(-${currentSlide * 12.5}%)`;
        }
    }
    setInterval(nextSlide, slideInterval);
}
initSlider();
function showNotification(message) {
    const notification = document.getElementById('searchNotification');
    if (!notification)
        return;
    const messageElement = notification.querySelector('.toast-message');
    if (!messageElement)
        return;
    messageElement.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const searchableContent = {
        'bot': '#bots',
        'bot server': '#bots',
        'thông tin': '#info',
        'server': '#info',
        'đóng góp': '#contribute',
        'người phát triển': '#contribute',
        'developer': '#contribute'
    };
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (!searchTerm) {
            showNotification('Vui lòng nhập từ khóa tìm kiếm!');
            return;
        }
        for (const [key, value] of Object.entries(searchableContent)) {
            if (key.includes(searchTerm) || searchTerm.includes(key)) {
                const element = document.querySelector(value);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    element.classList.add('highlight');
                    setTimeout(() => {
                        element.classList.remove('highlight');
                    }, 2000);
                }
                searchInput.value = '';
                return;
            }
        }
        showNotification('Không tìm thấy nội dung bạn cần tìm!');
    }
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
});
document.addEventListener('DOMContentLoaded', () => {
    var _a;
    // Mặc định hiển thị tab Event
    (_a = document.getElementById('event')) === null || _a === void 0 ? void 0 : _a.classList.add('active');
    // Xử lý chuyển tab
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            var _a, _b;
            e.preventDefault();
            const targetId = (_a = e.currentTarget.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.substring(1);
            // Ẩn tất cả các section
            document.querySelectorAll('.section-content').forEach(section => {
                section.classList.remove('active');
            });
            // Hiển thị section được chọn
            if (targetId) {
                (_b = document.getElementById(targetId)) === null || _b === void 0 ? void 0 : _b.classList.add('active');
            }
        });
    });
});
