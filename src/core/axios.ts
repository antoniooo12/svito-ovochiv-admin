import Axios from 'axios';

const instance = Axios.create({
  // baseURL: 'http://localhost:3300',
  baseURL: 'http://31.172.70.135:3300',
  // url: '*',
  // withCredentials: true,
  // proxy: {
  //   host: '127.0.0.1',
  //   port: 3300,
  // },
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
  //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  // },
});

export default instance;
