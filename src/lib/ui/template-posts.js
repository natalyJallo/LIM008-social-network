import {deletePost, editPosts} from '../firebase/controller-auth-login.js';
import {updateLikeCount} from '../view-controller/view-controller.js';

/* Funcion con el maquetado de mis post*/
export const postFunction = (post) => {
  const tmp = `<div class='box-post large2'>
      <div class='box-post-message'>
      <img src='img/usuario-3.png' alt='icono de perfil' class='img-menu align-2'>
      <h2 class='text-5'>${post.name} dice
      <div class='icon-privacy'>
      <span class = "user-display-time">${post.date}</span>
      ${post.privacy === 'publico' ? '<i class="post-public" aria-hidden="true"></i>' : ' <i class="post-private" aria-hidden="true"></i>'}</div>
      </h2>
      <textarea class='content-edit' id='textarea-post-${post.id}' contenteditable='true'>${post.content}</textarea>
      </div>
      <div class='count-like'><a id='btn-like-${post.id}'><img src='img/corazon.png' alt='icono de like' class='img-like align'></a>
      <span id= 'likes-number-${post.id}' class='like-word'>${post.likes}</span>
      <span id= 'like-text-${post.id}' class='like-word'>Like</span></div>
      <button class='btn-post btn-edit-delete' id='btn-edit-${post.id}'>Editar</button>
      <button class='btn-post btn-edit-update' id='btn-update-${post.id}'>Enviar</button></div>
      <button class='btn-post btn-edit-delete' id='btn-save-${post.id}' hidden >Guardar</button>
      <button class='btn-post btn-edit-delete' id='btn-deleted-${post.id}'>Eliminar</button></div>`;
  
  let postList = document.createElement('form');
  postList.setAttribute('id', `id-${post.id}`);
  postList.innerHTML = tmp;  
  
  const btnDeletePost = postList.querySelector(`#btn-deleted-${post.id}`);
  btnDeletePost.addEventListener('click', () => {
    deletePost(post.id);
  });
  
  const btnSavePost = postList.querySelector(`#btn-save-${post.id}`);

  const btnEditPost = postList.querySelector(`#btn-edit-${post.id}`);
 
  btnEditPost.addEventListener('click', () => {
    document.getElementById(`textarea-post-${post.id}`).removeAttribute('disabled');
    btnSavePost.removeAttribute('hidden');
    btnEditPost.setAttribute('hidden', 'true');
  });

  btnSavePost.addEventListener('click', () => {
    const postContent = document.getElementById(`textarea-post-${post.id}`);
    editPosts(post.id, postContent.value);
  });

  const btnLikePost = postList.querySelector(`#btn-like-${post.id}`);
  btnLikePost.addEventListener('click', () => {
    document.getElementById(`likes-number-${post.id}`).removeAttribute('hidden');
    document.getElementById(`like-text-${post.id}`).setAttribute('hidden', 'true');
    updateLikeCount(post.id, post.likes += 1);
  });

  postList.querySelector(`#btn-edit-${post.id}`).addEventListener('click', () => {
    const textareaPost = document.querySelector(`#textarea-post-${post.id}`);
    textareaPost.disabled = false;
    const btnEditNone = document.querySelector(`#btn-edit-${post.id}`);
    btnEditNone.style.display = 'none';
    const btnSaveBlock = document.querySelector(`#btn-save-${post.id}`);
    btnSaveBlock.style.display = 'block';
  });

  return postList;
};
