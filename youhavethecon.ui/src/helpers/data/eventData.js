import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getConEventsByConId = (conId, userId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/api/event/allevents/${conId}/${userId}`)
    .then((result) => {
        const allEvents = result.data;
        resolve(allEvents);
    })
    .catch((error) => reject(error));
});

export default { getConEventsByConId };
