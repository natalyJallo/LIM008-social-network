import { ingresoFacebook, ingresoGoogle } from '../firebase/firebase-auth.js';
import {loginCall, loginCheckIn, registerAcccount, validateloginForm} from './index.js';
export {btnOnclick};
export {btnGoogle};
export {btnFacebook};
export {btnRegister};

const btnGoogle = () => {
//porque no usa ¿querySelector?, ¿será porque no es un input que requiera obtener su valor?
document.getElementById('btn-facebook').addEventListener('click', ingresoFacebook,false);
//para ver los datos del usuario cuando inicie sesión. Pero ¿no se aplicaría a firebase? no otros proveedores.
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

/*Resumen: aquí está creando funciones para los botones de inicio de sesión: 
Para Google y facebook llama los botones por ID y le aplica la función que me da Firebase
Para Firebase:invoco los input del formulario de inicio de sesión a los cuales le aplico 
la función validateLoginForm, loginCall de Firebase y loginCheckIn para mostrar datos del usuario
Para btnRegister: también invoco los imput del formulario de registro usando querySelector
finalmente le aplico la función registerAccount y le paso como argumentos emailSignUp, 
passwordVerif y nameSignUp */
