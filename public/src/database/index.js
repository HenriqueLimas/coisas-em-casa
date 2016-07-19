import firebase from 'firebase';
import auth from '../auth';
import todos from '../todos';
import dones from '../dones';

const module = {
  initDatabase,
  addTodo,
  removeTodo,
  addDone,
  removeDone,
  fetchAll,
  fetchUser
};

function initDatabase() {
  const currentUser = auth.getCurrentUser();

  if (currentUser) {
    let updates = {};
    updates['/users/' + currentUser.uid] = {
      name: currentUser.displayName.split(' ')[0]
    };

    updates['/families/1/members/' + currentUser.uid] = true;

    firebase.database().ref().update(updates);

    fetchAll();
  }
}

function addTodo(description) {
  if (description) {
    firebase.database().ref('/families/1/todos').push({
      description,
      createdBy: auth.getCurrentUser().uid
    });
  }
}

function addDone(todo) {
  if (todo) {
    removeTodo(todo.id);
    firebase.database().ref('/families/1/dones').push(todo);
  }
}

function removeDone(id) {
  if (id) {
    firebase.database().ref('/families/1/dones/' + id).remove();
  }
}

function removeTodo(id) {
  if (id) {
    firebase.database().ref('/families/1/todos/' + id).remove();
  }
}

function fetchAll() {
  const todosRef = firebase.database().ref('/families/1/todos');
  const doneRef = firebase.database().ref('/families/1/dones');

  todosRef.on('child_added', data => {
    const todo = data.val();
    todo.id = data.key;

    fetchUser(todo.createdBy).then(user => {
      todo.createdBy = user.name;

      const listElement = document.querySelector('.js-todos-list');
      listElement.appendChild(todos.createTodo(todo));
    });
  });


  todosRef.on('child_removed', data => {
    todos.removeTodo(data.key);
  });

  todosRef.on('child_changed', data => {
    const todo = data.val();
    todo.id = data.key;

    todos.updateTodo(todo);
  });

  doneRef.on('child_added', data => {
    const done = data.val();
    done.id = data.key;

    const listElement = document.querySelector('.js-done-list');
    listElement.appendChild(dones.createDone(done));
  });
}

function fetchUser(uid) {
  return firebase.database().ref(`/users/${uid}`)
    .once('value')
    .then(data => data.val());
}

export default module;

