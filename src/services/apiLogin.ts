import axios from 'axios'
import { parseCookies } from 'nookies'

const { '@BuyPhone:Token': Cookies } = parseCookies()

export const apiLogin = axios.create({
    baseURL: 'https://loja.buyphone.com.br/api',
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${Cookies}`,
    },
})
