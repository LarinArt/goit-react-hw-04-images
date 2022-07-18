import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27450205-8765e518dc84e5655ddf2d669';

const customAxios = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const getImages = async params => {
  try {
    const { data } = await customAxios.get('', { params });
    return data;
  } catch (error) {
    toast.error(`${error}`);
  }
};
