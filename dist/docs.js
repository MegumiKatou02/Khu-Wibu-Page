"use strict";
document.addEventListener('DOMContentLoaded', () => {
    var _a;
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalMeta = document.getElementById('modalMeta');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.querySelector('.close-modal');
    document.querySelectorAll('.moment-image').forEach(image => {
        image.addEventListener('click', (e) => {
            var _a, _b, _c;
            const card = e.currentTarget.closest('.moment-card');
            if (!card)
                return;
            const img = card.querySelector('img');
            const title = (_a = card.querySelector('.moment-title')) === null || _a === void 0 ? void 0 : _a.textContent;
            const meta = (_b = card.querySelector('.moment-meta')) === null || _b === void 0 ? void 0 : _b.innerHTML;
            const description = (_c = card.querySelector('.moment-description')) === null || _c === void 0 ? void 0 : _c.textContent;
            modalImage.src = img.src;
            modalTitle.textContent = title || '';
            modalMeta.innerHTML = meta || '';
            modalDescription.textContent = description || '';
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    (_a = document.getElementById('event')) === null || _a === void 0 ? void 0 : _a.classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            var _a, _b;
            e.preventDefault();
            const targetId = (_a = e.currentTarget.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.substring(1);
            document.querySelectorAll('.section-content').forEach(section => {
                section.classList.remove('active');
            });
            if (targetId) {
                (_b = document.getElementById(targetId)) === null || _b === void 0 ? void 0 : _b.classList.add('active');
            }
        });
    });
});
