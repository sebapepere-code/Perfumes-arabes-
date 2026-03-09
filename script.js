document.addEventListener("DOMContentLoaded", () => {

    // 0. NUEVO SISTEMA DE VIDEO (ESTABILIDAD TOTAL)
    const heroBg = document.getElementById('hero-background');
    if (heroBg) {
        const isMobile = window.innerWidth <= 768;
        const videoSrc = isMobile ? 'assets/video-mobile.mp4' : '6a5d34a3-5f54-4dd5-affd-74365827fc5a.mp4';

        // Creamos el elemento de video dinámicamente para asegurar limpieza
        const video = document.createElement('video');
        video.id = 'hero-video';
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.autoplay = true;
        video.setAttribute('preload', 'auto');
        video.className = 'hero-video-fresh';

        // Agregamos el source
        const source = document.createElement('source');
        source.src = videoSrc;
        source.type = 'video/mp4';
        video.appendChild(source);

        // Limpiamos el contenedor y agregamos el video
        heroBg.innerHTML = '';
        heroBg.appendChild(video);

        const overlay = document.createElement('div');
        overlay.className = 'hero-video-overlay';
        heroBg.appendChild(overlay);

        const tryPlay = () => {
            video.play().catch(() => {
                // Fallback para ahorro de batería: reproducir al interactuar
                const runOnInteraction = () => {
                    video.play();
                    document.removeEventListener('click', runOnInteraction);
                    document.removeEventListener('touchstart', runOnInteraction);
                    document.removeEventListener('scroll', runOnInteraction);
                };
                document.addEventListener('click', runOnInteraction);
                document.addEventListener('touchstart', runOnInteraction);
                document.addEventListener('scroll', runOnInteraction);
            });
        };

        // Escuchar carga y arrancar
        video.addEventListener('loadeddata', tryPlay);
        tryPlay();
    }

    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.padding = '1rem 5%';
        } else {
            navbar.style.background = 'rgba(3, 3, 3, 0.8)';
            navbar.style.padding = '1.5rem 5%';
        }
    });

    // 3. GSAP ScrollTrigger Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Parallax
    gsap.to(".hero-content", {
        y: "30%",
        opacity: 0,
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Fade In Animations for Sections
    const fadeElems = document.querySelectorAll('.category-card, .alquimia-content, .faq-item, .contact-container');
    fadeElems.forEach(elem => {
        gsap.from(elem, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // 4. Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('open');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('open');
            });
        });
    }

    // Carousel Logic
    const initCarousel = () => {
        const track = document.querySelector('.carousel-track');
        if (!track) return;

        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-btn.next');
        const prevButton = document.querySelector('.carousel-btn.prev');

        let currentIndex = 0;

        const updateCarousel = () => {
            const slideWidth = slides[0].getBoundingClientRect().width;
            track.style.transform = `translateX(-${currentIndex * (slideWidth + 30)}px)`;

            // Opacity and Scale Effect
            slides.forEach((slide, index) => {
                if (index === currentIndex) {
                    slide.style.opacity = '1';
                    slide.style.transform = 'scale(1)';
                } else {
                    slide.style.opacity = '0.5';
                    slide.style.transform = 'scale(0.9)';
                }
            });
        };

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel();
            });
        }

        // Auto-play
        let autoPlayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }, 5000);

        track.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        track.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            }, 5000);
        });

        // Initial setup
        updateCarousel();
    };

    initCarousel();

    // Initialize VanillaTilt for cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }
});
