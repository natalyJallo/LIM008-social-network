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
import { signInUser, closeSignIn, signUpUser } from '../src/lib/firebase/controller-auth-login.js';
import { validateloginForm } from '../src/lib/view-controller/view-controller-auth.js';

// DOM para poder leer el error de mensaje
const outPut = {condition: true};
const outPut2 = {condition: false, message: 'Contraseña mayor a 6 caracteres'};
const outPut3 = {condition: false, message: 'Ingrese su email correcto'};
const outPut4 = {condition: false, message: 'Ingrese un email y un password'};

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

describe('validateloginForm', () => {
  it('Debería ser una función', () => {
    expect(typeof validateloginForm).toBe('function');
  });
  it('Deberia validar que el email y password no sea vacio', () => {
    expect(validateloginForm('margarita12@gmail.com', '234567')).toEqual(outPut);
  });
  it('Deberia validar que el password no sea menor de 6 caracteres', () => {
    expect(validateloginForm('margarita12@gmail.com', '12')).toEqual(outPut2);
  });
  it('Deberia validar que el email sea correcto', () => {
    expect(validateloginForm('natita', '1234567')).toEqual(outPut3);
  });
  it('Deberia validar que el email y password sea vacio', () => {
    expect(validateloginForm('', '')).toEqual(outPut4);
  });
});

