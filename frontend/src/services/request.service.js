import axios from './root.service.js';

export async function getRequestAll() {
    try {
        const { data } = await axios.get('/request/req-all');
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function getOwnRequests() {
    try {
        const { data } = await axios.get('/request/getOwn');
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

export async function UpdateRequest(data, id) {
    try {
        const response = await axios.put(`/request/modify/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }

}

export async function deleteRequest(id) {
    try {
        const { data } = await axios.delete(`/request/delete/${id}`);
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }

}

export async function expireRequest(id, status){
    try {
        console.log("status: ", status);
        const { data } = await axios.put(`/request/modify/${id}`, status);
        
        return data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

