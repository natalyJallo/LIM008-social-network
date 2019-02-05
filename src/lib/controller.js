import { viewTemplates } from './templates.js';
export {changeTmp};

const changeTmp = (hash) => {
 return viewTemp(hash);
};

const viewTemp = (routers) => {
 let router;
 if (routers) {
     router = routers.substr(2, routers.length - 2);
 } else {
     router = 'home';
     router = 'signUp';
     router = 'signIn';
 };

 const container = document.getElementById('container');
 //limpia lo que hay previamente en el 'container'
 container.innerHTML = '';
 //con appendChild agrega el template respectivo según el hash.
 container.appendChild(viewTemplates[router]());
};

