// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Ensure viewport is properly set for mobile
    function updateViewportMeta() {
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
        }
    }
    
    // Call immediately and on resize
    updateViewportMeta();
    window.addEventListener('resize', updateViewportMeta);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    
    if (navbar && hero) {
        const checkScroll = () => {
            const scrollPosition = window.scrollY;
            const heroHeight = hero.offsetHeight;
            if (scrollPosition > heroHeight * 0.8) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Check initial scroll position
    }

    // Mobile menu toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }

    // Form submission
    const form = document.querySelector('.contact-form');
    const result = document.getElementById('result');

    if (form && result) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const submitButton = form.querySelector('button[type="submit"]');
            
            if (submitButton) {
                const originalButtonText = submitButton.innerHTML;
                submitButton.innerHTML = 'Sending...';
                submitButton.disabled = true;

                try {
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: formData
                    });
                    const data = await response.json();

                    result.innerHTML = 'Thank you! Your message has been sent successfully.';
                    result.className = 'form-result success';
                    result.style.display = 'block';
                    form.reset();
                } catch (error) {
                    result.innerHTML = 'Oops! There was a problem sending your message. Please try again.';
                    result.className = 'form-result error';
                    result.style.display = 'block';
                } finally {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                }
            }
        });
    }

    // Logo ticker animation
    const logoStrip = document.getElementById('logoStrip');
    if (logoStrip) {
        const logos = logoStrip.querySelectorAll('li');
        if (logos.length > 0) {
            const logoWidth = logos[0].offsetWidth;
            const totalWidth = logoWidth * logos.length;
            
            // Calculate animation duration based on content width and screen size
            let speedFactor = 50; // pixels per second for desktop
            
            // Adjust speed for mobile devices
            if (window.innerWidth <= 480) {
                speedFactor = 80; // Faster for small mobile
            } else if (window.innerWidth <= 768) {
                speedFactor = 65; // Faster for tablets/mobile
            }
            
            const duration = totalWidth / speedFactor;
            logoStrip.style.animation = `scroll ${duration}s linear infinite`;
            
            // Update on resize
            window.addEventListener('resize', function() {
                let newSpeedFactor = 50;
                if (window.innerWidth <= 480) {
                    newSpeedFactor = 80;
                } else if (window.innerWidth <= 768) {
                    newSpeedFactor = 65;
                }
                const newDuration = totalWidth / newSpeedFactor;
                logoStrip.style.animation = `scroll ${newDuration}s linear infinite`;
            });
            
            // Pause animation on hover
            logoStrip.addEventListener('mouseenter', () => {
                logoStrip.style.animationPlayState = 'paused';
            });
            
            logoStrip.addEventListener('mouseleave', () => {
                logoStrip.style.animationPlayState = 'running';
            });
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
