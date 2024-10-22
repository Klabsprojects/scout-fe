import axios from 'axios';

export const API_BASE_URL = {
  apiUrlConfig: 'http://localhost:4010',
};

export const api = axios.create({
  baseURL: API_BASE_URL.apiUrlConfig,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const listProduct = async (id) => {
  try {
    const response = await api.get(`/api/listProduct/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;