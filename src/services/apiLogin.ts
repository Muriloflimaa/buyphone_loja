import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'

const { '@BuyPhone:Token': Cookies } = parseCookies()

export const apiLogin = axios.create({
    baseURL: 'https://loja.buyphone.com.br/api',
    headers: {
        Authorization: `Bearer ${Cookies}`,
    },
})
