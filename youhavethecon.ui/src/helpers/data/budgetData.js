import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getBudgetForCon = (conId, userId) => axios.get(`${baseUrl}/api/con/budget/${conId}/${userId}`);
    

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

