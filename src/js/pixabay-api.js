'use strict';

import axios from 'axios';

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '53336215-c76f1a14c7207891fbb20a22b',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 15,
      page,
    },
  });
  return response.data;
}
