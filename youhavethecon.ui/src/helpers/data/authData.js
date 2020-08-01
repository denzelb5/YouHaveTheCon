import axios from 'axios';
import { baseUrl } from '../apiKeys.json';



const loginUser = (email) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/api/user/email/${email}`)
  .then((userResponse) => {
    sessionStorage.setItem('userId', userResponse.data.userId);
    resolve(userResponse.data)
  })
  .catch((error) => reject(error));
});

const logoutUser = () => {
  sessionStorage.removeItem('userId');
};

const getUserId = () => sessionStorage.getItem('userId');


const authed = () => !!sessionStorage.getItem('userId');

export default {
  getUserId,
  loginUser,
  logoutUser,
  authed
};