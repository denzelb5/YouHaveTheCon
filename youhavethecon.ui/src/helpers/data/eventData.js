import axios from 'axios';
import { baseUrl } from '../apiKeys.json';

const getConEventsByConId = (conId, userId) => {
    return axios.get(`${baseUrl}/api/event/allevents/${conId}/${userId}`);
};

const addEvent = (eventToAdd) => axios.post(`${baseUrl}/api/event/addevent`, eventToAdd);

const updateEvent = (eventId, eventToUpdate) => {
    return axios.put(`${baseUrl}/api/event/${eventId}/updateevent`, eventToUpdate);
}

const deleteEvent = (eventId) => axios.delete(`${baseUrl}/api/event/delete/${eventId}`);

export default { 
    getConEventsByConId, 
    addEvent, 
    updateEvent,
    deleteEvent
 };
