document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.testimonials-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');

    let currentIndex = 0;
    const testimonialWidth = testimonials[0].offsetWidth;
    const totalTestimonials = testimonials.length;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * testimonialWidth}px)`;
    }

    nextButton.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        updateSlider();
    });

    prevButton.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        updateSlider();
    });
    
    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Добавляем класс анимации
            const icon = this.querySelector('img');
            icon.classList.add('liked');

            // Удаляем класс анимации через небольшую задержку
            setTimeout(() => icon.classList.remove('liked'), 500);
        });
    });
});
