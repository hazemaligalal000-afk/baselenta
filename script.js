document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(i => i.classList.remove('active'));

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Sticky Header Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
    });

    // Form Submission Handling
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const governorate = document.getElementById('governorate').value;
            const address = document.getElementById('address').value;
            const quantitySelect = document.getElementById('quantity');
            const quantityText = quantitySelect.options[quantitySelect.selectedIndex].text.split(' - ')[0];
            const price = quantitySelect.options[quantitySelect.selectedIndex].getAttribute('data-price');

            const message = `*طلب جديد*\n` +
                `-------------------------------------------\n` +
                `👤 *الاسم:* ${name}\n` +
                `📱 *الموبايل:* ${phone}\n` +
                `📍 *المحافظة:* ${governorate}\n` +
                `📦 *الكمية:* ${quantityText}\n` +
                `🏠 *العنوان:* ${address}\n` +
                `💰 *الإجمالي:* ${price} جنيه\n` +
                `-------------------------------------------\n` +
                `✅ الدفع عند الاستلام - شحن سريع`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/201020760067?text=${encodedMessage}`;

            window.open(whatsappURL, '_blank');
        });
    }

    // Scroll Reveal Animation (Simple version)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.problem-card, .ingredient-item, .benefit-card, .testimonial, .solution-content');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Countdown Timer Logic
    const countdownDate = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 hours from now

    function updateTimer() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
    }

    setInterval(updateTimer, 1000);
    updateTimer();
});
