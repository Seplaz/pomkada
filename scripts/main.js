// Получаем элементы из шаблонов
const buttonTemplate = document.querySelector('#button-template').content;
const cardTemplate = document.querySelector('#card-template').content;

// Контейнеры
const cardsContainer = document.querySelector('.cards');
const buttonsContainer = document.querySelector('.buttons');

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

// Кнопка рандом топ 100 ужастиков
const randomHorrorButton = buttonTemplate.querySelector('.button').cloneNode(true);
randomHorrorButton.querySelector('.button__title').textContent = 'Рандомный ужастик';
buttonsContainer.append(randomHorrorButton);

randomHorrorButton.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * horrorMovies.length);
  const randomMovie = horrorMovies[randomIndex];

  if (cardsContainer.firstChild) {
    cardsContainer.firstChild.remove();
  }

  cardsContainer.append(createCard(
    randomMovie.image,
    randomMovie.name,
    randomMovie.year,
    randomMovie.rating,
    randomMovie.description
  ));

  cardsContainer.querySelector('.card').classList.add('appear');

  cardsContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
})

// Кнопка рандом топ 250 лучших фильмов
const randomMovieButton = buttonTemplate.querySelector('.button').cloneNode(true);
randomMovieButton.querySelector('.button__title').textContent = 'Рандомный фильм';
buttonsContainer.append(randomMovieButton);

randomMovieButton.addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() *  randomMovies.length);
  const randomMovie =  randomMovies[randomIndex];

  if (cardsContainer.firstChild) {
    cardsContainer.firstChild.remove();
  }

  cardsContainer.append(createCard(
    randomMovie.image,
    randomMovie.name,
    randomMovie.year,
    randomMovie.rating,
    randomMovie.description
  ));

  cardsContainer.querySelector('.card').classList.add('appear');

  cardsContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
})

// // Кнопка добавить фильм
// const addButton = buttonTemplate.querySelector('.button').cloneNode(true);
// addButton.querySelector('.button__title').textContent = 'Добавить фильм';
// buttonsContainer.append(addButton);

// Вызов всех карточек из movies.js
// movies.forEach((item) => {
//   cardsContainer.append(createCard(item.image, item.name, item.year, item.rating, item.description));
// })
