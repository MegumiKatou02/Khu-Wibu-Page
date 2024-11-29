document.querySelectorAll('.navigation a').forEach(anchor => {
    anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Xử lý đặc biệt cho trang chủ
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        // Xử lý cho các link khác
        if (!targetId) return;
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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

// Thêm code xử lý theme toggle
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

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement;
    audio.volume = 0.2;
    const musicToggle = document.querySelector('.music-toggle');
    const audioControls = document.querySelector('.audio-controls');
    const progressBar = document.querySelector('.progress-bar') as HTMLElement;
    const progressContainer = document.querySelector('.progress-container');
    const currentTime = document.querySelector('.current-time');
    const duration = document.querySelector('.duration');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    let hasInteracted = false;

    // Format time function
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Update progress bar
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

    let isControlsVisible = false;
    let isMusicPlaying = false;

    // Xử lý nút hiển thị/ẩn controls
    musicToggle?.addEventListener('click', () => {
        if (!isControlsVisible) {
            // Lần click đầu tiên
            audio.play();
            isMusicPlaying = true;
            isControlsVisible = true;
            audioControls?.classList.add('show');
        } else {
            // Những lần click sau
            isControlsVisible = false;
            audioControls?.classList.remove('show');
            // Không dừng nhạc khi ẩn controls
        }
    });

    // Thêm nút play/pause riêng
    playPauseBtn?.addEventListener('click', () => {
        if (isMusicPlaying) {
            audio.pause();
            playPauseBtn.classList.remove('playing');
            document.querySelector('.music-icon')?.classList.remove('rotating');
        } else {
            audio.play();
            playPauseBtn.classList.add('playing');
            document.querySelector('.music-icon')?.classList.add('rotating');
        }
    });

    // Hàm bật nhạc lần đầu
    const startMusicOnFirstInteraction = () => {
        if (!hasInteracted) {
            audio.play();
            hasInteracted = true;
            playPauseBtn?.classList.add('playing');
            // Xóa event listener sau lần click đầu tiên
            document.removeEventListener('click', startMusicOnFirstInteraction);
        }
    };

    // Lắng nghe click ở bất kỳ đâu trên trang
    document.addEventListener('click', startMusicOnFirstInteraction);
});

function initSlider() {
    const slides = document.querySelectorAll('.slide') as NodeListOf<HTMLElement>;
    const slider = document.querySelector('.slider') as HTMLElement;
    let currentSlide = 0;
    const slideInterval = 6000;

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length / 2) {
            slider.style.transform = `translateX(-${currentSlide * 12.5}%)`; // Tiếp tục lướt
            
            // Đợi animation kết thúc rồi mới reset
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

    // Tự động chuyển slide
    setInterval(nextSlide, slideInterval);
}

initSlider();

function showNotification(message: string) {
    const notification = document.getElementById('searchNotification');
    if (!notification) return;
    const messageElement = notification.querySelector('.toast-message');
    if (!messageElement) return;
    
    // Cập nhật nội dung
    messageElement.textContent = message;
    
    // Hiển thị notification
    notification.classList.add('show');
    
    // Tự động ẩn sau 3 giây
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
        
        // Kiểm tra từ khóa tìm kiếm
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
        
        // Không tìm thấy kết quả
        showNotification('Không tìm thấy nội dung bạn cần tìm!');
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
});