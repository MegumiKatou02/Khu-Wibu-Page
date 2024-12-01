document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal') as HTMLElement;
    const modalImage = document.getElementById('modalImage') as HTMLImageElement;
    const modalTitle = document.getElementById('modalTitle') as HTMLElement;
    const modalMeta = document.getElementById('modalMeta') as HTMLElement;
    const modalDescription = document.getElementById('modalDescription') as HTMLElement;
    const closeModal = document.querySelector('.close-modal') as HTMLElement;

    document.querySelectorAll('.moment-image').forEach(image => {
        image.addEventListener('click', (e) => {
            const card = (e.currentTarget as HTMLElement).closest('.moment-card');
            if (!card) return;

            const img = card.querySelector('img') as HTMLImageElement;
            const title = card.querySelector('.moment-title')?.textContent;
            const meta = card.querySelector('.moment-meta')?.innerHTML;
            const description = card.querySelector('.moment-description')?.textContent;

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

    document.getElementById('event')?.classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e: Event) => {
            e.preventDefault();
            const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href')?.substring(1);
            
            document.querySelectorAll('.section-content').forEach(section => {
                section.classList.remove('active');
            });
            
            if (targetId) {
                document.getElementById(targetId)?.classList.add('active');
            }
        });
    });
});