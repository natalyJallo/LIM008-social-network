import {changeTmp} from './lib/controller.js';

window.addEventListener('load', () => { 
    changeTmp(window.location.hash)
    if (('onhashchange' in window)) window.onhashchange = () => changeTmp(window.location.hash)
  });