'use strict';

import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
export const loadBtn = document.querySelector('.js-load-btn');

function imgTemplate(img) {
  return `<li class='gallery-item'>
    <a class='gallery-link' href=${img.largeImageURL}>
    <img loading='lazy' class='gallery-image' src='${img.webformatURL}' alt='${img.tags}'/>
    <div class='img'>
    <p><strong>Likes</strong> ${img.likes}</p>
    <p><strong>Views</strong> ${img.views}</p>
    <p><strong>Comments</strong> ${img.comments}</p>
    <p><strong>Downloads</strong> ${img.downloads}</p></div></a></li>`;
}

export function createGallery(images) {
  const markup = images.map(imgTemplate).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  const loaderOverlay = document.getElementById('loader-overlay');
  if (loaderOverlay) {
    loaderOverlay.classList.remove('hidden');
  }
}

export function hideLoader() {
  const loaderOverlay = document.getElementById('loader-overlay');
  if (loaderOverlay) {
    loaderOverlay.classList.add('hidden');
  }
}

export function showLoadMoreButton() {
  if (loadBtn) {
    loadBtn.classList.remove('hidden');
  }
}

export function hideLoadMoreButton() {
  if (loadBtn) {
    loadBtn.classList.add('hidden');
  }
}
