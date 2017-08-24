import './home.css';
import HomeTemplate from './home.html';

window.addEventListener('load', () => {
  console.debug('document loaded!'); // eslint-disable-line no-console

  document.getElementById('bootstrap').innerHTML = HomeTemplate;
});