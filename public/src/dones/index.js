import database from '../database';

const module = {
  createDone,
  removeDone
};

export default module;

function createDone(done) {
  const html = `
    <span class="mdl-list__item-primary-content">
      <span class="js-description"></span>
    </span>

    <span class="mdl-list__item-secondary-action">
      <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--accent js-remove-done">
        <i class="material-icons">delete</i>
      </button>
    </span>
  `;

  const li = document.createElement('li');
  li.classList.add('mdl-list__item');

  li.innerHTML = html;

  const description = li.querySelector('.js-description');
  const removeDone = li.querySelector('.js-remove-done');

  li.setAttribute('data-done', done.id);

  description.innerText = `${done.description}`;

  removeDone.addEventListener('click', () => database.removeDone(done.id), false);

  return li;
}

function removeDone(id) {
  const li = document.querySelector(`li[data-done="${id}"]`);

  if (li) {
    li.remove();
  }
}
