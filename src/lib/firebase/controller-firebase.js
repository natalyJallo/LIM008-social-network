export const signInUser = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const loginAuth = (user) => firebase.auth().onAuthStateChanged(user);

export const closeSignin = () => firebase.auth().signOut();

export const signUpUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

