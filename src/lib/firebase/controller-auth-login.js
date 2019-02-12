export const signInUser = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const loginAuth = (user) => firebase.auth().onAuthStateChanged(user);

export const closeSignIn = () => firebase.auth().signOut();

export const signUpUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const deletePost = (idPost) => firebase.firestore().collection('posts').doc(idPost).delete();

/* Esta es mi funcion de agregar post a mi coleccion posts - JENI */
export const addPost = (textNewNote, privacySelected) => firebase.firestore().collection('posts').add({
  content: textNewNote, 
  privacy: privacySelected,
  name: firebase.auth().currentUser.displayName,
  uid: firebase.auth().currentUser.uid,
  likes: 0,
});

/* Funcion para obtener mis post de mi coleccion */
export const getPosts = (callback) =>
  firebase.firestore().collection('posts').onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
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

/* Funcion para obtener los datos de mi usuario  - JENI*/
/* export const getUserData = (callback) =>
  firebase.firestore().collection('users').doc('PXChJPo8OofUtbzScUlMRtT9jc42').onSnapshot((querySnapshot) => {
    const dataUser = [];
    dataUser.push({...querySnapshot.data()});
    console.log(dataUser);
    callback(dataUser);
  });  */ 