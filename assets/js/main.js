// Main JavaScript file for gautamsh.me

document.addEventListener('DOMContentLoaded', () => {
  // Variables
  const header = document.querySelector('header');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Easter Egg - Genshin Impact Lore
  let keySequence = '';
  document.addEventListener('keydown', (e) => {
    console.log("Key pressed:", e.key.toLowerCase());
    keySequence += e.key.toLowerCase();
    
    // Only keep the last 7 characters (max length of "genshin")
    if (keySequence.length > 7) {
      keySequence = keySequence.slice(keySequence.length - 7);
    }
    
    console.log("Current typed sequence:", keySequence);
    
    // Check if the secret word is typed
    if (keySequence === 'genshin') {
      // Check if there's a saved position and get current position if not
      const savedPosition = localStorage.getItem('genshinScrollPosition') || 0;
      
      // Save current position before redirecting
      localStorage.setItem('genshinLastVisit', Date.now());
      
      // Redirect to the easter egg page using absolute path from root
      window.location.href = '/hidden/Genshin Impact_ A full story.html';
      console.log("Genshin Easter Egg activated!"); // Debug logging
    }
  });
  
  // Scroll event for header & Scroll-to-top button visibility
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  const scrollThreshold = window.innerHeight * 0.8; // Show button after scrolling 80% of viewport height

  window.addEventListener('scroll', () => {
    // Header scroll effect
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    // Scroll-to-top button visibility
    if (scrollToTopBtn) {
      if (window.scrollY > scrollThreshold) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
  });
  
  // Scroll-to-top button click event
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Mobile menu toggle
  hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });
  
  // Animation for elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animated');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  
  // Initialize animation on load
  animateOnScroll();
  
  // Form submission handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Normally you would send this data to a server
      // For now, just show a success message
      const formGroups = document.querySelectorAll('.form-group');
      formGroups.forEach(group => {
        group.style.display = 'none';
      });
      
      const submitBtn = document.querySelector('.contact-form button');
      submitBtn.style.display = 'none';
      
      const successMessage = document.createElement('div');
      successMessage.classList.add('success-message');
      successMessage.innerHTML = `
        <h3>Thank you for your message, ${name}!</h3>
        <p>I'll get back to you as soon as possible at ${email}.</p>
      `;
      
      contactForm.appendChild(successMessage);
    });
  }
  
  // Typing animation effect for the hero section
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };
    
    // Start the typing animation
    setTimeout(typeWriter, 500);
  }
  
  // Project filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.classList.contains(filterValue)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 200);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 500);
        }
      });
    });
  });
  
  // Parallax effect for the hero background
  const heroSection = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg');
  
  if (heroSection && heroBg) {
    let initialTransform = heroBg.style.transform; // Get initial transform from CSS (if any, for pulse)
    window.addEventListener('scroll', () => {
      const scrollValue = window.scrollY;
      // Preserve existing scale transform from pulse animation, only modify translate
      // The subtlePulse animation in CSS handles the scale. We only add Y-scroll parallax here.
      // The X-scroll parallax was very minor and can be removed for simplicity with the new bg.
      heroBg.style.transform = `translateY(${-50 + scrollValue * 0.05}%)`;
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  
  // Check for saved theme preference, default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  // Set icon based on the theme (sun for dark, moon for light)
  themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  
  // Handle theme toggle click
  themeToggle.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    if (!currentTheme) {
        currentTheme = 'dark'; // Default to dark if somehow unset
    }
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Add class to trigger icon animation
    themeIcon.classList.add('is-switching');

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update icon after a short delay to allow old icon to animate out partly
    // and new icon to be set before its part of animation begins
    setTimeout(() => {
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        // Remove the animation class so it can be re-added on next click
        // Need a slightly longer delay for this than the animation itself to ensure it's clean
        setTimeout(() => {
            themeIcon.classList.remove('is-switching');
        }, 100); // Animation is 0.7s, remove class after it's definitely done.
                  // Shortened to 100ms to make it snappier for next state.
                  // The key is new icon is set, then animation class removed.
    }, 250); // Halfway through a 0.6-0.7s animation is a good swap point.
  });
});