import {signInUser, loginAuth, closeSignIn, signUpUser, updateProfile} from './firebase/controller-firebase.js';

/* Funcion de inicio de sesion Firebase*/
export const loginCall = (email, password) => {
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
export const validateloginForm = (email, password, error) => {
  const regEx = /\S+@\S+\.\S+/;
  if (password !== '' & email !== '') {
    if (regEx.test(email)) {
      if (password.length >= 6) {
        return true;
      } else {
        error.innerHTML = 'Contraseña mayor a 6 caracteres';
        return false;
      }
    } else {
      error.innerHTML = 'Ingrese su email correcto';
      return false;
    };
  } else {
    error.innerHTML = 'Ingrese un email y un password';
    return false;
  };
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

export const postDate = (date) => {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  let year = date.getFullYear();
    
    
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
    
  return [day, month, year].join('/');
};


