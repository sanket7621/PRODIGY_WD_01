const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

let isScrolling = false;
let scrollTimeout;

/* Scroll effect */
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  
  // Only update active nav link if not programmatically scrolling
  if (!isScrolling) {
    updateActiveNavLink();
  }
});

/* Mobile menu */
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

/* Function to update active nav link based on scroll position */
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.pageYOffset + 150; // Add offset for better detection

  let currentSection = null;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = sectionId;
    }
  });

  // If at the very top, set home as active
  if (scrollY < 200) {
    currentSection = "home";
  }

  if (currentSection) {
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
}

/* Smooth scroll for navigation links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      // Set scrolling flag
      isScrolling = true;
      
      // Update active nav link immediately
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
      
      // Use scrollIntoView which respects scroll-margin-top CSS property
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      
      // Close mobile menu if open
      navLinks.classList.remove("show");
      
      // Reset scrolling flag after scroll completes
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        updateActiveNavLink();
      }, 1000);
    }
  });
});