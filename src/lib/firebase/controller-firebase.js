export const signInUser = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const loginAuth = (user) => firebase.auth().onAuthStateChanged(user);

export const closeSignIn = () => firebase.auth().signOut();

export const signUpUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const addPost = (textNewPost, privacyUser, likeCount) =>
  firebase.firestore().collection('posts').add({
    id: user.uid,
    name: user.displayName,
    message: textNewPost,
    privacy: privacyUser,
    state: false,
    date: new Date(),
    likeCount: 0
  });

export const deletePost = (idPost) => firebase.firestore().collection('posts').doc(idPost).delete();

export const getPost = (callback) =>
  firebase.firestore().collection('posts')
    .onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      callback(data);
    }); 