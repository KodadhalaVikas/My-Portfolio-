document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Menu Logic ---
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('#header');

    // Toggle mobile menu
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('fa-xmark');
        navbar.classList.toggle('active');
    };
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('fa-xmark');
            navbar.classList.remove('active');
        });
    });

    // --- Active Link Highlighting on Scroll ---
    window.onscroll = () => {
        // Highlight active nav link
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
                });
            }
        });
    };
    
    // --- Contact Form Submission Logic ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (response.ok) {
                formMessage.textContent = 'Message sent successfully!';
                formMessage.className = 'form-message success';
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Something went wrong.');
            }
        } catch (error) {
            formMessage.textContent = `Error: ${error.message}`;
            formMessage.className = 'form-message error';
        }
        
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    });

    // --- ✨ NEW: SCROLL REVEAL ANIMATION LOGIC ✨ ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Select all elements to be animated
    const elementsToAnimate = document.querySelectorAll('.section-title, .glass-card');
    elementsToAnimate.forEach((el) => observer.observe(el));
});