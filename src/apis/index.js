import axios from 'axios';
import server from '../configs/server';

export default axios.create({
  baseURL: server.ROOT_ENDPOINT,
  headers: {
    Accept: 'application/json',
  },
});
