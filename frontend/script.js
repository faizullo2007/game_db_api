const API = 'http://127.0.0.1:8000/api/games/';

const list = document.getElementById('games');
const detail = document.getElementById('detail');
const error = document.getElementById('error');

function showError(err) {
  error.hidden = false;
  error.textContent = 'Ошибка: ' + err.message + ' (проверьте, что backend запущен и CORS настроен)';
}

function loadGames(search = '') {
  fetch(API + '?search=' + encodeURIComponent(search))
    .then(res => res.json())
    .then(games => {
      error.hidden = true;
      list.innerHTML = '';
      games.forEach(game => {
        const li = document.createElement('li');
        li.textContent = `${game.title} (${game.release_year}) — ${game.rating}`;
        li.onclick = () => loadGame(game.id);
        list.append(li);
      });
    })
    .catch(showError);
}

function loadGame(id) {
  fetch(API + id + '/')
    .then(res => res.json())
    .then(game => {
      const title = document.createElement('h2');
      title.textContent = game.title;

      const info = document.createElement('p');
      info.textContent = `Разработчик: ${game.developer_name} | Жанр: ${game.genre_name} | Год: ${game.release_year} | Рейтинг: ${game.rating}`;

      const text = document.createElement('p');
      text.textContent = game.description;

      detail.replaceChildren(title, info, text);
      detail.hidden = false;
    })
    .catch(showError);
}

document.getElementById('search').oninput = e => loadGames(e.target.value);

loadGames();
