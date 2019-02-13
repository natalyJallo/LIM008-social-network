import {signInUser, loginAuth, closeSignIn, signUpUser, updateProfile} from '../firebase/controller-auth-login.js';


/* Funcion de inicio de sesion Firebase*/
export const loginCall = (email, password, error) => {
  signInUser(email, password).catch((error) => {
    const errorCode = error.code;  
    const errorMessage = error.message;
    error.innerHTML = 'El email o la contraseña son inválidos.';
    // console.log(invalid);
  });
};

// para observar los datos del usuario que inició sesión.
export const loginCheckIn = (error) => {
  loginAuth(() => {
    const user = firebase.auth().currentUser;
    const messageUserNoRegister = error;
    if (user !== null) {
      const emailUser = user.email;
      window.location.hash = '#/home';
    } else {
      messageUserNoRegister.innerHTML = 'No esta registrado todavia';
    }
  });
};

/* Funcion de cerrar sesion de Firebase*/
export const closeSessionCall = () => {
  closeSignIn().then(() => {
  }).catch((error) => error);
};

/* Funcion de registro de Firebase*/
export const registerAcccount = (email, password, name, lastName, nickName, country) => {
  signUpUser(email, password)
    .then(result => {
      const configuracion = {
        url: 'http://127.0.0.1:5500/src/'
      };
      result.user.sendEmailVerification(configuracion);
      updateProfile(name, lastName);
      firebase.auth().signOut();
    }).catch((error) => {
      const errorMessage = error.message;
      // errorPass.innerHTML= 'La contraseña debe tener un mínimo de 6 caracteres'
      alert('Error :' + errorMessage);
    });
  const firestore = firebase.firestore();
  let emailUser = email;
  let passwordUser = password;
  let nameUser = name;
  let lastNameUser = lastName;
  let nickNameUser = nickName;
  let countryUser = country;
  let data = {};
  let users = firestore.collection('users');
  users.add(data = {
    email: emailUser,
    password: passwordUser,
    name: nameUser,
    lastName: lastNameUser,
    nickName: nickNameUser,
    country: countryUser,
  }).then(function(result) {
    console.log('Document written with ID: ', result.id);
  }).catch((error) => {
    console.log('no se agrego a base de datos');
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


