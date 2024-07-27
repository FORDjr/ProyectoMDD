import axios from '../services/root.service';

async function getImplements() {
    try {
        const response = await axios.get('/implement/');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export default getImplements;