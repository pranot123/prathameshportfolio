// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.querySelector('.scroll-to-top');
const skillsGrid = document.querySelector('.skills-grid');
const categoryFilter = document.querySelector('.category-filter');
const filterButtons = document.querySelectorAll('.filter-btn');
const skillCategories = document.querySelectorAll('.skill-category');
const achievementItems = document.querySelectorAll('.achievement-item');
const programItems = document.querySelectorAll('.program-item');
const imageModals = document.querySelectorAll('.image-modal');
const sliders = document.querySelectorAll('.image-slider');

// Loader
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize sliders
    sliders.forEach(slider => {
        const sliderTrack = slider.querySelector('.slider-track');
        const slides = slider.querySelectorAll('img');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        const currentSlide = slider.querySelector('.current-slide');
        const totalSlides = slider.querySelector('.total-slides');
        
        if (sliderTrack && slides.length > 0) {
            let currentIndex = 0;
            const slideWidth = slider.querySelector('.slider-container').offsetWidth;
            
            // Set initial slide width
            slides.forEach(slide => {
                slide.style.width = slideWidth + 'px';
            });
            
            // Set initial positions
            sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            totalSlides.textContent = slides.length;
            currentSlide.textContent = currentIndex + 1;
            
            // Next slide function
            const nextSlide = () => {
                currentIndex = (currentIndex + 1) % slides.length;
                sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
                currentSlide.textContent = currentIndex + 1;
                updateSliderButtons();
            };
            
            // Previous slide function
            const prevSlide = () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
                currentSlide.textContent = currentIndex + 1;
                updateSliderButtons();
            };
            
            // Update button states
            const updateSliderButtons = () => {
                prevBtn.disabled = currentIndex === 0;
                nextBtn.disabled = currentIndex === slides.length - 1;
            };
            
            // Event listeners
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
            
            // Keyboard navigation
            slider.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    nextSlide();
                } else if (e.key === 'ArrowLeft') {
                    prevSlide();
                }
            });
            
            // Touch/swipe support
            let startX = 0;
            let endX = 0;
            
            sliderTrack.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            sliderTrack.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                handleSwipe();
            });
            
            const handleSwipe = () => {
                const threshold = 50;
                const difference = startX - endX;
                
                if (Math.abs(difference) > threshold) {
                    if (difference > 0) {
                        // Swipe left
                        nextSlide();
                    } else {
                        // Swipe right
                        prevSlide();
                    }
                }
            };
            
            updateSliderButtons();
            
            // Auto-slide (optional, uncomment if needed)
            // let slideInterval = setInterval(nextSlide, 5000);
            
            // Pause auto-slide on hover
            // slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            // slider.addEventListener('mouseleave', () => {
            //     slideInterval = setInterval(nextSlide, 5000);
            // });
        }
    });
    
    // Animate elements on scroll
    animateOnScroll();
    
    // Create scroll to top button if it doesn't exist
    if (!scrollToTopBtn) {
        const scrollToTop = document.createElement('button');
        scrollToTop.className = 'scroll-to-top';
        scrollToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollToTop.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollToTop);
        
        scrollToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide button on scroll
        window.addEventListener('scroll', toggleScrollToTop.bind(null, scrollToTop));
    }
});

// Navigation Scroll Effect
window.addEventListener('scroll', () => {
    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link
    updateActiveNavLink();
    
    // Scroll to top button
    if (scrollToTopBtn) {
        toggleScrollToTop(scrollToTopBtn);
    }
    
    // Animate elements on scroll
    animateOnScroll();
});

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], section[id], section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos > sectionTop && scrollPos <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Toggle Scroll to Top Button
function toggleScrollToTop(button) {
    if (window.scrollY > 500) {
        button.classList.add('show');
    } else {
        button.classList.remove('show');
    }
}

// Skills Filter Functionality
if (categoryFilter) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter skill categories
            skillCategories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === categoryType) {
                    category.style.display = 'block';
                    setTimeout(() => {
                        category.style.opacity = '1';
                        category.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    category.style.opacity = '0';
                    category.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        category.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Animate Elements on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-category, .experience-item, .award-item, .program-item, .stat-item, .achievement-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animation styles
document.querySelectorAll('.skill-category, .experience-item, .award-item, .program-item, .stat-item, .achievement-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Interactive Achievement Cards
achievementItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Certificate Program Items Interaction
programItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const image = item.querySelector('.program-image');
        if (image) {
            image.style.transform = 'scale(1.05)';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const image = item.querySelector('.program-image');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// Image Modal Functionality
document.querySelectorAll('.award-image, .program-image, .team-photo').forEach(image => {
    image.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" />
            <button aria-label="Close image">&times;</button>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        modal.style.display = 'flex';
        
        // Close modal on button click
        modal.querySelector('button').addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = '';
        });
        
        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL hash without jumping
            history.pushState(null, null, targetId);
        }
    });
});

// Form Validation (if you add a contact form later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
            
            // Add error message
            let errorMsg = input.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'This field is required';
                errorMsg.style.color = '#ef4444';
                errorMsg.style.fontSize = '0.875rem';
                errorMsg.style.marginTop = '0.25rem';
                input.parentNode.insertBefore(errorMsg, input.nextSibling);
            }
        } else {
            input.style.borderColor = '';
            const errorMsg = input.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
        }
    });
    
    return isValid;
}

// Add form submission handler (example for future contact form)
document.addEventListener('submit', function(e) {
    if (e.target.tagName === 'FORM') {
        e.preventDefault();
        
        if (validateForm(e.target)) {
            // Form is valid, proceed with submission
            console.log('Form submitted successfully');
            
            // Here you would typically send data to a server
            // For now, just show a success message
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.textContent = 'Sent!';
                submitBtn.style.backgroundColor = '#10b981';
                
                // Reset form
                setTimeout(() => {
                    e.target.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 2000);
            }, 1500);
        }
    }
});

// Intersection Observer for lazy loading images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Navigate through filter buttons with arrow keys
    if (categoryFilter && categoryFilter.contains(document.activeElement)) {
        const activeIndex = Array.from(filterButtons).indexOf(document.activeElement);
        
        if (e.key === 'ArrowRight' && activeIndex < filterButtons.length - 1) {
            filterButtons[activeIndex + 1].focus();
            filterButtons[activeIndex + 1].click();
        } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
            filterButtons[activeIndex - 1].focus();
            filterButtons[activeIndex - 1].click();
        }
    }
});

// Add focus styles for accessibility
document.addEventListener('mousedown', () => {
    document.body.classList.add('using-mouse');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.remove('using-mouse');
    }
});

// Add CSS for focus styles
const style = document.createElement('style');
style.textContent = `
    body:not(.using-mouse) a:focus,
    body:not(.using-mouse) button:focus,
    body:not(.using-mouse) input:focus,
    body:not(.using-mouse) select:focus,
    body:not(.using-mouse) textarea:focus {
        outline: 2px solid #6366f1;
        outline-offset: 2px;
    }
    
    .skill-card:focus,
    .award-item:focus,
    .program-item:focus {
        outline: 2px solid #6366f1;
        outline-offset: 4px;
    }
`;
document.head.appendChild(style);

// Initialize with animations
setTimeout(() => {
    animateOnScroll();
}, 100);

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize sliders on resize
        sliders.forEach(slider => {
            const sliderTrack = slider.querySelector('.slider-track');
            const slides = slider.querySelectorAll('img');
            const currentSlide = slider.querySelector('.current-slide');
            
            if (sliderTrack && slides.length > 0 && currentSlide) {
                const currentIndex = parseInt(currentSlide.textContent) - 1;
                const slideWidth = slider.querySelector('.slider-container').offsetWidth;
                
                slides.forEach(slide => {
                    slide.style.width = slideWidth + 'px';
                });
                
                sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            }
        });
        
        animateOnScroll();
    }, 250);
});

// Add hover effect for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add click effect for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-2px)';
    });
});

// Log page views (optional)
console.log('Portfolio page loaded successfully');
console.log('Welcome to Prathamesh Solase\'s Portfolio');