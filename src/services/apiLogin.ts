// import axios from 'axios'
import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'

let cookies = parseCookies()

export const apiLogin = axios.create({
    baseURL: 'https://loja.buyphone.com.br/api',
    headers: {
        Authorization: `Bearer ${cookies['@BuyPhone_Token']}`,
    },
})

// apiLogin.interceptors.response.use(
//     (response) => {
//         return response
//     },
//     (error: AxiosError) => {
//         if (error.response?.status == 401) {
//             if (error.response.data?.code == 'token.expired') {
//                 cookies = parseCookies()
//             } else {
//                 //deslogar o usuario
//             }
//         }
//     }
// )
