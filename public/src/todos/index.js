import database from '../database';

const module = {
  initHandlers,
  createTodo,
  removeTodo,
  updateTodo
};

export default module;

function initHandlers() {
  const formAddTodo = document.querySelector('.js-add-todo');

  formAddTodo.addEventListener('submit', (event) => {
    event.preventDefault();

    const form = event.target;
    const descriptionInput = event.target.querySelector('.js-add-todo__description');

    database.addTodo(descriptionInput.value);

    descriptionInput.value = '';
  }, false);
}

function createTodo(todo) {
  const html = `
    <span class="mdl-list__item-primary-content">
      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect js-label">
        <input type="checkbox" class="mdl-checkbox__input js-checkbox">
        <span class="mdl-checkbox__label js-description"></span>
      </label>
      <span class="mdl-list__item-sub-title js-created-by"></span>
    </span>

    <span class="mdl-list__item-secondary-action">
      <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--accent js-remove-todo">
        <i class="material-icons">delete</i>
      </button>
    </span>
  `;

  const li = document.createElement('li');
  li.classList.add('mdl-list__item');
  li.classList.add('mdl-list__item--two-line');

  li.innerHTML = html;

  const label = li.querySelector('.js-label');
  const input = li.querySelector('.js-checkbox');
  const description = li.querySelector('.js-description');
  const createdBy = li.querySelector('.js-created-by');
  const removeTodo = li.querySelector('.js-remove-todo');

  li.setAttribute('data-todo', todo.id);
  label.setAttribute('for', todo.id);
  input.setAttribute('id', todo.id);

  window.componentHandler.upgradeElement(label);
  description.innerText = `${todo.description}`;
  createdBy.innerText = `Criado por ${todo.createdBy}`;

  removeTodo.addEventListener('click', () => database.removeTodo(todo.id), false);

  return li;
}

function removeTodo(id) {
  const li = document.querySelector(`li[data-todo="${id}"]`);

  if (li) {
    li.remove();
  }
}

function updateTodo(todo) {
  const li = document.querySelector(`li[data-todo="${todo.id}"]`);

  if (li) {
    const description = li.querySelector('.js-description');
    description.innerText = `${todo.description} (${todo.createdBy})`;
  }
}
