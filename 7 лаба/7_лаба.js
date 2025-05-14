const memes = [
    {
      id: 1,
      category: 'classic',
      title: 'Rickroll',
      description: 'Мем-ловушка с песней Rick Astley - Never Gonna Give You Up.',
      year: 2007,
      source: 'https://knowyourmeme.com/memes/rickroll',
      img: 'give up.jpg',
      likes: 0,
      dislikes: 0
    },
    {
      id: 2,
      category: 'internet',
      title: 'Pepe the Frog',
      description: 'Лягушка Пепе - один из самых известных интернет-мемов.',
      year: 2008,
      source: 'https://knowyourmeme.com/memes/pepe-the-frog',
      img: 'PEPE.jpg',
      likes: 0,
      dislikes: 0
    },
    {
      id: 3,
      category: 'animal',
      title: 'Cheems',
      description: 'Собака Шиба-ину с забавной подписью.',
      year: 2019,
      source: 'https://knowyourmeme.com/memes/cheems',
      img: 'Собака.jpg',
      likes: 0,
      dislikes: 0
    },
    {
      id: 4,
      category: 'classic',
      title: 'Trollface',
      description: 'Классический мем-лицо для троллинга.',
      year: 2008,
      source: 'https://knowyourmeme.com/memes/trollface',
      img: 'Троллинг.jpg',
      likes: 0,
      dislikes: 0
    },
    {
      id: 5,
      category: 'internet',
      title: 'Woman Yelling at Cat',
      description: 'Женщина кричит на кота, сидящего за столом.',
      year: 2019,
      source: 'https://knowyourmeme.com/memes/woman-yelling-at-cat',
      img: 'Женщина и кот.jpg',
      likes: 0,
      dislikes: 0
    },
    {
      id: 6,
      category: 'animal',
      title: 'Longcat',
      description: 'Очень длинный кот, ставший мемом.',
      year: 2006,
      source: 'https://knowyourmeme.com/memes/longcat',
      img: 'кот.jpg',
      likes: 0,
      dislikes: 0
    },
    {
      id: 7,
      category: 'classic',
      title: 'Y U NO Guy',
      description: 'Персонаж с фразой "Y U NO [что-то]?"',
      year: 2010,
      source: 'https://knowyourmeme.com/memes/y-u-no-guy',
      img: 'y-u-no_202613.jpg',
      likes: 0,
      dislikes: 0
    },
    {
      id: 8,
      category: 'internet',
      title: 'Hide the Pain Harold',
      description: 'Мужчина с натянутой улыбкой, скрывающий боль.',
      year: 2011,
      source: 'https://knowyourmeme.com/memes/hide-the-pain-harold',
      img: 'мужик.webp',
      likes: 0,
      dislikes: 0
    },
    {
      id: 9,
      category: 'animal',
      title: 'Bongo Cat',
      description: 'Кот, играющий на бонго.',
      year: 2018,
      source: 'https://knowyourmeme.com/memes/bongo-cat',
      img: 'бонго.gif',
      likes: 0,
      dislikes: 0
    },
    {
      id: 10,
      category: 'classic',
      title: 'Philosoraptor',
      description: 'Динозавр-философ с вопросами.',
      year: 2008,
      source: 'https://knowyourmeme.com/memes/philosoraptor',
      img: 'динозавр.jpg',
      likes: 0,
      dislikes: 0
    }
  ];
  
  // Для блокировки повторных лайков/дизлайков
  const votedMemes = {};
  
  const gallery = document.getElementById('memes-gallery');
  const categoryNav = document.getElementById('category-nav');
  const searchInput = document.getElementById('search-input');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalYear = document.getElementById('modal-year');
  const modalSource = document.getElementById('modal-source');
  const modalClose = document.getElementById('modal-close');
  const likeBtn = document.getElementById('like-btn');
  const dislikeBtn = document.getElementById('dislike-btn');
  const likeCount = document.getElementById('like-count');
  const dislikeCount = document.getElementById('dislike-count');
  const siteTitle = document.getElementById('site-title');
  const easterEggModal = document.getElementById('easter-egg-modal');
  const easterEggClose = document.getElementById('easter-egg-close');
  
  let currentCategory = 'all';
  let filteredMemes = memes;
  let currentMeme = null;
  
  // Рендер мемов
  function renderMemes(memesToRender) {
    gallery.innerHTML = '';
    if (memesToRender.length === 0) {
      gallery.innerHTML = '<p>Мемы не найдены.</p>';
      return;
    }
    memesToRender.forEach(meme => {
      const card = document.createElement('div');
      card.className = 'meme-card';
      card.dataset.id = meme.id;
  
      const img = document.createElement('img');
      img.src = meme.img;
      img.alt = meme.title;
  
      const title = document.createElement('div');
      title.className = 'meme-title';
      title.textContent = meme.title;
  
      card.appendChild(img);
      card.appendChild(title);
  
      card.addEventListener('click', () => openModal(meme.id));
  
      gallery.appendChild(card);
    });
  }
  
  // Открытие модалки
  function openModal(id) {
    const meme = memes.find(m => m.id === id);
    if (!meme) return;
    currentMeme = meme;
  
    modalImg.src = meme.img;
    modalImg.alt = meme.title;
    modalTitle.textContent = meme.title;
    modalDescription.textContent = meme.description;
    modalYear.textContent = meme.year;
    modalSource.href = meme.source;
    modalSource.textContent = 'Источник';
  
    likeCount.textContent = meme.likes;
    dislikeCount.textContent = meme.dislikes;
  
    // Проверка, голосовал ли пользователь
    likeBtn.disabled = !!votedMemes[meme.id];
    dislikeBtn.disabled = !!votedMemes[meme.id];
  
    modal.classList.remove('hidden');
  }
  
  // Закрытие модалки
  modalClose.addEventListener('click', () => {
    modal.classList.add('hidden');
    currentMeme = null;
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      currentMeme = null;
    }
  });
  
  // Лайк/дизлайк - только один голос
  likeBtn.addEventListener('click', () => {
    if (!currentMeme || votedMemes[currentMeme.id]) return;
    currentMeme.likes++;
    likeCount.textContent = currentMeme.likes;
    votedMemes[currentMeme.id] = 'like';
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
  });
  
  dislikeBtn.addEventListener('click', () => {
    if (!currentMeme || votedMemes[currentMeme.id]) return;
    currentMeme.dislikes++;
    dislikeCount.textContent = currentMeme.dislikes;
    votedMemes[currentMeme.id] = 'dislike';
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
  });
  
  // Категории
  categoryNav.addEventListener('click', (e) => {
    if (e.target.tagName !== 'LI') return;
    const selectedCategory = e.target.dataset.category;
    if (selectedCategory === currentCategory) return;
  
    currentCategory = selectedCategory;
  
    [...categoryNav.children].forEach(li => li.classList.remove('active'));
    e.target.classList.add('active');
  
    filterMemes();
  });
  
  // Поиск
  searchInput.addEventListener('input', () => {
    filterMemes();
  });
  
  function filterMemes() {
    const query = searchInput.value.trim().toLowerCase();
  
    filteredMemes = memes.filter(meme => {
      const matchesCategory = currentCategory === 'all' || meme.category === currentCategory;
      const matchesSearch =
        meme.title.toLowerCase().includes(query) ||
        meme.description.toLowerCase().includes(query) ||
        meme.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  
    renderMemes(filteredMemes);
  }
  
  // Пасхалка - при наведении на заголовок
  siteTitle.addEventListener('mouseenter', () => {
    siteTitle.style.color = "#ffb300";
    setTimeout(() => {
      easterEggModal.classList.remove('hidden');
    }, 500);
  });
  siteTitle.addEventListener('mouseleave', () => {
    siteTitle.style.color = "";
  });
  
  easterEggClose.addEventListener('click', () => {
    easterEggModal.classList.add('hidden');
  });
  
  // Инициализация
  filterMemes();
  