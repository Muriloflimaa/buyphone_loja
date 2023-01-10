import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { parseCookies, setCookie } from 'nookies'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import '../../styles/globals.scss'
import Footer from '../components/Footer'
import LoginRegister from '../components/Login-Register'
import MyBottomNavigation from '../components/MyBottomNavigation'
import dynamic from 'next/dynamic'
import { hotjar } from 'react-hotjar'
import * as gtag from '../../gtag'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/UseCartContext'
import Container from '../components/Container'
import { ToastCustom } from '../utils/toastCustom'
const NavBar = dynamic(() => import('../components/NavBar'), { ssr: false })

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

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
    hotjar.initialize(3219704, 6)
    const { '@BuyPhone:Error-Bill-Of-Sale': error } = parseCookies()
    if (error) {
      ToastCustom(
        6000,
        'Você precisa ser dono da nota fiscal para visualizá-la',
        'error'
      )
    }
  }, [])

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
        <Container>
          {router.route === `/account/login` ||
          router.route === `/account/register` ||
          router.route === `/account/terms` ||
          router.route === `/account/politics` ||
          router.route === `/reset-password/[index]` ||
          router.route === `/account/forgot-password` ? (
            <LoginRegister>
              <Component {...pageProps} />
            </LoginRegister>
          ) : router.route === `/institucional` ||
            router.route === `/institucional/depoimentos` ||
            router.route === `/bill-of-sale/[index]` ? (
            <Component {...pageProps} />
          ) : (
            <CartProvider>
              <NavBar />
              <div className="py-16"></div>
              <Component {...pageProps} />
              <Footer />
              <MyBottomNavigation />
            </CartProvider>
          )}
        </Container>
      </AuthProvider>
    </>
  )
}
