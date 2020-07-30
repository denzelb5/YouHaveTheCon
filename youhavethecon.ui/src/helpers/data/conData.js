import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getAllConsByUserId = (userId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/api/con/allcons/${userId}`)
    .then((result) => {
        const allCons = result.data;
        resolve(allCons);
    }).catch((error) => reject(error));
});



const getSingleCon = (conId, userId) => axios.get(`${baseUrl}/api/con/${conId}/${userId}`)
const addCon = (newCon) => axios.post(`${baseUrl}/api/con/addcon`, newCon);
const updateAmount = (budgetCategoryId, amountToUpdate) => axios.post(`${baseUrl}/api/con/budgetCategory/${budgetCategoryId}`, amountToUpdate);

export default { 
    getAllConsByUserId, 
    addCon, 
    getSingleCon,
    updateAmount
 };