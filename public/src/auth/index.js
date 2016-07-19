import firebase from 'firebase';

const module = {
  initAuth,
  getCurrentUser,
  login
};

export function initAuth() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      const signIn = document.querySelector('.js-sign-in');

      signIn.innerText = user.displayName;
    } else {
      // No user is signed in.
    }
  });
}

export function getCurrentUser() {
  return firebase.auth().currentUser;
}

export function login() {
  const provider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(provider).then( result => {
    return result.user;
  });
}


export default module;
