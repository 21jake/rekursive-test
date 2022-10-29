import axios from 'axios';
import { SERVER_ENDPOINT } from './constants';


const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_ENDPOINT;

const instance = axios.create({
  baseURL: SERVER_ENDPOINT,
  timeout: TIMEOUT,
});

export default instance;
