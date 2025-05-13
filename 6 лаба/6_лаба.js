// Гамбургер-меню для мобильной навигации
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Закрытие меню при клике на ссылку (моб.)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Анимация появления секций при прокрутке
function animateOnScroll(selector, className = 'visible') {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  elements.forEach(el => observer.observe(el));
}

// Анимируем fade-in элементы
animateOnScroll('.fade-in');

// Анимируем отзывы
animateOnScroll('.testimonial');

// Плавная прокрутка (для навигационных ссылок)
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Анимация счетчиков
  const counters = document.querySelectorAll('.counter-number');
  const speed = 200; // Чем меньше - тем быстрее
  
  function animateCounters() {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/\D/g, '');
        const increment = target / speed;
  
        if (count < target) {
          counter.innerText = Math.ceil(count + increment).toLocaleString('ru-RU');
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target.toLocaleString('ru-RU');
        }
      };
      updateCount();
    });
  }
  
  // Запуск анимации, когда счетчики в зоне видимости
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  let countersAnimated = false;
  window.addEventListener('scroll', () => {
    if (!countersAnimated) {
      const countersSection = document.getElementById('counters');
      if (isInViewport(countersSection)) {
        animateCounters();
        countersAnimated = true;
      }
    }
  });
  
  // Также запускаем анимацию, если счетчики уже видны при загрузке
  window.addEventListener('load', () => {
    const countersSection = document.getElementById('counters');
    if (isInViewport(countersSection)) {
      animateCounters();
      countersAnimated = true;
    }
  });
  
  // Обработка формы подписки (заглушка)
  const subscribeForm = document.querySelector('.subscribe-form');
  subscribeForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailInput = subscribeForm.querySelector('input[type="email"]');
    if (emailInput.checkValidity()) {
      alert(`Спасибо за подписку, ${emailInput.value}! Скоро вы получите скидку 10%.`);
      emailInput.value = '';
    } else {
      emailInput.reportValidity();
    }
  });
  
  // Кнопка "Узнать больше" (заглушка)
  document.getElementById('btnLearnMore').addEventListener('click', () => {
    alert('Спасибо за интерес! Дополнительная информация скоро появится на сайте.');
  });
  