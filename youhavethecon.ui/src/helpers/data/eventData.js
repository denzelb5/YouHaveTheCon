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

const addEvent = (eventToAdd) => axios.post(`${baseUrl}/api/event/addevent`, eventToAdd);

export default { getConEventsByConId, addEvent };