import {logInFacebook, logInGoogle} from '../firebase/firebase.js';
import {logInClick} from './controller.js';

const container = document.createElement('form');

export const loginFunction = {
  signIn: () => {
    container.innerHTML = `
          <img src="img/login5.png" class="img-login">
          <h2>Login</h2>
          <fieldset>
            <label for='input-email'>Email</label>
            <input type="email" id="input-email" placeholder="email" required></input>
            <label for='input-password'>Password</label>
            <input type="password" id="input-password" placeholder="contraseña" minlength="6" required></input>
          </fieldset>
          <a id="log-in-btn" class="button-send" href="#/profile"> Ingresar</a>
          <a id="sign-up-btn" class="button-send" href="#/signup" >Unirme</a>
          <p id="error-text"></p>
          <div>
            <button type="button" id="btn-facebook" class="btn-social-net">
            <button type="button" id="btn-google" class="btn-social-net">
          </div>`;

    container.setAttribute('id', 'login-form'); 
    container.setAttribute('class', 'login-form');

    container
      .querySelector('#btn-facebook')
      .addEventListener('click', () => {
        logInFacebook(); 
      });

    container
      .querySelector('#btn-google')
      .addEventListener('click', () => {
        logInGoogle();
      });

    container
      .querySelector('#log-in-btn')
      .addEventListener('click', () => {
        logInClick();

      });

    const abc = document.getElementById('container');
    abc.appendChild(container);
    
    return container;
  },
    
  /* Formulario de registro  JENI*/
  signUp: () => {
    container.innerHTML = `<div class="login-form" id="sign-up">
      <input type="text" id="enter-name" class="enter-data" placeholder="Nombres" required>
      <input type="text" id="enter-lastname" class="enter-data" placeholder="Apellidos" required>
      <input type="text" id="enter-nick" class="enter-data" placeholder="Alias" required>
      <input type="text" id="enter-country" class="enter-data" placeholder="País" required>
      <input type="email" id="enter-email" class="enter-data" placeholder="Correo electrónico" required> <span id="verif-email"></span>
      <input type="password" id="enter-psw" class="enter-data" placeholder="Contraseña" required minlength="8">
      <input type="password" id="re-enter-psw" class="enter-data" placeholder="Vuelve a ingresar tu contraseña" required
        minlength="8"> <span id="verif-pass"></span>
      <button type="button" id="send-data-btn" class="button-send"> Registrarme</button>
      <p id="error-text-sign-up"></p>
    </div>`;
    return container;
  },
    
  /*   Seccion de mensaje de bienvenida al usuario + log out JENI*/    
  profile: () => {
    container.innerHTML = `<div class="log-out-form" id="log-out">
      <h1> Bienvenido</h1>
      <p id="welcome-text"></p>
      <a id="log-out-btn" class="button-send"  href="/src"> Salir de mi Cuenta</a>
    </div>`;
    return container;
  },
    
  different: () => {
    container.innerHTML = `<div id="message">
        <h2>404</h2>
        <h1>Página no encontrada</h1>
        <p>El archivo especificado no se encontró en este sitio web. Por favor, compruebe 
        la URL para errores y vuelva a intentarlo.</p>
      </div>`;
    return container;
  },
};
    