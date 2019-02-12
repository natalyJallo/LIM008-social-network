import {deletePost} from '../firebase/controller-auth-login.js';
import {updatePostOnClick, updateLikeCount} from '../view-controller/view-controller.js';
/* Funcion con el maquetado de mis post*/
export const postFunction = (post, uidUser) => {
  const tmp = `<div class='box-post large2'>
      <div class='box-post-message'>
      <img src="img/usuario-3.png" alt='icono de perfil' class='img-menu align-2'>
      <h2 class='text-5'>${post.name}dice
      <div class='icon-privacy'>
      <span class = "user-display-time">${post.date}</span>
      ${post.privacy === 'publico' ? '<i class="post-public" aria-hidden="true"></i>' : ' <i class="post-private" aria-hidden="true"></i>'}</div></h2>
      <textarea class='content-edit' id='textarea-post-${post.id}' contenteditable='true'>${post.content}</textarea>
      </div>
      <div class='count-like'><a id='btn-like-${post.id}'><img src='img/corazon.png' alt='icono de like' class='img-like align'></a><h2 class='like-word'>Like</h2></div>
      <button class='btn-post btn-edit' id='btn-edit-${post.id}'>Editar</button>
      <!-- snackbar -->
      <button class='btn-post btn-edit-update' id='btn-update-${post.id}'>Enviar</button>
      <!-- snackbar -->
      <button class='btn-post btn-edit' id='btn-deleted-${post.id}'>Eliminar</button></div>`;
  let postList = document.createElement('div');
  postList.setAttribute('id', `id-${post.id}`);
  postList.innerHTML = tmp;

  const btnDeletePost = postList.querySelector(`#btn-deleted-${post.id}`);
  btnDeletePost.addEventListener('click', () => deletePost(post.id));

  const btnLikePost = postList.querySelector(`#btn-like-${post.id}`);
  btnLikePost.addEventListener('click', () => {
    updateLikeCount(post, post.likes += 1);
  });

  // postList.querySelector(`#btn-edit-${post.id}`).addEventListener('click', () => {
  //   const textareaPost = document.querySelector(`#textarea-post-${post.id}`);
  //   textareaPost.disabled = false;
  //   const btnEditNone = document.querySelector(`#btn-edit-${post.id}`);
  //   btnEditNone.style.display = 'none';
  //   const btnSaveBlock = document.querySelector(`#btn-save-${post.id}`);
  //   btnSaveBlock.style.display = 'block';
  // });

  // postList.querySelector(`#btn-save-${post.id}`).addEventListener('click', () => {
  //   const textareaPos = document.querySelector(`#textarea-post-${post.id}`);
  //   updatePostOnClick(post, textareaPos.value);
  // });
  return postList;
};

/* CONTAINER de mis posts(ul) */   

// export const postInSection = (posts, uid) => {
//   const postListWall = posts.querySelector('#post-container');
//   postListWall.innerHTML = '';
//   posts.forEach((post) => {
//     if (post.privacy === 'privado' && post.uid === uid) {
//       postListWall.appendChild(postFunction(post, uid));
//     } else if (post.privacy === 'publico') {
//       postListWall.appendChild(postFunction(post, uid));
//     }
//   });
//   return createPostInWall;
// };