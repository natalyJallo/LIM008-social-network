/* Configuracion de proyecto de firebase*/
var config = {
    apiKey: "AIzaSyCNEPJkgbbz-oiIy2ioptcs6_c2ODTY5a4",
    authDomain: "socialnetworking-d3f4e.firebaseapp.com",
    databaseURL: "https://socialnetworking-d3f4e.firebaseio.com",
    projectId: "socialnetworking-d3f4e",
    storageBucket: "socialnetworking-d3f4e.appspot.com",
    messagingSenderId: "378504101194"
  };
  firebase.initializeApp(config);

/* Funcion inicio de sesión con Facebook */
 const  ingresoFacebook = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('public_profile');
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log(user)
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                console.log('Estas usando la misma cuenta');
            }
        });
    };

/* Funcion inicio de sesión con Google */
const ingresoGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log(user);
            }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("google funciona aqui");
            var email = error.email;
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                console.log('Estas usando la misma cuenta');
            }
        });
    };
 
export {ingresoFacebook};
export {ingresoGoogle};