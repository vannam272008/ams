import axios from 'axios';
const API_URL = '/api';

const request = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-type': 'application/json',
    },
});

const getToken = () => {
    try {
        return JSON.parse(localStorage.getItem('token'));
    } catch (error) {
        return '';
    }
};

export const get = async (endpoint, options = {}) => {
    const token = getToken();
    return await request.get(endpoint, options, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const post = async (endpoint, data = {}) => {
    const token = getToken();
    return await request.post(endpoint, data, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const put = async (endpoint, data = {}) => {
    const token = getToken();
    return await request.put(endpoint, data, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const patch = async (endpoint, data = {}) => {
    const token = getToken();
    return await request.patch(endpoint, data, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const remove = async (endpoint, data = {}) => {
    const token = getToken();
    return await request.delete(endpoint, {
        data,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

export default request;
