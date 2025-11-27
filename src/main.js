'use strict';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  hideLoader,
  showLoader,
  hideLoadMoreButton,
  showMoreButton,
} from './js/render-function.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const input = form.elements['search-text'];

hideLoadMoreButton();
hideLoader();

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = e.target.elements['search-text'].value.trim();

  if (query.length === 0) return;

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
    });
    return;
  }

  showLoader();
  hideLoadMoreButton();
  clearGallery();

  try {
    const data = await getImagesByQuery(query);
    showMoreButton();
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      hideLoadMoreButton();
      hideLoader();
      form.reset();
      return;
    }
    createGallery(data.hits);
    input.value = '';
  } catch (error) {
    {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
      hideLoadMoreButton();
      hideLoader();
      form.reset();
      console.error(error);
    }
  }
  hideLoader();
});
