const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (data) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardYear = cardElement.querySelector('.card__year');
  const cardRating = cardElement.querySelector('.card__rating');
  const cardDescription = cardElement.querySelector('.card__description');
  
  cardImage.src = data.image;
  cardImage.alt = data.title;
  cardTitle.textContent = data.title;
  cardYear.textContent = `Год: ${data.year}`;
  cardRating.textContent = `Рейтинг: ${data.rating}`;
  cardDescription.textContent = data.description;

  cardElement.addEventListener('click', () => {
    const movieName = encodeURIComponent(data.title);
    window.open(`https://www.kinopoisk.ru/index.php?kp_query=${movieName}`, '_blank');
  });

  return cardElement;
};