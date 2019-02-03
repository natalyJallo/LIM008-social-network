/*   Funcion inicio de sesión con Facebook  MICA*/


export const logInFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile');
  firebase.auth().signInWithPopup(provider).then(result => {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const token = result.credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch(error => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    if (errorCode === 'auth/account-exists-with-different-credential') {
      console.log('Estas usando la misma cuenta');
    }
    // ...
  });
};

/*   Funcion inicio de sesión con Google  NATY*/

export const logInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(result => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
  }).catch(error => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    if (errorCode === 'auth/account-exists-with-different-credential') {
      console.log('Estas usando la misma cuenta');
    }
  });
};

/* Funcion de llamada de click de mi boton de inicio de sesión, invoco los values de los input de contraseña e email + mensajes de error
por defecto de Firebase*/

export const logInEmail = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
    const errorCode = error.code;  
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
};

 