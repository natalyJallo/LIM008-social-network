import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc1d: {
          content: 'Hola a todos',
          date: '13 de febrero de 2019, 18:54:36 UTC-5',
          name: 'Micaela Suarez',
          likes: 0,
          privacy: 'Público',
          uid: '79wGxqkdsAbUhMcIRd68W0SPsui2'
        },
      }
    }
  }
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

import { deletePost, getPosts, updateLikePost } from '../src/lib/firebase/controller-auth-login.js';
import { validationPost } from '../src/lib/view-controller/view-controller-auth.js';

const outPut5 = {condition: false, message: 'No puedes publicar algo vacio'};
const outPut6 = {condition: true};

describe('validationPost', () => {
  it('Debería ser una función', () => {
    expect(typeof validationPost).toBe('function');
  });
  it('Deberia validar que el post no sea vacio', () => {
    expect(validationPost('')).toEqual(outPut5);
  });
  it('Deberia validar que el post no sea vacio', () => {
    expect(validationPost('Hola Jenny')).toEqual(outPut6);
  });
});

it('Debería poder eliminar un post', (done) => {
  return deletePost('abc1d')
    .then(() => getPosts(
      (data) => {
        const result = data.find((posts) => posts.id === 'abc1d');
        expect(result).toBe(undefined);
        done();
      }
    ));
});

it('Debería poder actualizar los likes del post', (done) => {
  return updateLikePost('abc1d', 'posts.likes += 1')
    .then(() => update(
      (data) => {
        const result = data.find((likes) => likes.id === '1');
        expect(result).toBe(1);
        done();
      }
    )
    );
});
