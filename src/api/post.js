import api from './axios';

export const getPosts = () => {
    return api.get('/posts');
};

export const storePost = (data) => {
    return api.post('/posts', data);
};