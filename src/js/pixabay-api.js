'use strict';

import axios from 'axios';

const BASE_URL = 'https://pixabay.com';
const END_POINTS = '/api/';
const API_KEY = '53336215-c76f1a14c7207891fbb20a22b';

export async function getImagesByQuery(query, currentPage) {
  const url = `${BASE_URL}${END_POINTS}`;

  const response = await axios.get(url, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 15,
      page: currentPage,
    },
  });
  return response.data;
}
