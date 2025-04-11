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

randomButton.addEventListener('click', () => {
  if (cardsContainer.firstChild) {
    cardsContainer.firstChild.remove();
  }

  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  
  cardsContainer.append(createCard(
    randomMovie.image,
    randomMovie.name,
    randomMovie.year,
    randomMovie.rating,
    randomMovie.description
  ));
  
  cardsContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
})

// Кнопка добавить фильм
const addButton = buttonTemplate.querySelector('.button').cloneNode(true);
addButton.querySelector('.button__title').textContent = 'Добавить фильм';
buttonsContainer.append(addButton);

// Создание карточки с фильмом
const createCard = (image, name, year, rating, description) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = image;
  cardElement.querySelector('.card__image').alt = `Постер к фильму ${name}`;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.year').textContent = `Год: ${year}`;
  cardElement.querySelector('.rating').textContent = `Рейтинг: ${rating}`;
  cardElement.querySelector('.description').textContent = description;

  cardElement.addEventListener('click', () => {
    const movieName = encodeURIComponent(name);
    window.open(`https://www.kinopoisk.ru/index.php?kp_query=${movieName}`, '_blank');
  })
  return cardElement;
}

// Вызов всех карточек из movies.js
// movies.forEach((item) => {
//   cardsContainer.append(createCard(item.image, item.name, item.year, item.rating, item.description));
// })
