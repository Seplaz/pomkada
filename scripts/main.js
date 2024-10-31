// Получаем данные из JSON-файла
fetch('./db/hero.content.json')
  .then(response => response.json())
  .then(data => {
    // Заполняем HTML-элементы данными из JSON-файла
    const heroContentTitle = document.querySelector('.hero__content-title');
    heroContentTitle.textContent = data[0].hero__title;

    const heroContentSubtitle = document.querySelector('.hero__content-subtitle');
    heroContentSubtitle.textContent = data[0].hero__subtitle;
  });