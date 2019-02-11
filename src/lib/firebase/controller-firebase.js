export const signInUser = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const loginAuth = (user) => firebase.auth().onAuthStateChanged(user);

export const closeSignin = () => firebase.auth().signOut();

export const signUpUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

/* Esta es mi funcion de agregar post a mi coleccion posts - JENI */
export const addPost = (textNewNote, privacySelected) => firebase.firestore().collection('posts').add({
  content: textNewNote, 
  privacy: privacySelected,
  uid: firebase.auth().currentUser.uid,
  likes: 0,
});

/* Funcion para obtener mis post de mi coleccion  - JENI*/

export const getPosts = (callback) =>
  firebase.firestore().collection('posts').onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });


// funcion para editar post
export const editPosts = (idPost, textNewNote, privacySelected) => firebase.firestore().collection('posts').doc(idPost).update({
  content: textNewNote, 
  privacy: privacySelected  
}); 

/* Funcion para obtener los datos de mi usuario  - JENI*/


/* export const getUserData = (callback) =>
  firebase.firestore().collection('users').onSnapshot((querySnapshot) => {
    const dataUser = [];
    querySnapshot.forEach((doc) => {
      dataUser.push({ id: doc.id, ...doc.data() });
    });
    callback(dataUser);
  });   */