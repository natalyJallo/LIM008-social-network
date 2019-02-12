
import { ingresoFacebook, ingresoGoogle} from '../firebase/controller-auth-apis.js';
import {loginCall, loginCheckIn, registerAcccount, validateloginForm, validationPost/* ,addData */} from './view-controller-auth.js';
import {addPost} from '../firebase/controller-auth-login.js';

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
  const errorText = elemt.querySelector('#error-text');
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
  let errorTextSignUp = element.querySelector('#error-text-sign-up'); 
  if (registerAcccount(emailSignUp, passwordVerif, nameSignUp, lastNameSignUp, nickNameSignUp, countrySignUp, errorTextSignUp)) {
    console.log('Registro y añadido a base de datos exitoso');
  } else {
    console.log('Ocurrió un problema');
  }
  window.location.hash = '#/session';
};

export const postSubmit = (element) => {
  let content = element.querySelector('#post-input');
  let privacy = element.querySelector('#privacy-selector');
  let validation = element.querySelector('#post-error');
  if (validationPost(content.value, validation) === true) {
    addPost(content.value, privacy.value)
      .then(() => {
        console.log(content);
        content.value = '';
        console.log('Post agregado a fb');
      }).catch(() => {
        content.value = '';
        console.log('Post no fue agregado a fb');
      });
  }
};