import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getAllCons = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/api/con/allcons`)
    .then((result) => {
        const allCons = result.data;
        resolve(allCons);
    }).catch((error) => reject(error));
});

export default { getAllCons };