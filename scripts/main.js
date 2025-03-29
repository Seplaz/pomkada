let horrorMovies = [];
let shownMovies = new Set();
let predictions = [];
let shownPredictions = new Set();

async function loadMovies() {
  try {
    const response = await fetch('./data/movies.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    horrorMovies = data.horrorMovies;
    return true;
  } catch (error) {
    console.error('Ошибка при загрузке фильмов:', error);
    return false;
  }
}

async function loadPredictions() {
  try {
    const response = await fetch('./data/predictions.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    predictions = data.predictions;
    return true;
  } catch (error) {
    console.error('Ошибка при загрузке предсказаний:', error);
    return false;
  }
}

function getRandomMovie() {
  if (!horrorMovies || horrorMovies.length === 0) {
    console.error('Список фильмов пуст');
    return null;
  }

  if (shownMovies.size >= horrorMovies.length) {
    shownMovies.clear();
  }

  const availableMovies = horrorMovies.filter(movie => !shownMovies.has(movie.name));

  if (availableMovies.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableMovies.length);
  const selectedMovie = availableMovies[randomIndex];

  shownMovies.add(selectedMovie.name);

  return selectedMovie;
}

function getRandomPrediction() {
  if (!predictions || predictions.length === 0) {
    console.error('Список предсказаний пуст');
    return null;
  }

  if (shownPredictions.size >= predictions.length) {
    shownPredictions.clear();
  }

  const availablePredictions = predictions.filter(prediction => !shownPredictions.has(prediction.title));

  if (availablePredictions.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availablePredictions.length);
  const selectedPrediction = availablePredictions[randomIndex];

  shownPredictions.add(selectedPrediction.title);

  return selectedPrediction;
}

async function searchMovieOnKinopoisk(movieName, movieYear) {
  try {
    const searchQuery = encodeURIComponent(`${movieName} ${movieYear}`);
    const searchUrl = `https://www.kinopoisk.ru/index.php?kp_query=${searchQuery}`;

    window.open(searchUrl, '_blank');
  } catch (error) {
    console.error('Ошибка при поиске фильма:', error);
  }
}

function updateCard(movie) {
  if (!movie) {
    console.error('Фильм не выбран');
    return;
  }

  const card = document.querySelector('.card');

  const clone = card.cloneNode(true);
  card.parentNode.replaceChild(clone, card);

  clone.innerHTML = `
    <div class="card__content">
      <div class="card__info">
        <h2 class="card__title">${movie.name}</h2>
        <p class="card__text">Год выпуска: ${movie.year}</p>
        <p class="card__text">Рейтинг: ${movie.rating}</p>
        <p class="card__text">${movie.description}</p>
      </div>
    </div>
  `;

  // Если нужны картинки в карточке, то вставить после card__content
  // <div class="card__poster">
  // <img src="${movie.image}" alt="${movie.name}" class="card__poster-img">
  // </div>


  clone.classList.add('active');

  clone.scrollIntoView({ behavior: 'smooth', block: 'start' });

  clone.addEventListener('click', () => {
    searchMovieOnKinopoisk(movie.name, movie.year);
  });
}

function updateCardWithPrediction(prediction) {
  if (!prediction) {
    console.error('Предсказание не выбрано');
    return;
  }

  const card = document.querySelector('.card');

  const clone = card.cloneNode(true);
  card.parentNode.replaceChild(clone, card);

  clone.innerHTML = `
    <div class="card__content">
      <div class="card__info">
        <h2 class="card__title">${prediction.title}</h2>
        <p class="card__text">${prediction.description}</p>
      </div>
    </div>
  `;

  clone.classList.add('active');

  clone.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', async () => {
  const movieButton = document.getElementById('movieButton');
  const predictionButton = document.getElementById('predictionButton');

  if (!movieButton || !predictionButton) {
    console.error('Кнопки не найдены');
    return;
  }

  const moviesLoaded = await loadMovies();
  const predictionsLoaded = await loadPredictions();

  if (!moviesLoaded) {
    console.error('Не удалось загрузить фильмы');
    return;
  }

  if (!predictionsLoaded) {
    console.error('Не удалось загрузить предсказания');
    return;
  }

  movieButton.addEventListener('click', () => {
    const randomMovie = getRandomMovie();
    updateCard(randomMovie);
  });

  predictionButton.addEventListener('click', () => {
    const randomPrediction = getRandomPrediction();
    updateCardWithPrediction(randomPrediction);
  });
});
