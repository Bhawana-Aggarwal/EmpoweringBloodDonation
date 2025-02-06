console.log("animation.js loaded");
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);
    
    // Header Animation
    gsap.from(".header", {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".header",
            start: "top top",
            toggleActions: "play none none none"
        }
    });

    // Home Section Animations
    gsap.from(".home-section h1", {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".home-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".home-section p", {
        duration: 1.5,
        x: -100,
        opacity: 0,
        ease: "power3.out",
        delay: 0.5,
        scrollTrigger: {
            trigger: ".home-section p",
            start: "top 75%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".home-benefits li", {
        duration: 1,
        opacity: 0,
        y: 30,
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".home-benefits",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Button Pulse Effect
    gsap.to("#submit-button-hero-newsletter", {
        scale: 1.1,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });

    // Scroll-triggered Animations
    gsap.utils.toArray(".feature-box").forEach((box) => {
        gsap.from(box, {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: box,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    gsap.from(".why-donate .section-title", {
        duration: 1,
        scale: 0.5,
        opacity: 0,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: ".why-donate .section-title",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Organizing Blood Donation Camps Animation
    gsap.from(".showcase-wrapper", {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".showcase-wrapper",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    gsap.utils.toArray(".showcase-wrapper .gallery-item").forEach((item, i) => {
        gsap.from(item, {
            duration: 1,
            scale: 0.8,
            opacity: 0,
            delay: i * 0.3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });

    // Footer Animation
    gsap.from(".footer", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".footer",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });
    // Animate Our Donors Section
    gsap.from("#blog .section-title", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#blog .section-title",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.utils.toArray("#blog .blog-item").forEach((item, i) => {
        gsap.from(item, {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: i * 0.3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // Animate The NGO Behind Us Section
    gsap.from("#team .section-title", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#team .section-title",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.utils.toArray("#team .team-item").forEach((team, i) => {
        gsap.from(team, {
            duration: 1,
            x: i % 2 === 0 ? -50 : 50,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: team,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // Animate Be a Hero, Donate Blood, Save Lives Section
    gsap.from(".margin-bottom-30 h3", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".margin-bottom-30 h3",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".margin-bottom-30 p", {
        duration: 1.2,
        x: -50,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".margin-bottom-30 p",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    gsap.utils.toArray(".margin-bottom-30 .benefits li").forEach((li, i) => {
        gsap.from(li, {
            duration: 1,
            opacity: 0,
            x: 50,
            delay: i * 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: li,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });

    // Animate FAQ's Related Blood Donation Section
    gsap.from(".small-col-inside h3", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".small-col-inside h3",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".small-col-inside p", {
        duration: 1.2,
        x: -50,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".small-col-inside p",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    gsap.utils.toArray(".accordion .card").forEach((card, i) => {
        gsap.from(card, {
            duration: 1,
            opacity: 0,
            x: 50,
            delay: i * 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });

    gsap.to(".download-image", {
        rotation: 360,
        duration: 3,
        repeat: -1,
        ease: "linear"
    });

    gsap.from(".download-image-content h2, .download-image-content h6", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".download-image-content",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.from(".download-image-content ul li", {
        x: -50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".download-image-content ul",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });


    gsap.utils.toArray(".main-services").forEach((service, i) => {
        gsap.from(service, {
            opacity: 0,
            scale: 0.8,
            delay: i * 0.2,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: service,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });

    gsap.from("#typesofblood img", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: "#typesofblood img",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    gsap.from("#newsletter-text", {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#newsletter-text",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
    // Animate "Get in Touch" (Slides in from the right with bounce effect)
    gsap.from(".footer .col-md-4:nth-child(1)", {
        x: 150,
        opacity: 0,
        duration: 1.5,
        ease: "bounce.out",
        scrollTrigger: {
            trigger: ".footer",
            start: "top 95%",
            toggleActions: "play none none none"
        }
    });

    // Animate "Social Media" (Pops up from the bottom once, then stops)
    gsap.from(".footer .col-md-4:nth-child(2)", {
        y: 150,
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
            trigger: ".footer",
            start: "top 95%",
            toggleActions: "play none none none" // Ensures the animation runs only once
        }
    });

    // Animate "Useful Links" (Slides in from the left with rotation)
    gsap.from(".footer .col-md-4:nth-child(3)", {
        x: -150,
        opacity: 0,
        rotate: -10,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".footer",
            start: "top 95%",
            toggleActions: "play none none none"
        }
    });

    // Interactive hover effect for social media icons
    gsap.utils.toArray(".footer_social li a").forEach((icon) => {
        gsap.from(icon, {
            opacity: 0,
            scale: 0.5,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: icon,
                start: "top 95%",
                toggleActions: "play none none none"
            }
        });

        icon.addEventListener("mouseenter", () => {
            gsap.to(icon, { scale: 1.3, duration: 0.3, ease: "elastic.out(1, 0.5)" });
        });

        icon.addEventListener("mouseleave", () => {
            gsap.to(icon, { scale: 1, duration: 0.3, ease: "power1.inOut" });
        });
    });
    
    
});