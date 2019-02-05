export {loginCall};
export {closeSessionCall};
export {registerAcccount};
export {loginCheckIn};

/* Funcion de inicio de sesion Firebase*/
const loginCall = (email, password, error) => {
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  console.log("Hola, se está leyendo la función de inicio de sesión ");
  // Handle Errors here.
  const errorCode = error.code;  
  const errorMessage = error.message;
  // error.innerHTML= "El email o la contraseña son inválidos.";
  alert('Error :' + errorCode);
  alert('Error :' + errorMessage)
  });
};

const loginCheckIn = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      const user = firebase.auth().currentUser;
      console.log(user); 
      if (user !== null) {
        const emailUser = user.email;
        window.location.hash = '#/home'
        console.log('sesion iniciada')
      }
    } else {
      console.log('usuario no registrado')
      // User is signed out.
      // ...
    }
  });
}

/* Funcion de cerrar sesion de Firebase*/
const closeSessionCall = () => {
firebase.auth().signOut().then(function() {
  console.log("Hola, se está leyendo la función de salida de cuenta");
    }).catch(function(error) {
  });
};

/* Funcion de registro de Firebase*/
const registerAcccount = (email, password, name) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(result => {
    const configuracion = {
      url: 'http://127.0.0.1:5500/src/'
    }
    result.user.sendEmailVerification(configuracion).catch(function(error) {
      console.log('No se pudo enviar email')
    });
    firebase.auth().signOut()
  }).catch(function(error) {
  console.log("Hola, se está leyendo la función de registro");
  // Handle Errors here. 
  const errorCode = error.code;
  const errorMessage = error.message;
  // errorPass.innerHTML= "La contraseña debe tener un mínimo de 6 caracteres"
  alert('Error :' + errorCode);
  alert('Error :' + errorMessage);
  // ...
  });
};

// Funcion para validar correo y contraseña.
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