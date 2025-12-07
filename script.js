// Плавная прокрутка для меню
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка
    const navLinks = document.querySelectorAll('.nav-menu a, .navbar .logo');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#home' || targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                
                // Закрываем мобильное меню
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
    
    // Валидация формы
    const form = document.getElementById('feedback-form');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Проверка email
            const email = emailInput.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                emailError.textContent = 'Пожалуйста, введите корректный email адрес';
                emailInput.style.borderColor = '#e74c3c';
                return;
            } else {
                emailError.textContent = '';
                emailInput.style.borderColor = '#ddd';
            }
            
            // Имитация отправки формы
            alert('Спасибо! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.');
            form.reset();
        });
    }
    
    // Подсветка активного пункта меню при скролле
    const sections = document.querySelectorAll('section[id]');
    
    function highlightMenu() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightMenu);
});