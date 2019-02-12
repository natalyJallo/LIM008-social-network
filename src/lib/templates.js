import {closeSessionCall } from './index.js';
import {btnFacebook, btnGoogle, btnSignIn, btnRegister, postSubmit} from './view-controller.js';
import {getPosts, /* getUserData */} from './firebase/controller-firebase.js';

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
    const tmpl = `<div class='login-form' id='sign-up'>
                  <input type='text' id='enter-name' class='enter-data' placeholder='Nombres' required> 
                  <input type='text' id='enter-lastname' class='enter-data' placeholder='Apellidos' required> 
                  <input type='text' id='enter-nick' class='enter-data' placeholder='Alias' required> 
                  <input type='text' id='enter-country' class='enter-data' placeholder='País' required>
                  <input type='email' id='enter-email' class='enter-data' placeholder='Correo electrónico' required> <span id='verif-email'></span>
                  <input type='password' id='enter-psw' class='enter-data' placeholder='Contraseña' required minlength='8'> 
                  <input type='password' id='re-enter-psw' class='enter-data' placeholder='Vuelve a ingresar tu contraseña' required minlength='8'> <span id='verif-pass'></span>
                  <button type='button' id='send-data-btn' class='button-send'> Registrarme</button>
                  <p id='error-text-sign-up'></p>
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
    const tmpl = `<header class='header-page'>
                  <div><img class='img-logo  align top top' src='img/logo.png' alt='logo-feminista'>
                  <input class='menu-bar' type='checkbox' id='menu-bar'>
                  <label class='icon-menu' for='menu-bar'><img src='img/boton-menu.png' alt='icono de menu' class='img-menu  align top'></label>
                  <nav class='menu-nav'>
                    <ul class='menu-ul'>
                      <li class='li-menu'><a class='profile'><img class='img-logo-2 align align top' src='img/usuario-3.png' alt='icono'><h2 class='text-4 margin'>Perfil</h2></a></li>
                      <li class='li-menu2'><a class='items'><img class='img-logo  align top' src='img/historia.png' alt='icono'><h2 class='text-3'>Historias</h2></a></li>
                      <li class='li-menu2'><a class='items'><img class='img-logo  align top' src='img/calendario.png' alt='icono'><h2 class='text-3'>Eventos</h2></a></li>
                      <li class='li-menu2'><a class='items'><img class='img-logo  align top' src='img/grupo.png' alt='icono'><h2 class='text-3'>Grupos</h2></a></li>
                      <li class='li-menu2'><a class='items'><img class='img-logo  align top' src='img/mundo.png' alt='icono'><h2 class='text-3'>Comunidades</h2></a></li>
                      <li class='li-menu2'><a class='items'><img class='img-logo  align top' src='img/ley.png' alt='icono'><h2 class='text-3'>Apoyo Legal</h2></a></li>
                      <li class='li-menu2'><a class='items'><img class='img-logo  align top' src='img/apoyar-3.png' alt='icono'><h2 class='text-3'>Apoyo Psicologico</h2></a></li>
                      <li class='li-menu2'><a class='items' id='log-out-btn'><img class='img-logo  align top' src='img/salir.png' alt='icono'><h2 class='text-3'>Salir</h2></a></li>
                    </ul>
                  </nav><h1 class='text-logo  align top'>JoinClude</h1></div>
                  </header>
                  <div class='log-out-form' id='log-out'>
                  <h1 class='text-3'>Bienvenido</h1>
                  </div>
                  <div class='box-post large'>
                  <textarea class='box-message' name='post-input' id='post-input' cols='50' rows='10'></textarea>
                  <span id='post-error'></span>
                  <select id='privacy-selector' class='select-privacy'>
                    <option value='Público'>Publico</option>
                    <option value='Privado'>Privado</option>
                  </select>
                  <button id='btn-posts' class='btn-post'>Publicar</button>
                </div>
                <ul id='post-container' class='list-posts'></ul>
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
    /*     getUserData((datas) => {
      datas.forEach(data => {
        noteFunction(data);
      });
    }); */
    const btnCloseSession = section.querySelector('#log-out-btn');
    btnCloseSession.addEventListener('click', () => {
      closeSessionCall();
      window.location.hash = '#/signIn';
    });
    return section;
  },
  

};

/* Funcion con el maquetado de mis post - JENI*/

export const noteFunction = (post) => {
  const tmp = `<div class='box-post large2'>
      <div class='box-post-message'>
      <img src='img/usuario-3.png' alt='icono de perfil' class='img-menu align-2'>
      <h2 class='text-5'>${post.name} dice
      <div class='icon-privacy'>Hace un momento ${post.privacy}</div></h2>
      <p class='content-edit'>${post.content}</p>
      </div>
      <div class='count-like'><img src='img/corazon.png' alt='icono de like' class='img-like align'><h2 class='like-word'>Like</h2></div>
      <button class='btn-post btn-edit-delete' id='btn-edit-${post.id}'>Editar</button>
      <button class='btn-post btn-edit-delete' id='btn-deleted-${post.id}'>Eliminar</button></div>`;
  let postList = document.createElement('div');
  postList.setAttribute('id', `id-${post.id}`);
  postList.innerHTML = tmp;

  const btnDeletePost = postList.querySelector(`#btn-deleted-${post.id}`);
  btnDeletePost.addEventListener('click', () => deletePost(post.id));

  return postList;
};