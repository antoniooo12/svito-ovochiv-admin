import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'http://localhost:3300',
  withCredentials: true,
});

export default instance;
