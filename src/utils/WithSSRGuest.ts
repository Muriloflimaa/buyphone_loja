import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import jwt_decode from 'jwt-decode'

export function WithSSRGuest<P>(fn: GetServerSideProps<any>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)

    if (cookies['@BuyPhone:Token']) {
      const decodedToken = jwt_decode<any>(cookies['@BuyPhone:Token']) //decodifica o token

      //se existir um token e estiver expirado, mandar para o login
      if (Date.now() >= decodedToken.exp * 1000) {
        destroyCookie(ctx, '@BuyPhone:User')
        destroyCookie(ctx, '@BuyPhone:Token')
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        }
      }
      //se o token tiver válido mandar para a home
      else {
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
