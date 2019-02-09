// configurando firebase mock
const firebasemock = require('firebase-mock');
const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  path => (path ? mockdatabase.child(path) : null),
  () => mockauth,
  () => mockfirestore
);

// importamos la funcion que vamos a testear
import { signInUser, loginAuth, closeSignIn, signUpUser } from '../src/lib/firebase/controller-firebase.js';

describe('signInUser', () => {
  it('debería ser una función', () => {
    expect(typeof signInUser).toBe('function');
  });
  it('Debería poder iniciar sesion', () => {
    return signInUser('front@end.la', '123456')
      .then((user) => {
        expect(user.email).toBe('front@end.la');
      });
  });
});

describe('loginAuth', () => {
  it('debería ser una función', () => {
    expect(typeof loginAuth).toBe('function');
  });
  it('Debería poder auntentificar el email y contraseña', () => {
    return loginAuth(() => {
      
    });
  });
});

describe('closeSignIn', () => {
  it('debería ser una función', () => {
    expect(typeof closeSignIn).toBe('function');
  });
  it('Debería poder salir de sesion de la cuenta de la red social', () => {
    return closeSignIn();
  });
});

describe('signUpUser', () => {
  it('debería ser una función', () => {
    expect(typeof signUpUser).toBe('function');
  });
  it('Debería poder registrar a un usuario', () => {
    return signUpUser('margarita12@gmail.com', '234567');
  });
});

// describe('D', () => {
//   it('debería ser una función', () => {
//     expect(typeof signUpUser).toBe('function');
//   });
//   it('Debería poder registrar a un usuario', () => {
//     return signUpUser('front@end.la', '123456');
//   });
// });
