// Smooth scroll y navegación activa
document.addEventListener('DOMContentLoaded', function() {
    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Filtro de certificados
    const filterButtons = document.querySelectorAll('.filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            certCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Función para mostrar notificaciones (si la usas)
    window.showNotification = function(message, type) {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '1rem 2rem';
        notification.style.background = type === 'success' ? '#10b981' : '#ef4444';
        notification.style.color = 'white';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        notification.style.zIndex = '9999';
        notification.style.animation = 'slideIn 0.3s ease';
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };

    // Animación de barras de progreso
    const skillsSection = document.querySelector('#habilidades');
    if (skillsSection) {
        const observerOptions = { threshold: 0.5 };
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = document.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        skillsObserver.observe(skillsSection);
    }

    // Efecto hover en certificados
    certCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Actualizar año en footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }

    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// ========== MODAL UNIFICADO PARA IMÁGENES ==========
function openModal(imgElement) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalCaption');
    
    if (!modal || !modalImg) return;
    
    modal.style.display = 'block';
    modalImg.src = imgElement.src;
    
    // Buscar un título cercano para el caption
    let title = '';
    const container = imgElement.closest('.cert-card, .distinction-item, .poster-item, .cert-image');
    if (container) {
        const h3 = container.querySelector('h3');
        if (h3) title = h3.innerText;
    }
    captionText.innerText = title;
}

function initModal() {
    const modal = document.getElementById('certModal');
    if (!modal) return;
    
    const closeBtn = document.querySelector('.modal-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.style.display = 'none');
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
    
    // Hacer que las imágenes de certificados abran modal (por si no tienen onclick)
    document.querySelectorAll('.cert-image').forEach(container => {
        container.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) openModal(img);
        });
    });
}

// Inicializar modal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initModal();
});

// Añadir estilos para animaciones de notificación (si no existen)
if (!document.querySelector('#dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'dynamic-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}