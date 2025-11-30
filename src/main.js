'use strict';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  loadBtn,
  createGallery,
  clearGallery,
  hideLoader,
  showLoader,
  hideLoadMoreButton,
  showLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const input = form.elements['search-text'];

const PAGE_SIZE = 15;
let query;
let currentPage;
let totalHits;

hideLoadMoreButton();
hideLoader();

form.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  query = formData.get('search-text').trim();
  currentPage = 1;

  if (!query || query.length === 0) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
    });
    return;
  }

  showLoader();
  hideLoadMoreButton();
  clearGallery();

  await fetchImg();
});

loadBtn.addEventListener('click', async () => {
  currentPage += 1;
  await fetchImg();
});

async function fetchImg() {
  try {
    showLoader();

    const res = await getImagesByQuery(query, currentPage);
    totalHits = Math.ceil(res.total / PAGE_SIZE);

    if (res.hits.length === 0) {
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

    createGallery(res.hits);

    input.value = '';

    checkBtnStatus();
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

function checkBtnStatus() {
  if (currentPage < totalHits) {
    showLoadMoreButton();
    scrollPage();
  } else {
    hideLoadMoreButton();
    iziToast.info({
      title: 'The End',
      message: 'We`re sorry, but you`ve reached the end of search results.',
    });
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
