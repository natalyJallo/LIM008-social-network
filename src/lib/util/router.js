import { viewTemplates } from '../ui/templates.js';
// import { isUserSignedIn} from '../firebase/controller-auth-login.js';


const changeTmp = (hash) => {
  // if (isUserSignedIn()) {
  if (hash === '#/' || hash === '' || hash === '#') {
    return viewTemp(hash);
  } else if (hash === '#/home' || hash === '#/signin' || hash === '#/signUp' || hash === '#/welcome') {
    return viewTemp(hash);
  } else {
    return viewTemp('#/signIn');
  }
};

const viewTemp = (routers) => {
  let router = routers.substr(2, routers.length - 2);
  const container = document.getElementById('container');
  const navPost = document.getElementById('navPost');
  container.innerHTML = '';
  navPost.innerHTML = '';
  switch (router) {
  case 'home':
    navPost.appendChild(viewTemplates.home()); 
    break;
  case 'signIn':
    container.appendChild(viewTemplates.signIn());
    break;
  case 'signUp':
    container.appendChild(viewTemplates.signUp());
    break;
  default:
    container.appendChild(viewTemplates.signIn());
    break;
  }
};
  
export const initRouter = () => {
  window.addEventListener('load', changeTmp(window.location.hash));
  if (('onhashchange' in window)) window.onhashchange = () => changeTmp(window.location.hash);
};