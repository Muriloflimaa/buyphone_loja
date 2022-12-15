import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import jwt_decode from 'jwt-decode'

export function PersistentLogin<P>(
  fn: GetServerSideProps<any>,
  router?: string
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<void>> => {
    const { '@BuyPhone:Token': token } = parseCookies(ctx)

    if (token) {
      const decodedToken = jwt_decode<any>(token) //decodifica o token

      if (Date.now() >= decodedToken.exp * 1000) {
        destroyCookie(ctx, '@BuyPhone:Token')
        return {
          redirect: {
            destination: '/account/login',
            permanent: false,
          },
        }
      }
    }

    if (!token) {
      if (router) {
        setCookie(ctx, '@BuyPhone:Router', router, {
          maxAge: 60 * 60 * 24, // 24h
          path: '/',
        })
      }

      return {
        redirect: {
          destination: '/account/login',
          permanent: false,
        },
      }
    }

    return await fn(ctx)
  }
}
