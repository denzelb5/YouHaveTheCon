import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getAllCons = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/api/con/allcons`)
    .then((result) => {
        const allCons = result.data;
        resolve(allCons);
    }).catch((error) => reject(error));
});

const getSingleCon = (conId) => axios.get(`${baseUrl}/api/con/${conId}`)
const addCon = (newCon) => axios.post(`${baseUrl}/api/con/addcon`, newCon);

export default { getAllCons, addCon, getSingleCon };