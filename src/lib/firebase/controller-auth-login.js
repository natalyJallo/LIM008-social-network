import {postDate} from '../view-controller/view-controller-auth.js';
export const signInUser = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const loginAuth = (user) => firebase.auth().onAuthStateChanged(user);

export const closeSignIn = () => firebase.auth().signOut();

export const signUpUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const deletePost = (idPost) => firebase.firestore().collection('posts').doc(idPost).delete();

export const addPost = (textNewPost, privacyUser, profileUser, nameUser, uidUser, likesUser) => firebase.firestore().collection('posts').add({
  profileUid: profileUser,
  name: nameUser,
  content: textNewPost, 
  privacy: privacyUser,
  uid: uidUser,
  likes: likesUser,
  date: firebase.firestore.FieldValue.serverTimestamp()
});

/* Funcion para obtener mis post de mi coleccion */   
export const getPosts = (callback) => {
  firebase.firestore().collection('posts').onSnapshot((querySnapshot) => {
    let data = [];
    querySnapshot.forEach(doc => {
      data.push({ 
        id: doc.id,
        profileUid: doc.data().profileUid,
        name: doc.data().name,
        content: doc.data().content,
        privacy: doc.data().privacy,
        uid: doc.data().uid,
        likes: doc.data().likes,
      });
    });
    callback(data);
  });
};

export const getUserName = () => firebase.auth().currentUser.displayName;

export const getProfilePicUrl = () => firebase.auth().currentUser.photoURL;

export const updateContent = (id, contentPost) => {
  let refDoc = firebase.firestore().collection('posts').doc(id);
  return refDoc.update({
    content: contentPost
  });
};
export const updateLikePost = (id, countLikes) => {
  console.log(`del post =>${id} se agrega un atributo likes.megusta:'0'`);
  let refLikes = firebase.firestore().collection('post').doc(id);
  return refLikes.update({
    likes: countLikes
  });
};

export const isUserSignedIn = () => firebase.auth().currentUser.uid;

