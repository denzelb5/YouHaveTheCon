import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

// const getBudgetedAmountForExpenses = (budgetId, name) => new Promise((resolve, reject) =>{
//     axios.get(`${baseUrl}/api/con/expenses/budgetAmounts/${budgetId}/${name}`)
//     .then((result) => {
//         const budgetAmounts = result.data;
//         resolve(budgetAmounts);
//     }).catch((error) => reject(error));
// });

const addExpense = (newExpense) => {
    const url = `${baseUrl}/api/con/expenses/addExpense`;
    return axios.post(url, newExpense);
}

const updateExpense = (expenseId, expenseToUpdate) => axios.put(`${baseUrl}/api/con/${expenseId}/editexpense`, expenseToUpdate);

export default { addExpense, updateExpense };