import {logInEmail} from '../firebase/firebase.js';


export const logInClick = () => {
  const emailLogIn = container.querySelector('#input-email');
  const passwordLogIn = container.querySelector('#input-password');
  logInEmail(emailLogIn.value, passwordLogIn.value);
};

