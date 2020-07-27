import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

// const getBudgetedAmountForExpenses = (budgetId, name) => new Promise((resolve, reject) =>{
//     axios.get(`${baseUrl}/api/con/expenses/budgetAmounts/${budgetId}/${name}`)
//     .then((result) => {
//         const budgetAmounts = result.data;
//         resolve(budgetAmounts);
//     }).catch((error) => reject(error));
// });

const addExpense = (newExpense) => axios.post(`${baseUrl}/con/expenses/addExpense`, newExpense);

export default { addExpense };