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