import auth from './index';

const module = {
  create
};

export default module;

function create() {
  const signIn = document.createElement('a');

  signIn.classList.add('mdl-navigation__link');
  signIn.classList.add('sign-in');
  signIn.classList.add('js-sign-in');
  signIn.innerText = 'Entrar com o Google';

  signIn.addEventListener('click', login, false);

  return signIn;
}

function login(event) {
  event.preventDefault();

  auth.login();
}
