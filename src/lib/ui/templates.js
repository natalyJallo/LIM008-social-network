import {closeSessionCall } from '../view-controller/view-controller-auth.js';
import {btnFacebook, btnGoogle, btnSignIn, btnRegister, postSubmit} from '../view-controller/view-controller.js';
import { getPosts, isUserSignedIn } from '../firebase/controller-auth-login.js';
import {postFunction} from '../ui/template-posts.js';

// template de inicio de sesion, registro y pagina principal de la red social
export const viewTemplates = {
  signIn: () => { 
    const tmpl = `<div id='login-form' class='login-form'>
                <img src='img/sim.png' class='img-login'>
                <h1 class='text-logo style-logo'>JoinClude</h1>
                <h3 class='style-login top'>LOGIN</h3>
                <fieldset>
                <div class='login-user'>
                <label for='input-email'><img src='img/usuario2.png' class='img-user login-user'></label>
                <input type='email' id='input-email' class='input-email' placeholder='email' required></input>
                <span id='error-email'></span>
                <label for='input-password'><img src='img/bloquear-1.png' class='img-user login-user'></label>
                <input type='password' id='input-password'class='input-email' placeholder='contraseña' minlength='6' required></input>
                <span id='error-password'></span>
                </fieldset>
                <h3 id='error-text' class='message-error'></h3>
                <div class='btn-center'><button type='button' id='log-in-btn' class='btn-color singIn'>Ingresar</button></div>
                <h4 class='text-register'>O ingresa con :</h4>
                <button type='button' id='btn-facebook' class='btn-social-net'></button>
                <button type='button' id='btn-google' class='btn-social-net'></button>
                <h4 class='text-register'>Si no estas registrado,<br><span id='sign-up-btn' class='style-rgtr'>unete.</span></h4>
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
                <h3 class='style-login style-register'>REGISTRATE</h3>
                <i class='label-form'><img src='img/usuario2.png' class='img-icon login-user'></i>
                <input type='text' id='enter-name' class='enter-data' placeholder='Nombres' required> 
                <i class='label-form'><img src='img/usuario2.png' class='img-icon login-user'></i>
                <input type='text' id='enter-lastname' class='enter-data' placeholder='Apellidos' required> 
                <i class='label-form'><img src='img/espia.png' class='img-icon login-user'></i>
                <input type='text' id='enter-nick' class='enter-data' placeholder='Alias' required> 
                <i class='label-form'><img src='img/mundo1.png' class='img-icon login-user'></i>
                <input type='text' id='enter-country' class='enter-data' placeholder='País' required>
                <i class='label-form'><img src='img/arroba1.png' class='img-icon login-user'></i>
                <input type='email' id='enter-email' class='enter-data' placeholder='Correo electrónico' required><span id='verif-email'></span>
                <i class='label-form'><img src='img/keys.png' class='img-icon login-user'></i>
                <input type='password' id='enter-psw' class='enter-data' placeholder='Contraseña' required minlength='8'> 
                <i class='label-form'><img src='img/keys.png' class='img-icon login-user'></i>
                <input type='password' id='re-enter-psw' class='enter-data' placeholder='Vuelve a ingresar tu contraseña' required minlength='8'> <span id='verif-pass'></span>
                <div class='btn-center'><button type='button' id='send-data-btn' class='btn-color singIn top'> Registrarme</button></div>
                <p id='error-text-sign-up' class='error-text-sign-up'></p>
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
  
  home: () => {
    const tmpl = `<header class='header-page'>
                  <div><img class='img-logo  align top' src='img/logo.png' alt='logo-feminista'>
                  <input class='menu-bar' type='checkbox' id='menu-bar'>
                  <label class='icon-menu' for='menu-bar'><img src='img/boton-menu.png' alt='icono de menu' class='img-menu  align top'></label>
                  <nav class='menu-nav'>
                    <ul class='menu-ul'>
                      <li class='li-menu'><a class='profile'><img class='img-logo-2 align top' src='img/usuario-3.png' alt='icono'><h2 class='text-4 margin'>Perfil</h2></a></li>
                      <li class='li-menu2'><a class='items'><img class='img-logo  align top' src='img/historia.png' alt='icono'><h2 class='text-3'>Historias</h2></a></li>
                      <li class='li-menu2'><a class='items'><img class='img-logo  align top' src='img/calendario.png' alt='icono'><h2 class='text-3'>Eventos</h2></a></li>
                      <li class='li-menu2'><a class='items'><img class='img-logo  align top' src='img/grupo.png' alt='icono'><h2 class='text-3'>Grupos</h2></a></li>
                      <li class='li-menu2'><a class='items'><img class='img-logo  align top' src='img/mundo.png' alt='icono'><h2 class='text-3'>Comunidades</h2></a></li>
                      <li class='li-menu2'><a class='items'><img class='img-logo  align top' src='img/ley.png' alt='icono'><h2 class='text-3'>Apoyo Legal</h2></a></li>
                      <li class='li-menu2'><a class='items'><img class='img-logo  align top' src='img/apoyar-3.png' alt='icono'><h2 class='text-3'>Apoyo Psicologico</h2></a></li>
                      <li class='li-menu2'><a class='items' id='log-out-btn'><img class='img-logo  align top' src='img/salir.png' alt='icono'><h2 class='text-3'>Salir</h2></a></li>
                    </ul>
                  </nav><h1 class='text-logo  align text-logo-header'>JoinClude</h1></div>
                  </header>
                  <div class='' id='log-out'>
                  <h1 class='text-3 text-welcome'>Bienvenido :</h1>
                  </div>
                  <div class='box-post large'>
                  <textarea class='box-message' name='post-input' id='post-input' cols='50' rows='10' placeholder = "Agrega un post" required></textarea>
                  <h3 id='post-error' class='message-error msg-post'></h3>
                  <select id='privacy-selector' class='select-privacy'>
                    <option value='Público'>Publico</option>
                    <option value='Privado'>Privado</option>
                  </select>
                  <button id='btn-posts' class='btn-post btn-color'>Publicar</button>
                </div>
                <ul id='post-container' class='list-posts'></ul>
                `;
    const section = document.createElement('header');
    section.innerHTML = tmpl;

    /* Cuando hago click en publicar me ejecuta la funcion para obtener los datos */
    const btnPost = section.querySelector('#btn-posts');
    btnPost.addEventListener('click', () => {
      postSubmit(section);
    });

    const postContainer = section.querySelector('#post-container');    

    getPosts((posts) => {  
      postContainer.innerHTML = '';
      posts.forEach(post => {
        const uid = isUserSignedIn();
        postContainer.appendChild(postFunction(post, uid));
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