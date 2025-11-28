'use strict';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  loadBtn,
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

let currentQuery = '';
let currentPage = 1;
let totalPage = 1;

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

  currentQuery = query;
  currentPage = 1;

  showLoader();
  hideLoadMoreButton();
  clearGallery();

  await fetchImg();
});

loadBtn.addEventListener('click', async () => {
  currentPage++;
  await fetchImg();
});

async function fetchImg() {
  try {
    showLoader();

    const data = await getImagesByQuery(currentQuery, currentPage);
    totalPage = data.totalPage;

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

    const totalLoaded = document.querySelectorAll('.gallery-item').length;

    if (totalLoaded >= totalPage) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'The End',
        message: 'We`re sorry, but you`ve reached the end of search results.',
      });
    } else {
      showMoreButton();
    }

    if (currentPage > 1) {
      scrollPage();
    }
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
  } finally {
    hideLoader();
  }
}

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
