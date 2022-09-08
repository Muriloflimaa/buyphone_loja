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
            const decodedToken = jwt_decode<any>(cookies['@BuyPhone:Token']) //decodifica o token
            const timeElapsed = Date.now() // pega a data de agora
            const today = new Date(timeElapsed)
            const d = new Date(0)

            d.setUTCSeconds(decodedToken.exp) // pega a data do token e transforma ela em tempo

            const diff = Math.abs(d.getTime() - today.getTime()) //divide o tempo do token pelo tempo atual
            const days = Math.ceil(diff / (1000 * 60)) //divide o tempo atual e o tempo restante do token em Min - 60 = 1 Hora

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
            //se existir um token e se estiver dentro de 10 minutos para expirar, fazer o refresh e gravar os dados
            if (days <= 10 && days >= 0) {
                const config = {
                    'Content-type': 'application/json',
                    headers: {
                        Authorization: `Bearer ${cookies['@BuyPhone:Token']}`,
                    },
                }

                const response = await axios.post(
                    'https://loja.buyphone.com.br/api/refresh',
                    null,
                    config
                )

                // const response = await apiLogin.post('/refresh')
                const { type, name, id, profile_photo_url } = response.data.user

                const UserObject = {
                    name: name,
                    id: id,
                    type: type,
                    profile_photo_url: profile_photo_url,
                }
                const token = response.data.authorization.token

                setCookies('@BuyPhone:User', UserObject) //chama a função setCookies para gravar os dados
                setCookies('@BuyPhone:Token', token)

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
