import {logInFireb, loginCheck} from '../firebase/firebase.js';


export const logInEmail = (cont) => {
  const errorText = cont.querySelector('error-text');
  const inputEm = cont.querySelector('input-email');
  const inputPw = cont.querySelector('input-password');
  logInFireb(inputEm.value, inputPw.value, errorText);
  logInCheck();
};

