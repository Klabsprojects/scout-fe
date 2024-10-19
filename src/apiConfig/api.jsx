import axios from 'axios';

export const API_BASE_URL = {apiUrlConfig: 'http://localhost:4010'};

export const api = axios.create({
    baseURL: API_BASE_URL.apiUrlConfig,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
// api.interceptors.request.use(function (config) {
//     console.log('Full request config:', JSON.stringify(config, null, 2));
//     return config;
// }, function (error) {
//     console.error('Request error:', error);
//     return Promise.reject(error);
// });

// // Add a response interceptor
// api.interceptors.response.use(function (response) {
//     console.log('Response received:', response);
//     return response;
// }, function (error) {
//     console.error('Response error:', error.response || error);
//     return Promise.reject(error);
// });

export default api;