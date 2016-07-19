import firebase from 'firebase';

import auth from './auth';
import authPresentation from './auth/auth.presentation';
import todos from './todos';

const config = {
  apiKey: "AIzaSyBnc157vCqFHRzJMb0K7J-ISOQ2me1T8yM",
  authDomain: "coisas-em-casa.firebaseapp.com",
  databaseURL: "https://coisas-em-casa.firebaseio.com",
  storageBucket: "coisas-em-casa.appspot.com",
};

firebase.initializeApp(config);

auth.initAuth();

let authContainer = document.querySelector('.js-auth-container');

authContainer.appendChild(authPresentation.create());

todos.initHandlers();
