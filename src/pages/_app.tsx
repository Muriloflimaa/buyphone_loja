import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { parseCookies, setCookie } from 'nookies'
import { useEffect, useState } from 'react'
import { Theme } from 'react-daisyui'
import { Toaster } from 'react-hot-toast'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import '../../styles/globals.scss'
import Footer from '../components/Footer'
import LoginRegister from '../components/Login-Register'
import MyBottomNavigation from '../components/MyBottomNavigation'
// import NavBar from '../components/NavBar'
import dynamic from 'next/dynamic'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/UseCartContext'
import { LightOrDark } from '../utils/verifyDarkLight'
import * as gtag from '../../gtag'
const NavBar = dynamic(() => import('../components/NavBar'), { ssr: false })
import { hotjar } from 'react-hotjar'

export default function MyApp({ Component, pageProps }: AppProps) {
  const { '@BuyPhone:User': user } = parseCookies(undefined)
  const [isUser, setIsUser] = useState(false)
  const router = useRouter()
  LightOrDark(process.env.NEXT_PUBLIC_BLACK_FRIDAY, user, isUser)

  useEffect(() => {
    const utms = {
      utm_source: router.query.utm_source,
      utm_medium: router.query.utm_medium,
      utm_campaign: router.query.utm_campaign,
    }
    router.query.utm_source &&
      router.query.utm_medium &&
      router.query.utm_campaign &&
      setCookie(null, 'UTM', JSON.stringify(utms), {
        path: '/',
      })
  }, [router])

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    if (user) {
      setIsUser(true)
    }
  }, [user]) //realiza verificacao de user para nao dar erro de renderização

  useEffect(() => {
    hotjar.initialize(3219704, 6)
  }, [])

  return (
    <Theme
      dataTheme={`${
        process.env.NEXT_PUBLIC_BLACK_FRIDAY &&
        !!JSON.parse(process.env.NEXT_PUBLIC_BLACK_FRIDAY)
          ? 'dark'
          : !!isUser && user && JSON.parse(user).type === 1
          ? 'dark'
          : 'light'
      }`}
      className="bg-base-100"
    >
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
        {router.route === `/account/login` ||
        router.route === `/account/register` ||
        router.route === `/account/terms` ||
        router.route === `/account/politics` ||
        router.route === `/account/forgot-password` ? (
          <LoginRegister>
            <Component {...pageProps} />
          </LoginRegister>
        ) : router.route === `/institucional` ? (
          <Component {...pageProps} />
        ) : (
          <CartProvider>
            <NavBar />
            <div className="py-16"></div>
            <Component
              {...pageProps}
              darkOrLigth={LightOrDark(
                process.env.NEXT_PUBLIC_BLACK_FRIDAY,
                user,
                isUser
              )}
            />
            <Footer />
            <MyBottomNavigation />
          </CartProvider>
        )}
      </AuthProvider>
    </Theme>
  )
}
