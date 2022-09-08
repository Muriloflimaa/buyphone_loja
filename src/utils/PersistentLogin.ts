import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import { apiLogin } from '../services/apiLogin'
import jwt_decode from 'jwt-decode'
import { setCookies } from '../context/AuthContext'
import axios from 'axios'

export function PersistentLogin<P>(fn: GetServerSideProps<any>) {
    return async (
        ctx: GetServerSidePropsContext
    ): Promise<GetServerSidePropsResult<void>> => {
        const cookies = parseCookies(ctx)

        if (cookies['@BuyPhone:Token']) {
            //se existe um token entrar aqui!
            const decodedToken = jwt_decode<any>(cookies['@BuyPhone:Token']) //decodifica o token

            //se existir um token e estiver expirado, mandar para o login
            if (Date.now() >= decodedToken.exp * 1000) {
                destroyCookie(undefined, '@BuyPhone:User')
                destroyCookie(undefined, '@BuyPhone:Token')
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false,
                    },
                }
            }
        }
        return await fn(ctx)
    }
}
