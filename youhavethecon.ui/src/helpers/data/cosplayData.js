import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getAllCosplaysByUserId = (userId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/api/cosplay/allcosplays/${userId}`)
    .then((result) => {
        const allCosplays = result.data;
        resolve(allCosplays);
    })
    .catch((error) => reject(error));
})

export default { getAllCosplaysByUserId };