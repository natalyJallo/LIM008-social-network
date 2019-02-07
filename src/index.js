
/* Funciones que estaban aqui por defecto en el boilerplate*/

// aqui exportaras las funciones que necesites

/* Inicio de sesión por email y contraseña y registro - JENI*/

/* DOM: secciones para ocultarlos o mostrarlos*/

let logInForm = document.getElementById('login-form'); // Sección inicio de sesión
let logOutForm = document.getElementById('log-out'); // Sección cerrar sesión
let signUpForm = document.getElementById('sign-up'); // Sección formulario de registro

/* DOM: input de contraseña y email para usarlos en el inicio de sesión*/

let passwordLogIn = document.getElementById('input-password'); // Input contraseña de inicio de sesión
let emailLogIn = document.getElementById('input-email'); // Input email de inicio de sesión
let welcomeTxt = document.getElementById('welcome-text'); // <p> donde se inserta la data de la cuenta logueada
let errorText = document.getElementById('error-text'); // <p> donde se inserta el texto error
/* DOM: input de contraseña y email para usarlos en el registro*/

let nameSignUp = document.getElementById('enter-name'); // Input nombre en registro
let nickNameSignUp = document.getElementById('enter-nick'); // Input sobrenombre en registro
let errorTxtSignUp = document.getElementById('error-text-sign-up'); // Input texto error en registro
let passwordSignUp = document.getElementById('enter-psw'); // Input contraseña en registro
let passwordVerif = document.getElementById('re-enter-psw');
let emailSignUp = document.getElementById('enter-email'); // Input volver a ingresar email en registro
let errorEmail = document.getElementById('verif-email'); // Input texto error en email
let errorPass = document.getElementById('verif-pass'); // Input texto error en email

/* Funcion de llamada de click de mi boton de inicio de sesión, invoco los values de los input de contraseña e email + mensajes de error
por defecto de Firebase*/

document.getElementById('log-in-btn').addEventListener('click', () => {
  firebase.auth().signInWithEmailAndPassword(emailLogIn.value, passwordLogIn.value).catch(error => {
    console.log('Hola, se está leyendo la función de inicio de sesión ');

    // Handle Errors here.
    const errorCode = error.code;  
    const errorMessage = error.message;
    errorText.innerHTML = 'El email o la contraseña son inválidos.';
  // ...
  });
});

/* Funcion de llamada de click de mi boton de cerrar sesión, mensajes de error
por defecto de Firebase*/

document.getElementById('log-out-btn').addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
    console.log('Hola, se está leyendo la función de salida de cuenta');
  // Sign-out successful.
  }).catch(error => {
  // An error happened.
  });
});

/* Funcion de llamada de click de mi boton de registro, invoco los values de los input de contraseña e email + mensajes de error
por defecto de Firebase*/

const signUp = (email, password) => {
  document.getElementById('sign-up-btn').addEventListener('click', () => {
    logInForm.style.display = 'none';
    logOutForm.style.display = 'none';
    signUpForm.style.display = 'block';
  });

  const registerAcccount = () => {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .catch(error => {
        console.log('Hola, se está leyendo la función de registro');
        // Handle Errors here. 
        const errorCode = error.code;
        const errorMessage = error.message;
        errorPass.innerHTML = 'La contraseña debe tener un mínimo de 6 caracteres';
        // ...
      });
  };
  /* 
then(result => {
    
  const configuracion = {
    url: 'http://127.0.0.1:5500/'
  }

  result.user.sendEmailVerification(configuracion).catch(error => {
      console.log('No se pudo enviar email')
});
firebase.auth().signOut();
}) */

  document.getElementById('send-data-btn').addEventListener('click', () => {
    if (passwordSignUp.value !== passwordVerif.value) {
      errorPass.innerHTML = 'Ambas contraseñas deben coincidir';
    } else if (!emailSignUp.value.includes('@') && !emailSignUp.value.includes('.')) {
      errorEmail.innerHTML = 'Debe ser un correo electrónico válido';
    } else if (emailSignUp.value === '' && passwordSignUp.value === '') {
      errorPass.innerHTML = 'Debes llenar los campos requeridos';
    } else {
      registerAcccount();
    }
  });
};
signUp(emailSignUp, passwordSignUp);
/* Funcion de que oculta o muestra mis secciones dependiendo si mi usuario ha iniciado sesión o ha cerrado sesión,
aún falta completar el registro*/

firebase.auth().onAuthStateChanged(user => {
  console.log('Hola, se está leyendo la función de estado de autenticacion');

  if (user) {
    // User is signed in.
    logInForm.style.display = 'none';
    logOutForm.style.display = 'block';
    signUpForm.style.display = 'none';
    // ...
  } 

  let userSignedIn = firebase.auth().currentUser;

  if (userSignedIn !== null) {
    console.log('Hola, se está leyendo la función envio de datos de usuario');
    name = userSignedIn.displayName;
    let emailWlc = user.email;
    welcomeTxt.innerHTML = 'Usuario ' + emailWlc;
    console.log(emailWlc); 
  } else { 
    logInForm.style.display = 'block';
    logOutForm.style.display = 'none';
    signUpForm.style.display = 'none';
    // User is signed out.
    // ...
  }
});

/* Fin de inicio sesión por email y contraseña y registro - JENI*/

