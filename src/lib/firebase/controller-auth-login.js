export const signInUser = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const loginAuth = (user) => firebase.auth().onAuthStateChanged(user);

export const closeSignIn = () => firebase.auth().signOut();

export const signUpUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const deletePost = (idPost) => firebase.firestore().collection('posts').doc(idPost).delete();

export const addPost = (textNewPost, privacyUser, nameUser, uidUser, likesUser) => firebase.firestore().collection('posts').add({
  name: nameUser,
  content: textNewPost, 
  privacy: privacyUser,
  uid: uidUser,
  likes: likesUser,
  date: firebase.firestore.FieldValue.serverTimestamp()
});

/* Funcion para obtener mis post de mi coleccion */
export const getPosts = (callback) => {
  firebase.firestore().collection('posts').orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
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

/* Funcion para obtener los post privados de mi coleccion */
export const getPrivPosts = (callback) => {
  firebase.firestore().collection('posts')
    .orderBy('date', 'desc')
    .where('privacy', '==', 'Privado').onSnapshot((querySnapshot) => {
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

// Funcion para obtener el displaynName del usuario
export const getUserName = () => firebase.auth().currentUser.displayName;

// Funcion para actualizar los likes del post
export const updateLikePost = (id, countLikes) => {
  console.log(`del post =>${id} se agrega un atributo likes.megusta:'0'`);
  let refLikes = firebase.firestore().collection('posts').doc(id);
  return refLikes.update({
    likes: countLikes
  });
};


// Funcion para saber si un usuario esta registrado
export const isUserSignedIn = () => firebase.auth().currentUser.uid;

// Funcion para obtener y mostrar el nombre del ususario cuando se logee
export const updateProfile = (name, lastName) => {
  let user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: name + ' ' + lastName,
  });
};

// Funcion para editar post
export const editPosts = (idPost, textNewNote) => firebase.firestore().collection('posts').doc(idPost).update({
  content: textNewNote,
});
