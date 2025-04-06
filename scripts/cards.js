// Получаем элементы из шаблонов
const mainContainer = document.querySelector('.main');
const buttonsContainer = document.querySelector('.buttons');
const buttonTemplate = document.querySelector('#button-template').content;
const cardTemplate = document.querySelector('#card-template').content;


// Копируем элементы
const movieButton = buttonTemplate.querySelector('.button').cloneNode(true);
const randomButton = buttonTemplate.querySelector('.button').cloneNode(true);

const card = cardTemplate.querySelector('.card').cloneNode(true);

// Задаем контент элементов и вставляем на страницу
movieButton.querySelector('.button__title').textContent = 'Выбрать случайный фильм';
buttonsContainer.append(movieButton);

movieButton.addEventListener('click', function() {
  card.querySelector('.card__title').textContent = '123123123';
  card.querySelector('.card__text').textContent = '111';
  mainContainer.append(card);
})


