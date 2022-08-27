import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
} from 'next'
import { parseCookies } from 'nookies'
import { apiLogin } from '../services/apiLogin'
import jwt_decode from 'jwt-decode'

export function WithSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (
        ctx: GetServerSidePropsContext
    ): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx)

        if (cookies['@BuyPhone:Token']) {
            const decodedToken = jwt_decode<any>(cookies['@BuyPhone:Token']) //decodifica o token
            const timeElapsed = Date.now() // pega a data de agora
            const today = new Date(timeElapsed)
            const d = new Date(0)

            d.setUTCSeconds(decodedToken.exp) // pega a data do token e transforma ela em tempo

            const diff = Math.abs(d.getTime() - today.getTime()) //divide o tempo do token pelo tempo atual
            const days = Math.ceil(diff / (1000 * 60)) //divide o tempo atual e o tempo restante do token em Min - 60 = 1 Hora

            //se faltar 10 minutos para o token expirar chama o refresh e seta tudo no cookies novamente
            if (days < 10 && days > 0) {
                apiLogin.post('/refresh')
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    },
                }
            }
            if (days > 10) {
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    },
                }
            }
        }
        return await fn(ctx)
    }
}

// export const withSSRGuest =
//     <P>(fn: GetServerSideProps<P>) =>
//     async (
//         ctx: GetServerSidePropsContext
//     ): Promise<GetServerSidePropsResult<P>> => {
//         const cookies = parseCookies(ctx)

//         if (cookies['@BuyPhone:Token']) {
//             const decodedToken = jwt_decode<any>(cookies['@BuyPhone:Token']) //decodifica o token
//             const timeElapsed = Date.now() // pega a data de agora
//             const today = new Date(timeElapsed)
//             const d = new Date(0)

//             d.setUTCSeconds(decodedToken) // pega a data do token e transforma ela em tempo

//             const diff = Math.abs(d.getTime() - today.getTime()) //divide o tempo do token pelo tempo atual
//             const days = Math.ceil(diff / (1000 * 60)) //divide o tempo atual e o tempo restante do token em Min - 60 = 1 Hora

//             //se faltar 10 minutos para o token expirar chama o refresh e seta tudo no cookies novamente
//             if (days < 10 && days > 0) {
//                 apiLogin.post('/refresh')
//                 return {
//                     redirect: {
//                         destination: '/',
//                         permanent: false,
//                     },
//                 }
//             }
//             if (days > 10) {
//                 return {
//                     redirect: {
//                         destination: '/',
//                         permanent: false,
//                     },
//                 }
//             }
//         }

//         return fn(ctx)
//     }
