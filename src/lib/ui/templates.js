import {closeSessionCall } from '../view-controller/view-controller-auth.js';
import {btnFacebook, btnGoogle, btnSignIn, btnRegister, postSubmit} from '../view-controller/view-controller.js';
import { getPosts } from '../firebase/controller-auth-login.js';
import { noteFunction } from './template-posts.js';

// template de inicio de sesion, registro y pagina principal de la red social
export const viewTemplates = {
  signIn: () => { 
    const tmpl = `<div id='login-form' class='login-form'>
                <img src='img/login5.png' class='img-login'>
                <h2>Login</h2>
                <fieldset>
                <div class='login-user left-addon'>
                <label for='input-email'></label>
                <input type='email' id='input-email' class='input-email' placeholder='email' required></input></div>
                <label for='input-password'>Password</label>
                <input type='password' id='input-password' placeholder='contraseña' minlength='6' required></input>
                </fieldset>
                <span id='error-text'></span>
                <button type='button' id='log-in-btn' class='button-send'> Ingresar</button>
                <button type='button' id='sign-up-btn' class='button-send'> Unirme</button>
                <p id='error-text'></p>
                <button type='button' id='btn-facebook' class='btn-social-net'>
                <button type='button' id='btn-google' class='btn-social-net'>
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

    /* Cuando hago click en publicar me ejecuta la funcion para obtener los datos */
    const btnPost = section.querySelector('#btn-posts');
    btnPost.addEventListener('click', () => {
      postSubmit(section);
    });
    /* CONTAINER de mis posts(ul) */
    const postContainer = section.querySelector('#post-container');    

    getPosts((posts) => {  
      postContainer.innerHTML = '';
      posts.forEach(post => {
        console.log(post);
        postContainer.appendChild(noteFunction(post));
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