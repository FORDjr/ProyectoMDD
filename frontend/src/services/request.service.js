import axios from './root.service.js';

export async function getRequestAll() {
    try {
        const { data } = await axios.get('/request/req-all');
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function acceptRequest(data) {
    try {
        const response = await axios.put(`/request/${data}/accept`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}