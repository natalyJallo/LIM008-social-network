import {loginFunction} from './log-in-view.js';

export const changeTmp = (hash) => {
  return viewTemp(hash);
};


export const viewTemp = (routers) => {    
  let router;
  if (routers) {
    router = routers.substr(2, routers.length - 2);
  } else {
    router = 'signUp';
    router = 'profile';
    router = 'different';
    router = 'signIn';

  }

  const container = document.getElementById('container');
  container.innerHTML = '';
  console.log(router);
  container.appendChild(loginFunction[router]());
};