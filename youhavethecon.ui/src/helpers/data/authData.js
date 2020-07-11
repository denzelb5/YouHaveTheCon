import axios from 'axios';
import { baseUrl } from '../apiKeys.json';



const loginUser = (email) => {
  axios.get(`${baseUrl}/api/user/email/${email}`).then((userResponse) => {
    sessionStorage.setItem('userId', userResponse.id);
  });
};

const logoutUser = () => {
  sessionStorage.removeItem('userId');
};

const getUserId = () => sessionStorage.getItem('userId');

export default {
  getUserId,
  loginUser,
  logoutUser,
};