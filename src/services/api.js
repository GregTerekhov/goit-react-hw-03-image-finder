import axios from 'axios';

const API_KEY = '33498062-ee2b42b41cbde2a2a11e8f88d';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImages = async (searchQuery, page) => {
  const params = {
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
    page: page,
  };

  const response = axios.get('/', { params });

  return response.data;
};
