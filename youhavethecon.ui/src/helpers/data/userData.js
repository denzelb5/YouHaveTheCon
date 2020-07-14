
import { baseUrl } from '../apiKeys.json';
import axios from 'axios';

const getUser = (email) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/api/user/email/${email}`)
    .then((request) => {
        const user = request.data;
        resolve(user);
    }).catch((error) => reject(error));
});

export default { getUser };