let horrorMovies = [];
let shownMovies = new Set();

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

document.addEventListener('DOMContentLoaded', async () => {
  const movieButton = document.getElementById('movieButton');
  
  if (!movieButton) {
    console.error('Кнопка не найдена');
    return;
  }

  const moviesLoaded = await loadMovies();
  if (!moviesLoaded) {
    console.error('Не удалось загрузить фильмы');
    return;
  }

  movieButton.addEventListener('click', () => {
    const randomMovie = getRandomMovie();
    updateCard(randomMovie);
  });
});
