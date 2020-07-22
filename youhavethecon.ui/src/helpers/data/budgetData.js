import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getBudgetForCon = (conId, userId) => axios.get(`${baseUrl}/api/con/budget/${conId}/${userId}`);

const addBudget = (newBudget) => axios.post(`${baseUrl}/api/con/budget/addbudget`, newBudget);

export default { getBudgetForCon, addBudget };

