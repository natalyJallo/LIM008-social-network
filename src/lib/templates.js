import { closeSessionCall } from './index.js'
import { btnFacebook, btnGoogle, btnSignIn, btnRegister, showPost } from './view-controller.js';

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
                <button type='button' id='log-in-btn' class='button-send'> Ingresar</button>
                <button type='button' id='sign-up-btn' class='button-send'> Unirme</button>
                <p id='error-text'></p>
                <button type='button' id='btn-facebook' class='btn-social-net'>
                <button type='button' id='btn-google' class='btn-social-net'>
                </div>`
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
                </div>`
    const element2 = document.createElement('form');
    element2.innerHTML = tmpl;

    const btnSendData = element2.querySelector('#send-data-btn');
    btnSendData.addEventListener('click', () => {
      btnRegister(element2);
      window.location.hash = '#/signIn';
    });
    return element2;
  },
  home: () => {
    const tmpl = `<div class='home' id='log-out'>
            <h1> Bienvenido</h1>
            <p id='welcome-text'>Posts: </p>
            <button id='log-out-btn' class='button-send'>Salir</button>
            <div>
            <textarea id='text-post'class='box-post' name='' id='' cols='30' rows='10'></textarea>
            <button id='btn-posts' class='btn-post'>Publicar</button>
            </div>
            <div id=''>
            </div>
            </div>`;
    const section = document.createElement('section');
    section.innerHTML = tmpl;
    const btnCloseSession = section.querySelector('#log-out-btn');
    btnCloseSession.addEventListener('click', () => {
      closeSessionCall();
      window.location.hash = '#/signIn';
    });

    const btnPost = section.querySelector('#btn-posts');
    btnPost.addEventListener('click', () => {
      showPost();
      const templPost = `<div>
                <textarea id='text-post'class='box-post' name='' id='' cols='30' rows='10'></textarea>
                <button id='btn-posts' class='btn-post'>Publicar</button>
                </div>`
      const boxPost = section.querySelector('btn-posts');
      section.innerHTML = '';
      boxPost.appendChild(viewTemplates[router]());
    });
    return section;
  },
  different: () => {
    const tmpl = `<div class='' id='page-not-found'>
        <h1> Pagina no encontrada</h1>
        <p id=''>404</p>
        </div>`;
    const element3 = document.createElement('div');
    element3.innerHTML = tmpl;
    return element3;
 }
};