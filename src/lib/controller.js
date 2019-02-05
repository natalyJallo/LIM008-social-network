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
     //Si no encuentra el hash debería mostrar un 404, va mostrar una de las 3 páginas.
     router = 'home';
     router = 'signUp';
     router = 'signIn';
 };
 //está llamando al elemento "container', pero ese no está en template  
 const container = document.getElementById('container');
 //limpia lo que hay previamente en el 'container'
 container.innerHTML = '';
 //con appendChild agrega el template respectivo según el hash.
 container.appendChild(viewTemplates[router]());
 //viewtemplates en un objeto de funciones y por ello debe usar corchetes para llamar propiedades tipo funcion.
};

//resumen: importo el template.js para pintarlo según la ruta, sin embargo
//debo obtener un elemento del DOM-en este caso container- para pintar
//luego que tengo el contenedor, limpio y agrega la vista que corresponda.
//Además está exportando la función changeTmp para  