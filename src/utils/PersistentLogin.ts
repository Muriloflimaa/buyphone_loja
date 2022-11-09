import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import jwt_decode from 'jwt-decode'

export function PersistentLogin<P>(
  fn: GetServerSideProps<any>,
  router: string
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<void>> => {
    const cookies = parseCookies(ctx)

    if (!cookies['@BuyPhone:Token']) {
      setCookie(ctx, '@BuyPhone:Router', router, {
        maxAge: 60 * 60 * 24, // 24h
        path: '/',
      })
      return {
        redirect: {
          destination: '/account/login',
          permanent: false,
        },
      }
    }

    if (cookies['@BuyPhone:Token']) {
      const decodedToken = jwt_decode<any>(cookies['@BuyPhone:Token']) //decodifica o token

      //se existir um token e estiver expirado, mandar para o login
      if (Date.now() >= decodedToken.exp * 1000) {
        destroyCookie(ctx, '@BuyPhone:User')
        destroyCookie(ctx, '@BuyPhone:Token')
        setCookie(ctx, '@BuyPhone:Router', router, {
          maxAge: 60 * 60 * 24, // 24h
          path: '/',
        })
        return {
          redirect: {
            destination: '/account/login',
            permanent: false,
          },
        }
      }
    }
    return await fn(ctx)
  }
}
