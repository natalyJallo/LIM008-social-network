import { viewTemplates } from './templates.js';

const changeTmp = (hash) => {
  if (hash === '#/' || hash === '' || hash === '#') {
    return viewTemp('#/signIn');
  } else if (hash === '#/signIn' || hash === '#/home') {
    return viewTemp(hash);
  } else {
    return viewTemp(hash);
  } 
};
const viewTemp = (routers) => {
  let router;
  if (routers) {
    router = routers.substr(2, routers.length - 2);
  } else {
    router = 'signIn';
  };
  const container = document.getElementById('container');
  container.innerHTML = '';
  console.log(router);
  container.appendChild(viewTemplates[router]());
};

export const initRouter = () => {
  window.addEventListener('load', changeTmp(window.location.hash));
  if (('onhashchange' in window)) window.onhashchange = () => changeTmp(window.location.hash);
};
