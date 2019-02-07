import { ingresoFacebook, ingresoGoogle} from '../lib/firebase/firebase-auth.js';
import {loginCall, loginCheckIn, registerAcccount, validateloginForm} from './index.js';

export const btnGoogle = () => {
  ingresoGoogle();
  loginCheckIn();
};
export const btnFacebook = () => {
  ingresoFacebook();
  loginCheckIn();
};

/* Inicio de sesión por email y contraseña y registro*/
export const btnSignIn = (elemt) => {
  const emailLogIn = elemt.querySelector('#input-email').value; // Input email de inicio de sesión
  const passwordLogIn = elemt.querySelector('#input-password').value; // Input contraseña de inicio de sesión
  const errorText = elemt.querySelector('#error-text').value;
  if (validateloginForm(emailLogIn, passwordLogIn) === true) {
    loginCall(emailLogIn, passwordLogIn, errorText);
    loginCheckIn();
  };
};

export const btnRegister = (element) => {
  let nameSignUp = element.querySelector('#enter-name').value; // Input nombre en registro
  let lastNameSignUp = element.querySelector('#enter-lastname').value;
  let nickNameSignUp = element.querySelector('#enter-nick').value; // Input sobrenombre en registro
  let countrySignUp = element.querySelector('#enter-country').value;
  let emailSignUp = element.querySelector('#enter-email').value; // Input volver a ingresar email en registro
  let passwordSignUp = element.querySelector('#enter-psw').value; // Input contraseña en registro
  let passwordVerif = element.querySelector('#re-enter-psw').value;
  if (registerAcccount(emailSignUp, passwordVerif, nameSignUp, lastNameSignUp, nickNameSignUp, countrySignUp)) {}
  window.location.hash = '#/session';
};