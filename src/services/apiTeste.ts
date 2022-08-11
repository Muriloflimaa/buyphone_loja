import axios from 'axios';

export const apiTeste = axios.create({
  baseURL: 'http://localhost:3333',
});
