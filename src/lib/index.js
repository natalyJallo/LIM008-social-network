import {signInUser, loginAuth, closeSignin, signUpUser, updateProfile} from './firebase/controller-firebase.js';

/* Funcion de inicio de sesion Firebase*/
export const loginCall = (email, password, invalid) => {
  signInUser(email, password).catch(function(error) {
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
        const emailUser = user.email;
        const uid = user.uid;
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
  closeSignin().then(() => {
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


export const addData = (email, password, name, lastName, nickName, country, errorText) => {
  console.log('Entro a addData');
  let uidNumber = firebase.auth().currentUser.uid;
  console.log(uidNumber);
  return firebase.firestore().collection('users').doc(uidNumber).set({
    uid: uidNumber,
    email: email,
    password: password,
    name: name,
    lastName: lastName,
    nickName: nickName,
    country: country
  }).catch(error => {
    errorText.innerHTML = 'Hubo un error en su registro';
    console.error('Error writing document: ', error);    
    console.log('Registro en base de datos no exitoso');
  }).then(result => {
    console.log('Registro en base de datos exitoso');
  });
};

// Funcion de validar si el correo y contraseña se han ingresado bien al iniciar sesion
export const validateloginForm = (email, password) => {
  const regEx = /\S+@\S+\.\S+/;
  if (password !== '' & email !== '') {
    return true;
  } else {
    alert('Por favor ingrese correctamente sus datos');
  } if (regEx.test(email)) {
    return true;
  } if (password.length >= 6) {
    return true;
  }
  return false;
};
