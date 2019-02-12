import {signInUser, loginAuth, closeSignIn, signUpUser, addData, updateProfile} from '../firebase/controller-auth-login.js';

/* Funcion de inicio de sesion Firebase*/
export const loginCall = (email, password, invalid) => {
  signInUser(email, password).catch((error) => {
    const errorCode = error.code;  
    const errorMessage = error.message;
    invalid.innerHTML = errorCode;
    invalid.innerHTML = errorMessage;
  });
};
// para observar los datos del usuario que inició sesión.

export const loginCheckIn = () => {
  loginAuth((user) => {
    if (user) {
      const user = firebase.auth().currentUser;
      if (user !== null) {
        window.location.hash = '#/home';
        console.log('esta registrado');   
      }
    } else {
      console.log('No esta registrado todavia');
    }
  });
};

/* Funcion de cerrar sesion de Firebase*/
export const closeSessionCall = () => {
  closeSignIn().then(() => {
  }).catch((error) => error);
};
/* Funcion de registro de Firebase*/
export const registerAcccount = (email, password, name, lastName, nickName, country, errorText) => {
  signUpUser(email, password)
    .then(result => {
      console.log('registerAccount antes de config');
      const configuration = {
        url: 'http://127.0.0.1:5500/src/'
      };
      console.log('registerAccount antes de addData');
      addData(email, password, name, lastName, nickName, country, errorText);
      updateProfile(name, lastName);
      firebase.auth().signOut();
      result.user.sendEmailVerification(configuration);
    }).catch((error) => {
      console.log('registerAccount fail');
      const errorMessage = error.message;
      errorText.innerHTML = 'Error :' + errorMessage;
    });
};

// Funcion de validar si el correo y contraseña se han ingresado bien al iniciar sesion
export const validateloginForm = (email, password) => {
  const regEx = /\S+@\S+\.\S+/;
  if (password !== '' & email !== '') {
    return true;
  } else {
    alert('Por favor Ingrese sus datos de registro correcto');
  } if (regEx.test(email)) {
    return true;
  } if (password.length >= 6) {
    return true;
  }
  return false;
};

// Funcion para validar de que no se publique un post vacio
export const validationPost = (post, error) => {
  let postValue = post.trim();
  if (postValue === '') {
    const message = 'No puedes publicar algo vacio';
    error.innerHTML = message;
    return false;
  } else {
    return true;
  }
};