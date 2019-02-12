import { ingresoFacebook, ingresoGoogle } from '../firebase/firebase-auth.js';
import {loginCall, loginCheckIn, registerAcccount, validateloginForm} from './index.js';
export {btnOnclick};
export {btnGoogle};
export {btnFacebook};
export {btnRegister};

const btnGoogle = () => {
document.getElementById('btn-facebook').addEventListener('click', ingresoFacebook,false);
loginCheckIn();
};
const btnFacebook = () => {
 document.getElementById('btn-google').addEventListener('click',ingresoGoogle,false);
loginCheckIn();
};

/* Inicio de sesión por email y contraseña y registro*/
const btnOnclick = (elemt) => {
    const emailLogIn = elemt.querySelector("#input-email").value; // Input email de inicio de sesión
    console.log(emailLogIn);
    const passwordLogIn = elemt.querySelector("#input-password").value; // Input contraseña de inicio de sesión
    const errorText = elemt.querySelector('#error-text').value;
    if (validateloginForm(emailLogIn, passwordLogIn) === true) {
    loginCall(emailLogIn, passwordLogIn, errorText);    
    loginCheckIn();
    };
  };

const btnRegister = (element) => {
    let nameSignUp = element.querySelector("#enter-name").value; // Input nombre en registro
    let nickNameSignUp = element.querySelector("#enter-nick").value; // Input sobrenombre en registro
    let emailSignUp = element.querySelector("#enter-email").value; // Input volver a ingresar email en registro
    let passwordSignUp = element.querySelector("#enter-psw").value;  // Input contraseña en registro
    let passwordVerif = element.querySelector("#re-enter-psw").value;  
    if (registerAcccount(emailSignUp, passwordVerif, nameSignUp)) {}
    window.location.hash = '#/session';
};