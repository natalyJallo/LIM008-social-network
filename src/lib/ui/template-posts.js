/* Funcion con el maquetado de mis post - JENI*/
import {deletePost} from '../firebase/controller-auth-login.js';

export const noteFunction = (post) => {
  const tmp = `<div class='box-post large2'>
      <div class='box-post-message'>
      <img src='img/usuario-3.png' alt='icono de perfil' class='img-menu align-2'>
      <h2 class='text-5'>${post.uid}dice
      <div class='icon-privacy'>Hace un momento${post.privacy}</div></h2>
      <textarea class='content-edit' contenteditable='true'>${post.content}</textarea>
      </div>
      <div class='count-like'><img src='img/corazon.png' alt='icono de like' class='img-like align'><h2 class='like-word'>Like</h2></div>
      <button class='btn-post btn-edit-delete' id='btn-edit-${post.id}'>Editar</button>
      <button class='btn-post btn-edit-delete' id='btn-deleted-${post.id}'>Eliminar</button></div>`;
  let postList = document.createElement('div');
  postList.setAttribute('id', `id-${post.id}`);
  postList.innerHTML = tmp;

  const btnDeletePost = postList.querySelector(`#btn-deleted-${post.id}`);
  btnDeletePost.addEventListener('click', () => {
    deletePost(postList.id);
  });

  return postList;
};