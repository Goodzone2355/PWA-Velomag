/* payment */
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
        const answer = question.nextElementSibling;
        const icon = question;

        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            icon.innerHTML = icon.innerHTML.replace('–', '+');
        } else {
            answer.style.display = 'block';
            icon.innerHTML = icon.innerHTML.replace('+', '–');
        }
    });
});

/* header hamburg */
document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    // Открытие/закрытие бургер-меню
    burger.addEventListener('click', function () {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Закрытие меню при клике на оверлей
    overlay.addEventListener('click', function () {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        this.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    // Раскрытие подменю в мобильной версии
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            this.classList.toggle('active');
            const dropdown = this.nextElementSibling;
            dropdown.classList.toggle('active');
        });
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.mobile-nav-link:not(.mobile-dropdown-toggle)').forEach(link => {
        link.addEventListener('click', function () {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Фиксированный header при скролле
    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
        } else {
            header.style.padding = '15px 0';
        }
    });

    // Крестик в форме
    const xmark = document.querySelector('.fa-xmark');
    const block = document.querySelector('.success');
    xmark.addEventListener('click', function () {
        block.style.display = 'none';
    })

});
