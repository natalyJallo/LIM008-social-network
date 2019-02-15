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
import { signInUser, loginAuth, closeSignIn, signUpUser, updateProfile, isUserSignedIn } from '../src/lib/firebase/controller-auth-login';
import { addData, loginCall, registerAcccount, validateloginForm} from '../src/lib/view-controller/view-controller-auth.js'; 

// DOM para poder leer el error de mensaje
const outPut = {condition: true};
const outPut2 = {condition: false, message: 'Contraseña mayor a 6 caracteres'};
const outPut3 = {condition: false, message: 'Ingrese su email correcto'};
const outPut4 = {condition: false, message: 'Ingrese un email y un password'};

describe('signInUser', () => {
  it('Debería poder iniciar sesion', () => {
    return signInUser('gatitosbonitos@gmail.com', '123456')
      .then((user) => {
        expect(user.email).toBe('gatitosbonitos@gmail.com');
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

describe('isUserSignedIn', () => {
  it('debería ser una función', () => {
    expect(typeof isUserSignedIn).toBe('function');
  });
  it('Debería poder autenticar el email para ingresar a la pagina al iniciar sesion', () => {
    signInUser('gatitosbonitos@gmail.com', '123456').then(() => {
      return isUserSignedIn('P37Kz7aGSiXpm6QCkrfsYvjG5r72');
    });
  });
});

describe('signUpUser', () => {
  it('Debería poder registrar a un usuario', () => {
    return signUpUser('gatitosbonitos@gmail.com', '234567');
  });
});

describe('updateProfile', () => {
  it('Debería poder actualizar el nombre del usuario', () => {
    signInUser('gatitosbonitos@gmail.com', '123456').then(() => {
      return updateProfile('Nataly', 'Jallo');
    });
  });
});

describe('addData', () => {
  it('Debería poder añadir la data del usuario', () => {
    return addData('gatitosbonitos@gmail.com', '123456', 'Nataly', 'Jallo', 'Naty', 'Peru', 'e4grdsvvde2434434');
  });
});

describe('loginCall', () => {
  it('Debería poder llamarme la función para loguearme', () => {
    signInUser('gatitosbonitos@gmail.com', 'abc123').then(() => {
      return loginCall('gatitosbonitos@gmail.com', 'abc123');
    });
  });
});

describe('registerAcccount', () => {
  it('Debería poder llamarme la función para loguearme', () => {
    return registerAcccount('gatitosbonitos@gmail.com', '123456', 'Nataly', 'Jallo', 'Naty', 'Peru');
  });
});

describe('signUpUser', () => {
  it('debería ser una función', () => {
    expect(typeof signUpUser).toBe('function');
  });
  it('Debería poder registrar a un usuario', () => {
    return signUpUser('toxoloc@parcel4.net', '123456nat');
  });
});

describe('loginAuth', () => {
  it('debería ser una función', () => {
    expect(typeof loginAuth).toBe('function');
  });
  it('Debería poder autenticar a un usuario', () => {
    return loginAuth('toxoloc@parcel4.net', '123456nat');
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
