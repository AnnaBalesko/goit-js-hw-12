'use strict';

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '53336215-c76f1a14c7207891fbb20a22b';

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 15,
      page: page,
    },
  });
  return response.data;
}
