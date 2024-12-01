if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e: Event) => {
        if ((e.currentTarget as HTMLAnchorElement).getAttribute('href')?.startsWith('#')) {
            e.preventDefault();
            const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
            if (targetId === '#') {
                window.scrollTo(0, 0);
            } else {
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
        nav?.classList.add('scrolled');
    } else {
        nav?.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', () => {

    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');

    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon?.classList.remove('fa-moon');
            themeIcon?.classList.add('fa-sun');
        } else {
            themeIcon?.classList.remove('fa-sun');
            themeIcon?.classList.add('fa-moon');
        }
    });
});

let isControlsVisible = false;
let isMusicPlaying = false;

document.addEventListener('click', (e) => {
    const musicToggle = document.querySelector('.music-toggle');
    const audioControls = document.querySelector('.audio-controls');
    const target = e.target as HTMLElement;

    if (!musicToggle?.contains(target) && !audioControls?.contains(target)) {
        isControlsVisible = false;
        audioControls?.classList.remove('show');
    }
});

document.addEventListener('visibilitychange', () => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement;

    if (!audio) return;

    if (document.hidden) {
        // isControlsVisible = false; *need check
        audio.pause();
    } else {
        if(isMusicPlaying) {
            audio.play();
        }        
        // isControlsVisible = true; *need check
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement;
    if (!audio) return;
    
    audio.volume = 0.05;
    const musicToggle = document.querySelector('.music-toggle');
    const audioControls = document.querySelector('.audio-controls');
    const progressBar = document.querySelector('.progress-bar') as HTMLElement;
    const progressContainer = document.querySelector('.progress-container');
    const currentTime = document.querySelector('.current-time');
    const duration = document.querySelector('.duration');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    let hasInteracted = false;

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percent}%`;
        if (currentTime) currentTime.textContent = formatTime(audio.currentTime);
        if (duration) duration.textContent = formatTime(audio.duration);
    });

    // Click on progress bar
    (progressContainer as HTMLElement)?.addEventListener('click', (e: MouseEvent) => {
        const container = e.currentTarget as HTMLElement;
        const rect = container.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    });

    musicToggle?.addEventListener('click', () => {
        if (!isControlsVisible) {
            // audio.play();
            // isMusicPlaying = true; 
            isControlsVisible = true;
            audioControls?.classList.add('show');
        } else {
            isControlsVisible = false;
            audioControls?.classList.remove('show');
        }
    });

    playPauseBtn?.addEventListener('click', () => {
        console.log('hello');
        if (isMusicPlaying) {
            isMusicPlaying = false; 
            audio.pause();
            playPauseBtn.classList.remove('playing');
            document.querySelector('.music-icon')?.classList.remove('rotating');
        } else {
            isMusicPlaying = true; 
            audio.play();
            playPauseBtn.classList.add('playing');
            document.querySelector('.music-icon')?.classList.add('rotating');
        }
    });

    const startMusicOnFirstInteraction = () => {
        if (!hasInteracted) {
            isMusicPlaying = true;
            audio.play();
            hasInteracted = true;
            playPauseBtn?.classList.add('playing');
            document.removeEventListener('click', startMusicOnFirstInteraction);
        }
    };

    document.addEventListener('click', startMusicOnFirstInteraction);
});

function initSlider() {
    const slides = document.querySelectorAll('.slide') as NodeListOf<HTMLElement>;
    const slider = document.querySelector('.slider') as HTMLElement;
    if (!slides.length || !slider) return;
    
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
        } else {
            slider.style.transform = `translateX(-${currentSlide * 12.5}%)`;
        }
    }

    setInterval(nextSlide, slideInterval);
}

initSlider();

function showNotification(message: string) {
    const notification = document.getElementById('searchNotification');
    if (!notification) return;
    const messageElement = notification.querySelector('.toast-message');
    if (!messageElement) return;
    
    messageElement.textContent = message;
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function initializeSearch() {
    const searchInput = document.querySelector('.search-box input') as HTMLInputElement;
    const searchButton = document.querySelector('.search-box button') as HTMLButtonElement;

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
    // Mặc định hiển thị tab Event
    document.getElementById('event')?.classList.add('active');

    // Xử lý chuyển tab
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href')?.substring(1);
            
            // Ẩn tất cả các section
            document.querySelectorAll('.section-content').forEach(section => {
                section.classList.remove('active');
            });
            
            // Hiển thị section được chọn
            if (targetId) {
                document.getElementById(targetId)?.classList.add('active');
            }
        });
    });
});