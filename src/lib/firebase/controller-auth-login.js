export const signInUser = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const loginAuth = (user) => firebase.auth().onAuthStateChanged(user);

export const closeSignIn = () => firebase.auth().signOut();

export const signUpUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const deletePost = (idPost) => firebase.firestore().collection('posts').doc(idPost).delete();

export const addPost = (textNewNote, privacySelected) => firebase.firestore().collection('posts').add({
  content: textNewNote, 
  privacy: privacySelected,
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

// funcion para editar post
export const editPosts = (idPost, textNewNote, privacySelected) => firebase.firestore().collection('posts').doc(idPost).update({
  content: textNewNote, 
  privacy: privacySelected  
}); 

/* funcion para editar post
export const editPosts = (idPost, textNewNote, privacySelected) => firebase.firestore().collection('posts').doc(idPost).get()
.then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    console.log(doc.id, '=>', doc.data());
    // Build doc ref from doc.id
    firebase.firestore().collection('posts').doc(doc.id).update({
      content: textNewNote, 
      privacy: privacySelected });
  });
});*/