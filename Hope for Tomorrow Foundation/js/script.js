// Interactive Elements and Functionality

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (to be added to CSS and HTML)
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰';
    document.querySelector('.navbar').appendChild(mobileMenuToggle);
    
    mobileMenuToggle.addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.toggle('active');
    });

    // Form Validation for Contact Form
    const contactForm = document.querySelector('form[action="#"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                // AJAX form submission
                submitFormViaAJAX(this);
            }
        });
    }

    // Form Validation for Volunteer Form
    const volunteerForm = document.querySelector('form[action="#"]');
    if (volunteerForm && window.location.pathname.includes('volunteer')) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateVolunteerForm()) {
                submitFormViaAJAX(this);
            }
        });
    }

    // Initialize interactive elements
    initAccordions();
    initImageGallery();
    initMap();
});

// Contact Form Validation
function validateContactForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    let isValid = true;

    // Clear previous errors
    clearErrors();

    // Name validation
    if (!name.value.trim()) {
        showError(name, 'Please enter your full name');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Subject validation
    if (!subject.value) {
        showError(subject, 'Please select a subject');
        isValid = false;
    }

    // Message validation
    if (!message.value.trim() || message.value.trim().length < 10) {
        showError(message, 'Please enter a message with at least 10 characters');
        isValid = false;
    }

    // Phone validation (optional)
    const phone = document.getElementById('phone');
    if (phone && phone.value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
    }

    return isValid;
}

// Volunteer Form Validation
function validateVolunteerForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const role = document.getElementById('role');
    const availability = document.getElementById('availability');
    const terms = document.querySelector('input[name="terms"]');
    let isValid = true;

    clearErrors();

    // Name validation
    if (!name.value.trim()) {
        showError(name, 'Please enter your full name');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Phone validation
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phone.value.trim() || !phoneRegex.test(phone.value)) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
    }

    // Role validation
    if (!role.value) {
        showError(role, 'Please select how you want to help');
        isValid = false;
    }

    // Availability validation
    if (!availability.value) {
        showError(availability, 'Please select your availability');
        isValid = false;
    }

    // Terms validation
    if (!terms.checked) {
        showError(terms, 'You must agree to the terms and conditions');
        isValid = false;
    }

    return isValid;
}

// Error handling functions
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    input.classList.add('error');
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
    
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));
}

// AJAX Form Submission
function submitFormViaAJAX(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Simulate AJAX request (replace with actual endpoint)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        showModal('Success!', 'Your message has been sent successfully. We will get back to you soon.');
        form.reset();
    })
    .catch(error => {
        showModal('Error', 'Sorry, there was an error sending your message. Please try again.');
    })
    .finally(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}

// Modal functionality
function showModal(title, message) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('custom-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'custom-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3 id="modal-title"></h3>
                <p id="modal-message"></p>
                <button class="btn btn-primary" id="modal-ok">OK</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Add event listeners
        modal.querySelector('.close-modal').addEventListener('click', hideModal);
        modal.querySelector('#modal-ok').addEventListener('click', hideModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) hideModal();
        });
    }

    // Set content and show
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    modal.style.display = 'block';
}

function hideModal() {
    const modal = document.getElementById('custom-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Accordion functionality
function initAccordions() {
    // Add accordion to services page
    const servicesSection = document.querySelector('.services-page');
    if (servicesSection) {
        const cards = servicesSection.querySelectorAll('.card');
        cards.forEach((card, index) => {
            if (index > 0) { // Keep first card open
                card.classList.add('accordion');
                const content = card.querySelector('ul, p');
                if (content) {
                    content.style.display = 'none';
                }
                
                card.addEventListener('click', function() {
                    this.classList.toggle('active');
                    const content = this.querySelector('ul, p');
                    if (content) {
                        content.style.display = this.classList.contains('active') ? 'block' : 'none';
                    }
                });
            }
        });
    }
}

// Image Gallery with Lightbox
function initImageGallery() {
    // Create gallery on about page
    const aboutImages = document.querySelectorAll('.responsive-image');
    aboutImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });
}

function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="${src}" alt="${alt}">
            <div class="lightbox-caption">${alt}</div>
        </div>
    `;
    document.body.appendChild(lightbox);

    lightbox.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.remove();
    }
}

// Enhanced Map functionality
function initMap() {
    // This would integrate with Google Maps API
    console.log('Map initialization would go here');
    
    // Add interactive markers and customizations
    const mapContainer = document.querySelector('.map-container iframe');
    if (mapContainer) {
        // Add loading indicator
        mapContainer.addEventListener('load', function() {
            console.log('Map loaded successfully');
        });
    }
}