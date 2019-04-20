import {editPosts, deletePost} from '../firebase/controller-auth-login.js';
import {updateLikeCount} from '../view-controller/view-controller.js';

/* Funcion con el maquetado de mis post*/
export const postFunction = (post, uid) => {
  const tmp = `<div class='box-post large2'>
      <div class='box-post-message'><div class="perfil">
      <img src="img/usuario-3.png" alt='icono de perfil' class='img-menu align-2'>
      <h2 class='text-5'>${post.name} dice
      ${post.privacy === 'publico' ? '<img src="img/mundo2.png" class="post-public" aria-hidden="true" >' : ' <img src="img/privado2.png" class="post-private" aria-hidden="true" >'}</h2></div>
      <textarea class='content-edit' id='textarea-post-${post.id}' disabled >${post.content}</textarea>
      </div>
      <div class='count-like'><a id='btn-like-${post.id}' class='like'><img src='img/corazon.png' alt='icono de like' class='img-like align'></a>
      <span class='like-word' id='likes-number-${post.id}'>${post.likes} </span>
      <span class='like-word' id='like-text-${post.id}'>Like</span></div>
      <div id="btn-edit-${post.id}" > 
      ${post.uid === uid ? '<button class="btn-post btn-edit" >Editar</button>' : ''}  
      </div>
      <div id="btn-save-${post.id}" hidden> 
      ${post.uid === uid ? '<button class="btn-post btn-edit" >Guardar</button>' : ''}  
      </div>
      <div id="btn-deleted-${post.id}" > 
      ${post.uid === uid ? '<button class="btn-post btn-edit" >Eliminar</button>' : ''}  
      </div> </div>
      `
      ;
  let postList = document.createElement('div');
  postList.setAttribute('id', `id-${post.id}`);
  postList.setAttribute('class', 'col-8');
  postList.innerHTML = tmp;

  const btnDeletePost = postList.querySelector(`#btn-deleted-${post.id}`);
  btnDeletePost.addEventListener('click', () => {
    alert('¿Desea eliminar la publicación?');
    deletePost(post.id); 
  });

  const btnLikePost = postList.querySelector(`#btn-like-${post.id}`);
  btnLikePost.addEventListener('click', () => {
    document.getElementById(`likes-number-${post.id}`).removeAttribute('hidden');
    document.getElementById(`like-text-${post.id}`).setAttribute('hidden', 'true');
    updateLikeCount(post, post.likes += 1); 
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
  
  return postList;
};