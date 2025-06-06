import '@/pages/index.css';
import { movies } from './components/movies.js';
import { createButton } from './components/button.js';
import { createCard } from './components/card.js';

const main = document.querySelector('.main');
const button = createButton('Случайный фильм');

main.append(button);

button.addEventListener('click', () => {
  const randomMovie = movies[Math.floor(Math.random() * movies.length)];
  const card = createCard(randomMovie);
  const previousCard = main.querySelector('.card');
  if (previousCard) {
    previousCard.remove();
  }

  button.querySelector('.button__title').textContent = 'Хочу другой фильм';

  main.append(card);

  if (window.innerWidth <= 425) {
    main.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    };
});