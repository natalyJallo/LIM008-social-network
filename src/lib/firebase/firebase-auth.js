/* Configuracion de proyecto de firebase*/
export const configFirebase = () => {
  const config = {
    apiKey: 'AIzaSyCNEPJkgbbz-oiIy2ioptcs6_c2ODTY5a4',
    authDomain: 'socialnetworking-d3f4e.firebaseapp.com',
    databaseURL: 'https://socialnetworking-d3f4e.firebaseio.com',
    projectId: 'socialnetworking-d3f4e',
    storageBucket: 'socialnetworking-d3f4e.appspot.com',
    messagingSenderId: '378504101194'
  };
  firebase.initializeApp(config);
};

/* Funcion inicio de sesión con Facebook */
export const ingresoFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile');
  firebase.auth().signInWithPopup(provider).then((result) => {
    const token = result.credential.accessToken;
    const user = result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
    if (errorCode === 'auth/account-exists-with-different-credential') {
      console.log('Estas usando la misma cuenta');
    }
  });
};

/* Funcion inicio de sesión con Google */
export const ingresoGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    const token = result.credential.accessToken;
    const user = result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('google funciona aqui');
    const email = error.email;
    const credential = error.credential;
    if (errorCode === 'auth/account-exists-with-different-credential') {
      console.log('Estas usando la misma cuenta');
    }
  });
};
