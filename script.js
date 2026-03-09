document.addEventListener("DOMContentLoaded", () => {

    // Disable VanillaTilt on mobile immediately to prevent 3D mix-blend-mode bug
    if (window.innerWidth <= 768) {
        const tiltCards = document.querySelectorAll('[data-tilt]');
        tiltCards.forEach(card => {
            if (card.vanillaTilt) {
                card.vanillaTilt.destroy();
            }
            card.removeAttribute('data-tilt');
            card.removeAttribute('data-tilt-glare');
            card.removeAttribute('data-tilt-max-glare');
        });
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
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Diferenciales Fade In
    gsap.from(".diferenciales-grid .tilt-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".diferenciales-section",
            start: "top 80%",
        }
    });

    // 4. La Alquimia (Scroll Timeline)
    const alchemyTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".alquimia-container",
            start: "top 50%",
            end: "bottom 80%",
            scrub: 1 // smooth scrubbing
        }
    });

    // Animate the golden drop falling down the thread
    alchemyTl.to(".golden-drop", {
        top: "100%",
        opacity: 1,
        ease: "none"
    });

    // Individual trigger for each block to fade in and hover slightly
    const blocks = document.querySelectorAll('.ingredient-block');
    blocks.forEach((block, i) => {
        gsap.to(block, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: block,
                start: "top 75%", // Triggers when the top of the block hits 75% depth of viewport
                toggleActions: "play none none reverse"
            }
        });
    });

    // 5. Carousel Horizontal Scroll Snap & Navigation
    const slider = document.querySelector('.carousel-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let isDown = false;
    let startX;
    let scrollLeft;

    // Drag to scroll logic
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });

    // Button Navigation Logic
    if (prevBtn && nextBtn) {
        // Calculate the width to scroll. Typically one card width + gap.
        // Assuming 320px card + 32px gap ~= 352px
        const scrollAmount = 352;

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

});
