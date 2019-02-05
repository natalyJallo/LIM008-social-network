import {changeTmp} from './lib/controller.js';

window.addEventListener('load', () => { 
    changeTmp(window.location.hash)
    if (('onhashchange' in window)) window.onhashchange = () => changeTmp(window.location.hash)
  });

/*En controller.js exporté la función changeTmp la misma que la uso aquí 
para pintar la vista según el hash o ruta*/