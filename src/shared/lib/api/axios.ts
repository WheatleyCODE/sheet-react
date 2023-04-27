import axios from 'axios';
import { API } from 'shared/consts/api';

const axiosInstance = axios.create({
  baseURL: API,
});

export const $api = axiosInstance;
