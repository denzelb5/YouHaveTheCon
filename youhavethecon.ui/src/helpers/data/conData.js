import axios from 'axios';
import { baseUrl } from '../apiKeys.json';
import authData from './authData';

const getAllCons = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/api/con/allcons`)
    .then((result) => {
        const allCons = result.data;
        resolve(allCons);
    }).catch((error) => reject(error));
});

const getBudgetForCon = (conId, userId) => axios.get(`${baseUrl}/api/con/budget/${conId}/${userId}`)

const getSingleCon = (conId, userId) => axios.get(`${baseUrl}/api/con/${conId}/${userId}`)
const addCon = (newCon) => axios.post(`${baseUrl}/api/con/addcon`, newCon);
const updateAmount = (budgetCategoryId, amountToUpdate) => axios.post(`${baseUrl}/api/con/budgetCategory/${budgetCategoryId}`, amountToUpdate);

export default { 
    getAllCons, 
    addCon, 
    getSingleCon,
    getBudgetForCon,
    updateAmount
 };