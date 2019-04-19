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
        abc2d: {
          content: 'Hola Naty',
          date: '14 de febrero de 2019, 15:30:36 UTC-4',
          name: 'Nataly Jallo',
          likes: 0,
          privacy: 'Privado',
          uid: '4t90nsnskfmmslmfkdngklsm446d'
        },
      }
    }
  }
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });
import { addPost, deletePost, getPosts, getPrivPosts, updateLikePost, editPosts} from '../src/lib/firebase/controller-auth-login';
import { validationPost } from '../src/lib/view-controller/view-controller-auth.js';

const outPut5 = {condition: false, message: 'No puedes publicar algo vacio'};
const outPut6 = {condition: true};

describe('lista de posts', () => {
  it('Debería poder agregar un post', (done) => {
    return addPost('Hola', 'Publico', 'Juanito', '4inii4iu4i4n4kn4kn4k4', 2)
      .then(() => getPosts((data) => {
        const result = data.find((post) => post.content === 'Hola');
        expect(result.content).toBe('Hola');
        done();
      }
      ));
  });

  it('Debería poder editar post', (done) => {
    return editPosts('abc2d', 'Feliz Cumpleaños')
      .then(() => getPosts((data) => {
        const result = data.find((post) => post.content === 'Feliz Cumpleaños');
        expect(result.content).toBe('Feliz Cumpleaños');
        done();
      }
      ));
  });
});

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

describe('deletePost', () => {
  it('Debería poder eliminar un post', (done) => {
    return deletePost('abc1d')
      .then(() => getPosts(
        (data) => {
          const result = data.find((posts) => posts.id === 'abc1d');
          expect(result).toBe(undefined);
          done();
        }));
  });    
});

describe('lista de posts', () => {
  it('Debería poder actualizar los likes del post', (done) => {
    updateLikePost('abc2d', 1).then(() => getPosts(
      (data) => {
        const result = data.find((posts) => posts.likes === 1);
        expect(result.likes).toBe(1);
        done();
      }));
  });
});

describe('obtener posts', () => {
  it('Debería poder traer la colección de posts', (done) => {
    const callback = (data) => {
      expect(data[0].name).toBe('Nataly Jallo');
      done();
    };
    getPosts(callback);
  });

  it('Debería poder traer la colección de posts', (done) => {
    const callback = (data) => {
      expect(data[0].name).toBe('Nataly Jallo');
      done();
    };
    getPrivPosts(callback);
  });
});
