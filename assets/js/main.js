// Dynamic Navigation Menu
const navMenu = document.getElementById('nav-menu');

navMenu.addEventListener('click', (e) => {
    if (e.target.closest('#nav-toggle, #nav-close')) {
        navMenu.classList.toggle('show-menu');
    }
});

// Scroll Sections Active Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__menu a');

const sectionPositions = Array.from(sections).map(section => ({
    id: section.getAttribute('id'),
    top: section.offsetTop - 50,
    bottom: section.offsetTop + section.offsetHeight - 50
}));

function scrollActive() {
    const scrollY = window.scrollY;

    sectionPositions.forEach(({ id, top, bottom }) => {
        const link = document.querySelector(`.nav__menu a[href*=${id}]`);

        if (scrollY >= top && scrollY <= bottom) {
            link?.classList.add('active-link');
        } else {
            link?.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// Change Background Header & Show Scroll Up
function updateHeaderAndScroll() {
    const nav = document.getElementById('header');
    const scrollUp = document.getElementById('scroll-up');
    const isScrollingDown = scrollUp.classList.contains('show-scroll') && window.scrollY < 560;

    nav.classList.toggle('scroll-header', window.scrollY >= 80);
    scrollUp.classList.toggle('show-scroll', window.scrollY >= 560);

    if (isScrollingDown) {
        scrollUp.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', updateHeaderAndScroll);

// Dark Light Theme
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';
const selectedTheme = localStorage.getItem('selected-theme');

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedTheme === 'dark' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme, isDarkMode);
    localStorage.setItem('selected-theme', isDarkMode ? 'dark' : 'light');
});

// Scroll Reveal Animation (using Intersection Observer)
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 2000,
    reset: true
});

sections.forEach(section => {
    sr.reveal(section);
});

// Owl Carousel (assuming jQuery is available)
$('.carousel').owlCarousel({
    margin: 20,
    loop: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
        0: { items: 1, nav: false },
        600: { items: 2, nav: false },
        1000: { items: 3, nav: false }
    }
});

document.addEventListener('DOMContentLoaded', function() {
  const certificates = document.querySelectorAll('.certificate');
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  document.body.appendChild(lightbox);
  
  certificates.forEach(certificate => {
    const img = certificate.querySelector('img');
    const imgUrl = img.getAttribute('data-src');
    
    certificate.addEventListener('click', function() {
      openLightbox(imgUrl);
    });
  });
  
  function openLightbox(url) {
    const img = new Image();
    img.src = url;
    img.alt = 'Certificate Image';
    
    lightbox.innerHTML = ''; // Clear previous content
    lightbox.appendChild(img);
    lightbox.classList.add('active');
    
    lightbox.addEventListener('click', function() {
      lightbox.classList.remove('active');
    });
  }
});

// Contact Form
const contactForm = document.getElementById('contact-form');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    try {
        // Assume sendFormDataToEmailService is an async function that sends the form data
        await sendFormDataToEmailService(name, email, message);
        alert('Form submitted successfully!');
        contactForm.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form. Please try again later.');
    }
});

// Helper function to send form data to email service
async function sendFormDataToEmailService(name, email, message) {
    // Implement your logic to send form data to an email service (e.g., using Fetch API)
}
