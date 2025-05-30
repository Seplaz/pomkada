import '@/pages/index.css';
import { movies } from './components/movies.js';
import { createButton } from './components/button.js';
import { createCard } from './components/card.js';

const main = document.querySelector('.main');
const content = document.querySelector('.content');
const button = createButton('Выбор судьбы');

content.append(button);

button.addEventListener('click', () => {
  const randomMovie = movies[Math.floor(Math.random() * movies.length)];
  const card = createCard(randomMovie);
  const previousCard = content.querySelector('.card');
  if (previousCard) {
    previousCard.remove();
  }

  content.append(card);

  if (window.innerWidth <= 425) {
    content.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    };
});