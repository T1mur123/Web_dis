document.addEventListener('DOMContentLoaded', function() {
    const colorRects = document.querySelectorAll('#infographic rect');

    colorRects.forEach(rect => {
        rect.addEventListener('mouseover', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            switch (rect.id) {
                case 'color1':
                    tooltip.textContent = 'Корпоративный стиль. Используется для официальных сайтов и презентаций.';
                    break;
                case 'color2':
                    tooltip.textContent = 'Креативный стиль. Подходит для проектов, требующих яркости и оригинальности.';
                    break;
                case 'color3':
                    tooltip.textContent = 'Экологический стиль. Используется для сайтов, связанных с природой и экологией.';
                    break;
                case 'color4':
                    tooltip.textContent = 'Веселый стиль. Подходит для детских или развлекательных проектов.';
                    break;
                case 'color5':
                    tooltip.textContent = 'Технологический стиль. Используется для сайтов, связанных с технологиями и инновациями.';
                    break;
                case 'color6':
                    tooltip.textContent = 'Модный стиль. Подходит для проектов, связанных с модой и красотой.';
                    break;
                default:
                    tooltip.textContent = 'Популярная цветовая палитра';
            }
            tooltip.style.top = `${rect.getBoundingClientRect().top + 10}px`;
            tooltip.style.left = `${rect.getBoundingClientRect().left + 10}px`;
            document.body.appendChild(tooltip);
            tooltip.style.visibility = 'visible';
        });

        rect.addEventListener('mouseout', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // Анимация при загрузке страницы
    document.querySelector('svg').style.opacity = 0;
    setTimeout(() => {
        document.querySelector('svg').style.opacity = 1;
        document.querySelector('svg').style.transition = 'opacity 1s';
    }, 100);
});
