// Smooth scroll y navegación activa
document.addEventListener('DOMContentLoaded', function() {
    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
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

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Contador animado
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerText = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Iniciar contadores cuando sean visibles
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const certCount = document.getElementById('cert-count');
                const hoursCount = document.getElementById('hours-count');
                const projectsCount = document.getElementById('projects-count');
                
                if (certCount && certCount.innerText === '0') {
                    animateCounter(certCount, 0, 15, 2000);
                    animateCounter(hoursCount, 0, 500, 2000);
                    animateCounter(projectsCount, 0, 25, 2000);
                }
            }
        });
    }, observerOptions);

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }

    // Filtro de certificados
    const filterButtons = document.querySelectorAll('.filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Filtrar tarjetas
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


    // Validación y envío del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validación básica
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showNotification('Por favor, completa todos los campos', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un email válido', 'error');
                return;
            }

            // Simular envío
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
                showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            }, 2000);
        });
    }

    // Función para validar email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Función para mostrar notificaciones
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Estilos para la notificación
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

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Animación de barras de progreso
    const skillsSection = document.querySelector('#habilidades');
    if (skillsSection) {
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
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Añadir estilos para animaciones de notificación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Función global para abrir modal
function openModal(imgElement) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalCaption');
    
    if (!modal || !modalImg) return;
    
    modal.style.display = 'block';
    modalImg.src = imgElement.src;
    
    // Buscar un título cercano para el caption (opcional)
    const container = imgElement.closest('.distinction-item') || imgElement.closest('.cert-card');
    if (container) {
        const title = container.querySelector('h3')?.innerText || 'Distinción';
        captionText.innerText = title;
    } else {
        captionText.innerText = '';
    }
}

// Inicializar modal (ya lo tienes, pero ajustamos)
function initModal() {
    const modal = document.getElementById('certModal');
    if (!modal) return;
    
    const closeBtn = document.querySelector('.modal-close');
    const modalImg = document.getElementById('modalImage');
    
    // Cerrar con X
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Cerrar haciendo clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Llamar a initModal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initModal();
    
    // También asignamos el evento a .cert-image (para compatibilidad)
    document.querySelectorAll('.cert-image').forEach(container => {
        container.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) openModal(img);
        });
    });
    
    // Las imágenes de distinciones ya tienen onclick="openModal(this)" en HTML
});

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initImageViewer();
});