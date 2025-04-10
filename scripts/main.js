// Получаем элементы из шаблонов
const buttonTemplate = document.querySelector('#button-template').content;
const cardTemplate = document.querySelector('#card-template').content;

// Контейнеры
const cardsContainer = document.querySelector('.cards');
const buttonsContainer = document.querySelector('.buttons');

// Кнопка рандом
const randomButton = buttonTemplate.querySelector('.button').cloneNode(true);
randomButton.querySelector('.button__title').textContent = 'Выбрать случайный фильм';
buttonsContainer.append(randomButton);

// Создание карточки с фильмом
const createCard = (image, name, year, rating, description) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = image;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.year').textContent = year;
  cardElement.querySelector('.rating').textContent = rating;
  cardElement.querySelector('.description').textContent = description;
  return cardElement;
}

// Вызов всех карточек из movies.js
movies.forEach((item) => {
  cardsContainer.append(createCard(item.image, item.name, item.year, item.rating, item.description));
})
