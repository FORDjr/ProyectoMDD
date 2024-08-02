import axios from '../services/root.service';

async function getImplements() {
    try {
        const response = await axios.get('/implement/');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function createImplement(data) {
    try {
        const response = await axios.post('/implement/create', data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function editImplement(data, id) {
    try {
        const response = await axios.put(`/implement/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteImplement(id) {
    try {
        const response = await axios.delete(`/implement/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export default getImplements;