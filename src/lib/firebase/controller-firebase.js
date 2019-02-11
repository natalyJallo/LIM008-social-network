export const signInUser = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const loginAuth = (user) => firebase.auth().onAuthStateChanged(user);

export const closeSignin = () => firebase.auth().signOut();

export const signUpUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

/* Esta es mi funcion de agregar post a mi coleccion posts - JENI */
export const addPost = (textNewNote, privacySelected) => firebase.firestore().collection('posts').add({
  content: textNewNote, 
  privacy: privacySelected,
  name: firebase.auth().currentUser.displayName,
  uid: firebase.auth().currentUser.uid,
  likes: 0,
});

/* Funcion para obtener mis post de mi coleccion  - JENI*/

export const getPosts = (callback) =>
  firebase.firestore().collection('posts').onSnapshot((querySnapshot) => {
    console.log(querySnapshot);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });

/* Funcion para obtener los datos de mi usuario  - JENI*/
export const getUserData = (callback) =>
  firebase.firestore().collection('users').doc('PXChJPo8OofUtbzScUlMRtT9jc42').onSnapshot((querySnapshot) => {
    const dataUser = [];
    dataUser.push({...querySnapshot.data()});
    console.log(dataUser);
    callback(dataUser);
  });  

export const updateProfile = (name, lastName) => {
  let user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: name + ' ' + lastName,
  }).then(() => {
    console.log('Se Actualizo de manera exitosa');
  }).catch(error => {
    console.log(error);
  });
}

  