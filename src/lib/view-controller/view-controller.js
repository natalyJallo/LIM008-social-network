import { ingresoFacebook, ingresoGoogle} from '../firebase/controller-auth-apis.js';
import {loginCall, loginCheckIn, registerAcccount, validateloginForm, validationPost} from './view-controller-auth.js';
import {addPost, isUserSignedIn, getUserName, getProfilePicUrl, updateContent, updateLikePost } from '../firebase/controller-auth-login.js';

export const btnGoogle = () => {
  ingresoGoogle();
  loginCheckIn();
};
export const btnFacebook = () => {
  ingresoFacebook();
  loginCheckIn();
};

/* Inicio de sesión por email y contraseña y registro*/
export const btnSignIn = (elemt) => {
  const emailLogIn = elemt.querySelector('#input-email').value;
  console.log(emailLogIn); // Input email de inicio de sesión
  const passwordLogIn = elemt.querySelector('#input-password').value; // Input contraseña de inicio de sesión
  const errorText = elemt.querySelector('#error-text');
  if (validateloginForm(emailLogIn, passwordLogIn, errorText) === true) {
    loginCall(emailLogIn, passwordLogIn, errorText);
    loginCheckIn();
  };
};

export const btnRegister = (element) => {
  let nameSignUp = element.querySelector('#enter-name').value; // Input nombre en registro
  let lastNameSignUp = element.querySelector('#enter-lastname').value;
  let nickNameSignUp = element.querySelector('#enter-nick').value; // Input sobrenombre en registro
  let countrySignUp = element.querySelector('#enter-country').value;
  let emailSignUp = element.querySelector('#enter-email').value; // Input volver a ingresar email en registro
  let passwordSignUp = element.querySelector('#enter-psw').value; // Input contraseña en registro
  let passwordVerif = element.querySelector('#re-enter-psw').value;
  if (registerAcccount(emailSignUp, passwordVerif, nameSignUp, lastNameSignUp, nickNameSignUp, countrySignUp)) {}
  window.location.hash = '#/session';
};

/* Aqui obtengo el txto publicado y la privacidad selecionada -JENI */
export const postSubmit = (element) => {
  let content = element.querySelector('#post-input');
  let privacy = element.querySelector('#privacy-selector');
  let validation = element.querySelector('#post-error');
  let countLike = 0;
  if (validationPost(content.value, validation) === true) {
    const uidUser = isUserSignedIn();
    const data = {
      message: '',
      timeout: 2000,
      actionText: 'Undo'
    };
    const name = getUserName();
    const image = getProfilePicUrl();
    addPost(content.value, privacy.value, image, name, uidUser, countLike)
      .then(() => {
        content.value = '';
        data.message = 'Post agregado';
        console.log('Post agregado');
      }).catch(() => {
        content.value = '';
        data.message = 'Post no agregado';
        console.log('Post no agregado');
      });
  }
};

export const updatePostOnClick = (post, messageUpdate) => {
  return updateContent(post.id, messageUpdate);
};

export const updateLikeCount = (post, like) => {
  return updateLikePost(post.id, like);
};