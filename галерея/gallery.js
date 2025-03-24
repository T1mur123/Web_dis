document.addEventListener('DOMContentLoaded', () => {
    // --- Получаем основные элементы ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gallery = document.querySelector('.gallery');
    const addForm = document.getElementById('addForm');
    const imageUpload = document.getElementById('imageUpload');
    const fileNameSpan = document.getElementById('file-name');
    const filtersContainer = document.querySelector('.filters');

    let activeFilter = 'all';

    // --- Функция фильтрации карточек ---
    function filterCards(filter) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const tags = card.dataset.tags.split(' ');
            const match = filter === 'all' || tags.includes(filter);

            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            requestAnimationFrame(() => {
                card.classList.toggle('hide', !match);
            });
        });
    }

    // --- Обработчики для кнопок фильтрации ---
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            filterCards(activeFilter);
        });
    });

    // --- Функция добавления новой карточки ---
    function createCard(data) {
        const card = document.createElement('div');
        card.className = 'card new-card';
        card.dataset.tags = data.tags.join(' ');

        const reader = new FileReader();
        reader.onload = (e) => {
            card.innerHTML = `
                <img src="${e.target.result}">
                <div class="card-content">
                    <h3>${data.title}</h3>
                    <p>${data.description}</p>
                    <div class="tags">
                        ${data.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                </div>
            `;

            gallery.appendChild(card);
            card.addEventListener('animationend', () => {
                card.classList.remove('new-card');
            });

            filterCards(activeFilter); // Применяем текущий фильтр
        };
        reader.readAsDataURL(data.imageFile);
    }

    // --- Обработчик для формы ---
    imageUpload.addEventListener('change', () => {
        if (imageUpload.files.length > 0) {
            fileNameSpan.textContent = imageUpload.files[0].name;
        } else {
            fileNameSpan.textContent = '';
        }
    });

    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!imageUpload.files[0]) {
            alert('Пожалуйста, выберите изображение');
            return;
        }

        const newCard = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            tags: document.getElementById('tags').value.split(',').map(t => t.trim())
        };

        if (newCard.tags.length === 0 || !newCard.title || !newCard.description) {
            alert('Все поля обязательны для заполнения');
            return;
        }

        newCard.imageFile = imageUpload.files[0];

        // --- Добавляем новые теги, если их нет ---
        newCard.tags.forEach(tag => {
            const tagExists = Array.from(filterButtons).some(btn => btn.dataset.filter === tag);
            if (!tagExists) {
                const newButton = document.createElement('button');
                newButton.className = 'filter-btn';
                newButton.dataset.filter = tag;
                newButton.textContent = tag;

                 // Добавляем обработчик клика для новой кнопки
                newButton.addEventListener('click', () => {
                    // Сбрасываем active у всех кнопок
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Устанавливаем active у текущей
                    newButton.classList.add('active');
                    // Фильтруем
                    activeFilter = newButton.dataset.filter;
                    filterCards(activeFilter);
                });
                filtersContainer.appendChild(newButton);
            }
        });

        // --- Создаем новую карточку ---
        createCard(newCard);

        // --- Очищаем и скрываем форму ---
        addForm.classList.add('hide');
        setTimeout(() => {
            addForm.classList.remove('hide');
        }, 400);
        addForm.reset();
        fileNameSpan.textContent = '';
    });

    // --- Инициализация ---
    filterCards(activeFilter);
});
