import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getBudgetForCon = (conId, userId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/api/con/budget/${conId}/${userId}`)
    .then((result) => {
        const conBudget = result.data;
        resolve(conBudget);
    }).catch((error) => reject(error));
});

const addBudget = (newBudget) => axios.post(`${baseUrl}/api/con/budget/addbudget`, newBudget);

const addBudgetLineItems = (newLineItem) => axios.post(`${baseUrl}/api/con/budget/addline`, newLineItem);

const updateBudgetLineItem = (budgetLineItemId, editedLine) => axios.put(`${baseUrl}/api/con/${budgetLineItemId}/edit`, editedLine);

const deleteBudgetLineItem = (budgetLineItemId) => axios.delete(`${baseUrl}/api/con/deletebudgetline/${budgetLineItemId}`);

export default { 
    getBudgetForCon,
    addBudget, 
    addBudgetLineItems,
    updateBudgetLineItem,
    deleteBudgetLineItem
 };

