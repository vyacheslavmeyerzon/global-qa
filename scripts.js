// scripts.js - JavaScript functionality for quality Landing Page

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initRevealAnimations();
    initSmoothScrolling();
    initSkillTagAnimations();
    initSkillLevelIndicators();
    initTimelineProgress();
    initAchievementCards();
    initContactReactions();
    initKeyboardNavigation();

    // Log successful initialization
    console.log('quality Landing Page initialized successfully');
    console.log('%c🎯 Easter Egg: Hover over skills to see proficiency levels!', 'color: #0066cc; font-size: 14px');
});

// Reveal elements on scroll with improved performance
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    let ticking = false;

    function handleReveal() {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible && !element.classList.contains('active')) {
                element.classList.add('active');
            }
        });
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(handleReveal);
            ticking = true;
        }
    }

    // Initial check on load
    handleReveal();

    // Check on scroll with throttling
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchors = document.querySelectorAll('a[href^="#"]');

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;

                window.scrollTo({
                    top: offsetTop - 50,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Add floating animation to skill tags
function initSkillTagAnimations() {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach((tag, index) => {
        // Add staggered floating animation to every third tag
        if (index % 3 === 0) {
            setTimeout(() => {
                tag.style.animation = `float 4s ease-in-out infinite`;
                tag.style.animationDelay = `${index * 0.2}s`;
            }, 100);
        }
    });
}

// Initialize skill level indicators
function initSkillLevelIndicators() {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach(tag => {
        const level = tag.getAttribute('data-level');

        // Add visual feedback on hover
        tag.addEventListener('mouseenter', function() {
            // Add slight rotation and scale based on level
            if (level === 'expert') {
                this.style.transform = 'scale(1.1) rotate(2deg)';
            } else if (level === 'advanced') {
                this.style.transform = 'scale(1.08) rotate(-1deg)';
            }

            // Add glow effect
            const glowColor = level === 'expert' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(59, 130, 246, 0.4)';
            this.style.boxShadow = `0 0 20px ${glowColor}`;
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '';
        });

        // Add tooltip on click for mobile users
        tag.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove any existing tooltips
            document.querySelectorAll('.skill-tooltip').forEach(tooltip => tooltip.remove());

            // Create and show tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.style.position = 'absolute';
            tooltip.style.background = level === 'expert' ?
                'linear-gradient(135deg, #22c55e, #16a34a)' :
                'linear-gradient(135deg, #3b82f6, #2563eb)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '4px 12px';
            tooltip.style.borderRadius = '12px';
            tooltip.style.fontSize = '12px';
            tooltip.style.fontWeight = '600';
            tooltip.style.zIndex = '1000';
            tooltip.style.animation = 'fadeIn 0.3s ease';
            tooltip.textContent = level === 'expert' ? 'Expert Level' : 'Advanced Level';

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - 30) + 'px';

            document.body.appendChild(tooltip);

            // Remove tooltip after 2 seconds
            setTimeout(() => {
                tooltip.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => tooltip.remove(), 300);
            }, 2000);
        });
    });
}

// Initialize timeline progress indicators
function initTimelineProgress() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const dot = entry.target.querySelector('.timeline-dot');
                if (dot && !dot.classList.contains('animated')) {
                    dot.style.animation = 'pulse 2s infinite';
                    dot.classList.add('animated');
                }
            }
        });
    }, {
        threshold: 0.5
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Add interactive hover effects to achievement cards
function initAchievementCards() {
    const cards = document.querySelectorAll('.achievement-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add quality-themed reactions on contact card hover
function initContactReactions() {
    const contactCard = document.querySelector('#contact .glass-card');

    if (contactCard) {
        let animationRunning = false;

        contactCard.addEventListener('mouseenter', function() {
            if (animationRunning) return;
            animationRunning = true;

            // Create reactions container
            const reactionsContainer = document.createElement('div');
            reactionsContainer.className = 'reactions-container';
            reactionsContainer.style.position = 'absolute';
            reactionsContainer.style.top = '0';
            reactionsContainer.style.left = '0';
            reactionsContainer.style.width = '100%';
            reactionsContainer.style.height = '100%';
            reactionsContainer.style.pointerEvents = 'none';
            reactionsContainer.style.zIndex = '10';
            reactionsContainer.style.overflow = 'visible';

            this.style.position = 'relative';
            this.appendChild(reactionsContainer);

            // quality-themed reactions
            const reactions = [
                '✅', '🎯', '🚀', '💯', '⭐',
                '🏆', '🎖️', '📊', '🔍', '🛡️',
                '💪', '🌟', '✨', '🎉', '👍'
            ];

            let reactionCount = 0;
            const maxReactions = 30;
            const duration = 8000;
            const interval = duration / maxReactions;

            const reactionInterval = setInterval(() => {
                if (reactionCount < maxReactions) {
                    const reactionEl = document.createElement('div');
                    reactionEl.className = 'reaction reaction-like';
                    reactionEl.innerHTML = reactions[Math.floor(Math.random() * reactions.length)];
                    reactionEl.style.pointerEvents = 'none';

                    // Random position
                    const randomX = 10 + Math.random() * 80;
                    reactionEl.style.left = `${randomX}%`;
                    reactionEl.style.bottom = '10px';
                    reactionEl.style.position = 'absolute';

                    // Vary animation speed
                    const animationDuration = 2.5 + Math.random() * 1;
                    reactionEl.style.animation = `floatUp ${animationDuration}s ease-out forwards`;

                    reactionsContainer.appendChild(reactionEl);
                    reactionCount++;

                    setTimeout(() => {
                        reactionEl.remove();
                    }, animationDuration * 1000);
                } else {
                    clearInterval(reactionInterval);

                    setTimeout(() => {
                        reactionsContainer.remove();
                        animationRunning = false;
                    }, 3000);
                }
            }, interval);
        });
    }
}

// Add keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Press 'c' to jump to contact section
        if (e.key === 'c' && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Press 'h' to go to top
        if (e.key === 'h' && !e.ctrlKey && !e.metaKey && !e.altKey) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Press 't' to jump to technical skills
        if (e.key === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
            const techSection = document.querySelector('.gradient-section');
            if (techSection) {
                techSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// Handle window resize for responsive animations
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Reinitialize animations that depend on viewport size
        initRevealAnimations();
    }, 250);
});

// Add CSS animation keyframes dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(0.9);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .skill-tooltip {
            animation: fadeIn 0.3s ease;
        }
        
        /* Special animation for expert skills */
        .skill-tag[data-level="expert"]:hover {
            animation: shimmer 1s ease infinite;
        }
        
        @keyframes shimmer {
            0%, 100% {
                box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
            }
            50% {
                box-shadow: 0 0 30px rgba(34, 197, 94, 0.6);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize animation styles
addAnimationStyles();

// Track page metrics for analytics (if needed)
function trackPageMetrics() {
    let startTime = Date.now();
    let scrollDepth = 0;

    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const currentScrollDepth = Math.floor((scrollTop + windowHeight) / documentHeight * 100);

        if (currentScrollDepth > scrollDepth) {
            scrollDepth = currentScrollDepth;
            console.log(`Scroll depth: ${scrollDepth}%`);
        }
    });

    // Track time on page
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
        console.log(`Time on page: ${timeOnPage} seconds`);
    });
}

// Initialize tracking
trackPageMetrics();

// Export functions for potential external use
window.qualityLanding = {
    reveal: initRevealAnimations,
    smoothScroll: initSmoothScrolling,
    skillTags: initSkillTagAnimations,
    skillLevels: initSkillLevelIndicators
};