import {closeSessionCall } from './index.js';
import {btnFacebook, btnGoogle, btnSignIn, btnRegister, postSubmit} from './view-controller.js';
import {getPosts, getUserData} from './firebase/controller-firebase.js';

export const viewTemplates = {
  signIn: () => { 
    const tmpl = `<div id="login-form" class="login-form">
                <img src="img/login5.png" class="img-login">
                <h2>Login</h2>
                <fieldset>
                <div class='login-user left-addon'>
                <label for='input-email'></label>
                <input type="email" id="input-email" class='input-email' placeholder="email" required></input></div>
                <label for='input-password'>Password</label>
                <input type="password" id="input-password" placeholder="contraseña" minlength="6" required></input>
                </fieldset>
                <button type="button" id="log-in-btn" class="button-send"> Ingresar</button>
                <button type="button" id="sign-up-btn" class="button-send"> Unirme</button>
                <p id="error-text"></p>
                <button type="button" id="btn-facebook" class="btn-social-net">
                <button type="button" id="btn-google" class="btn-social-net">
                </div>`;
    const element = document.createElement('form');
    element.innerHTML = tmpl;

    const btn = element.querySelector('#log-in-btn');
    btn.addEventListener('click', () => {
      btnSignIn(element);
    });

    const btnLoginGoogle = element.querySelector('#btn-google');
    btnLoginGoogle.addEventListener('click', () => {
      btnGoogle();
    });
                 
    const btnLoginFacebook = element.querySelector('#btn-facebook');
    btnLoginFacebook.addEventListener('click', () => {
      btnFacebook();
    });
    const btnSignupLogin = element.querySelector('#sign-up-btn');
    btnSignupLogin.addEventListener('click', () => {
      window.location.hash = '#/signUp';
    });
    return element;
  },

  signUp: () => {
    const tmpl = `<div class="login-form" id="sign-up">
                <input type="text" id="enter-name" class="enter-data" placeholder="Nombres" required> 
                <input type="text" id="enter-lastname" class="enter-data" placeholder="Apellidos" required> 
                <input type="text" id="enter-nick" class="enter-data" placeholder="Alias" required> 
                <input type="text" id="enter-country" class="enter-data" placeholder="País" required>
                <input type="email" id="enter-email" class="enter-data" placeholder="Correo electrónico" required> <span id="verif-email"></span>
                <input type="password" id="enter-psw" class="enter-data" placeholder="Contraseña" required minlength="8"> 
                <input type="password" id="re-enter-psw" class="enter-data" placeholder="Vuelve a ingresar tu contraseña" required minlength="8"> <span id="verif-pass"></span>
                <button type="button" id="send-data-btn" class="button-send"> Registrarme</button>
                <p id="error-text-sign-up"></p>
                </div>`;
    const element2 = document.createElement('form');
    element2.setAttribute('class', 'form-signUp');
    element2.innerHTML = tmpl;

    const btnSendData = element2.querySelector('#send-data-btn');
    btnSendData.addEventListener('click', () => {
      btnRegister(element2);
      window.location.hash = '#/signIn';
    });
    return element2;
  },

  home: (posts) => {
    const tmpl = `<div class="log-out-form" id="log-out">
                  <h1> Bienvenido</h1>
                  <button id="log-out-btn" class="button-send">Salir</button>
                  </div>
                  <div>
                  <textarea class="box-post" name="post-input" id="post-input" cols="50" rows="10"></textarea>
                  <select id='privacy-selector'>
                    <option value="Público">Publico</option>
                    <option value="Amigos">Amigos</option>
                  </select>
                  <button id="btn-posts" class="btn-post">Publicar</button>
                </div>
                <ul id= "post-container"> </ul>
                `;
    const section = document.createElement('section');
    section.innerHTML = tmpl;

    /* Cuando hago click en publicar me ejecuta la funcion para obtener los datos- jeni */
    const btnPost = section.querySelector('#btn-posts');
    btnPost.addEventListener('click', () => {
      postSubmit(section);
    });
    /* CONTAINER de mis posts(ul) - JENI*/
    const postContainer = section.querySelector('#post-container');    

    getPosts((posts) => {  
      postContainer.innerHTML = '';
      posts.forEach(post => {
        /* Aplico un forEach para añadir cada post  a mi ul aplicando la
         funcion de templates notefunction */
        postContainer.appendChild(noteFunction(post));
      });
    });
    /* Funcion para obtener el nombre del usuario y colocarlo en mis posts - JENI*/
    getUserData((datas) => {
      datas.forEach(data => {
        console.log(data.name);      
      });
    });
    
    const btnCloseSession = section.querySelector('#log-out-btn');
    btnCloseSession.addEventListener('click', () => {
      closeSessionCall();
      window.location.hash = '#/signIn';
    });

    return section;
  },
  

};

/* Funcion con el maquetado de mis post - JENI*/

const noteFunction = (post) => {
  const tmp = `
  <p> ${post.name} dice </p>
    <span> ${post.content} </span>
    <span> ${post.privacy} </span>
    <button class="" id="btn-edit-${post.id}">
      Editar </button>
    <button class="" id="btn-deleted-${post.id}">
      Eliminar </button>`;
  let postList = document.createElement('div');
  postList.innerHTML = tmp;
  return postList;
};