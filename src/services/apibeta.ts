import axios, { AxiosError } from 'axios'

export const apiBeta = axios.create({
    baseURL: `https://beta-pedidos.buyphone.com.br/api/`,
    headers: { token: 'ef7223f0-55b4-49a7-9eed-f4b4ef14b2f1' },
})
