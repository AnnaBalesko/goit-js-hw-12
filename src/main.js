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
  initLightbox,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const PAGE_SIZE = 15;
let query = '';
let currentPage = 1;
let totalPages = 0;

hideLoadMoreButton();
hideLoader();
initLightbox();

form.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  query = formData.get('search-text').trim();
  currentPage = 1;

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  await fetchImg();
});

loadBtn.addEventListener('click', async () => {
  currentPage += 1;

  hideLoadMoreButton();
  showLoader();

  await fetchImg();
});

async function fetchImg() {
  try {
    const res = await getImagesByQuery(query, currentPage);

    if (res.hits.length === 0 && currentPage === 1) {
      iziToast.error({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });

      hideLoader();
      return;
    }

    totalPages = Math.ceil(res.total / PAGE_SIZE);

    createGallery(res.hits);
    checkBtnStatus();

    if (currentPage > 1) {
      scrollPage();
    }
  } catch (error) {
    {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });

      console.error(error);
    }
  } finally {
    hideLoader();
  }
}

function checkBtnStatus() {
  if (currentPage < totalPages) {
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
    iziToast.info({
      title: 'The End',
      message: 'We`re sorry, but you`ve reached the end of search results.',
    });
  }
}

function scrollPage() {
  const firstCard = document.querySelector('.gallery-item');
  if (!firstCard) return;

  const { height: cardHeight } = firstCard.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
