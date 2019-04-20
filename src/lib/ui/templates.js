import {closeSessionCall } from '../view-controller/view-controller-auth.js';
import {btnFacebook, btnGoogle, btnSignIn, btnRegister, postSubmit} from '../view-controller/view-controller.js';
import {getPosts, isUserSignedIn, getPrivPosts} from '../firebase/controller-auth-login.js';
import {postFunction} from '../ui/template-post.js';

// template de inicio de sesion, registro y pagina principal de la red social
export const viewTemplates = {
  welcome: () => {
    const tmpl = `<div class="section-welcome row">
                    <div class="col-lg-7 col-md-7 img-women-2 col-sm-12 col-xl-7">
                        <img src="../src/img/mujer5.jpg" alt="fondo de una mujer" class="img-women">
                    </div>
                    <div class="col-lg-5 col-md-5 background-image col-sm-12 col-xl-5">
                        <div class="logo-style col-sm-10" >
                            <img src="../src/img/logo2.png" alt="fondo rosado" class="img-logo-welcome" >
                            <h1 class="text-logo-welcome">JOINCLUDE</h1></div>
                        <div class="content-text col-sm-10 col-xl-10">
                            <h2 class="text-7 col-sm-10 col-xl-10" >Una RED SOCIAL para mujeres donde podrá compartir 
                            ideas, historias relacionadas al feminismo para 
                            llegar a ser una comunidad fuerte que genere impacto 
                            social en el mundo.</h2>
                            <div class="text-7 col-sm-10 col-xl-10 center" >
                            <button type='button' id='btn-signin-welcome' class='btn-color btn-welcome '>Iniciar Sesion</button>
                            <button type='button' id='btn-signup-welcome' class='btn-color btn-welcome '>Registrate</button>
                            </div>
                        </div>
                    </div>
                </div>`;
    const element = document.createElement('div');
    element.innerHTML = tmpl;

    const btnSignWelcome = element.querySelector('#btn-signin-welcome');
    btnSignWelcome.addEventListener('click', () => {
      window.location.hash = '#/signIn';
    });

    const btnSignupWelcome = element.querySelector('#btn-signup-welcome');
    btnSignupWelcome.addEventListener('click', () => {
      window.location.hash = '#/signUp';
    });
    return element;
  },
  signIn: () => { 
    const tmpl = `<div id='login-form' class='form-network'>
                <div class='login-form space'>
                <img src='img/logo2.png' class='img-login'>
                <h1 class='text-logo style-logo'>JoinClude</h1>
                <h3 class='style-login top'>LOGIN</h3>
                <div class='field'>
                <div class='login-user'>
                <label for='input-email'><img src='img/usuario2.png' class='img-user login-user'></label>
                <input type='email' id='input-email' class='input-email' placeholder='email' required></input>
                <span id='error-email'></span>
                <label for='input-password'><img src='img/bloquear-1.png' class='img-user login-user'></label>
                <input type='password' id='input-password'class='input-email' placeholder='contraseña' minlength='6' required></input>
                <span id='error-password'></span>
                </div>
                <h3 id='error-text' class='message-error'></h3>
                <div class='btn-center'><button type='button' id='log-in-btn' class='btn-color singIn'>Ingresar</button></div>
                <h4 class='text-register'>O ingresa con :</h4>
                <button type='button' id='btn-facebook' class='btn-social-net'></button>
                <button type='button' id='btn-google' class='btn-social-net'></button>
                <h4 class='text-register'>Si no estas registrado,<br><span id='sign-up-btn' class='style-rgtr'>unete.</span></h4>
                </div></div>`;
    const element = document.createElement('div');
    element.setAttribute('class', 'background-image hight');
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
    const tmpl = `<div class='login-form form-signUp' id='sign-up'>
                <h3 class='style-login'>REGISTRATE</h3>
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
    const element2 = document.createElement('div');
    element2.setAttribute('class', 'form-signUp background-image hight-2');
    element2.innerHTML = tmpl;
                
    const btnSendData = element2.querySelector('#send-data-btn');
    btnSendData.addEventListener('click', () => {
      btnRegister(element2);
      window.location.hash = '#/signIn';
    });
    return element2;
  },
  
  home: () => {
    const tmpl = `
    <header class='header-page'>
        <div>
            <div class='logo-page'><img class='img-logo top' src='img/logo.png' alt='logo-feminista'>
                <h1 class='text-logo  align text-logo-header space2'>JoinClude</h1>
            </div>
        <div class="dropdown nav nav-float ">
            <button class="btn dropdown-toggle btn-color text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Cuenta de Usuario
            </button>
         <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li id="public-stories" ><a class="dropdown-item" id=""  href="">Posts</a></li>
            <li id="my-stories"><a class="dropdown-item" href="">Posts</a></li>
            <li id="log-out-btn"><a class="dropdown-item" href="">Cerrar Sesion</a></li>
         </div>
        </div>
    </header>
    <div class='' id='log-out'>
        <h1 class='text-3 text-welcome'></h1>
    </div>
    <div class='model-post col-8'>
        <div class='box-post large3'>
            <textarea class='box-message' name='post-input' id='post-input' cols='50' rows='10' placeholder = "Agrega un post" required></textarea>
            <h3 id='post-error' class='message-error msg-post'></h3>
            <div class="public">
                <select id='privacy-selector' class='select-privacy'>
                    <option value='Público'>Publico</option>
                    <option value='Privado'>Privado</option>
                </select>
                <button id='btn-posts' class='btn-post btn-color'>Publicar</button></div>
            </div>
        </div>
    <ul id='post-container' class='list-posts'></ul>

  `;
    const section = document.createElement('div');
    section.setAttribute('class', 'home');
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
    
    const publicPostBtn = section.querySelector('#public-stories');
    publicPostBtn.addEventListener('click', () => {
      document.location.reload();      
      window.location.hash = '#/home';
    });

    const privPostBtn = section.querySelector('#my-stories');        
    privPostBtn.addEventListener('click', () => {
      console.log('hola');
      
      getPrivPosts((posts) => {  
        console.log(posts);
        
        postContainer.innerHTML = '';
        posts.forEach(post => {
          console.log(post);

          const uid = isUserSignedIn();
          postContainer.appendChild(postFunction(post, uid));
        });
      });
    });
     
    const btnCloseSession = section.querySelector('#log-out-btn');
    btnCloseSession.addEventListener('click', () => {
      closeSessionCall();
      window.location.hash = '#/signIn';
    });
            
    return section;
  }
};