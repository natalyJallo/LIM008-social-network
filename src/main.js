import {configFirebase} from './lib/firebase/firebase-auth.js';
import {initRouter} from './lib/controller.js';

const init = () => {
  configFirebase();
  initRouter();
};

window.onload = init();
