import {configFirebase} from './lib/firebase/config-firebase.js';
import {initRouter} from './lib/util/router.js';

const init = () => {
  configFirebase();
  initRouter();
};

window.onload = init();
