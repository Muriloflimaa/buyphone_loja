import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import { useEffect } from 'react'
import { Theme } from 'react-daisyui'
import { Toaster } from 'react-hot-toast'
import '../../styles/globals.scss'
import Footer from '../components/Footer'
import LoginRegister from '../components/Login-Register'
import MyBottomNavigation from '../components/MyBottomNavigation'
import NavBar from '../components/NavBar'
import { AuthProvider } from '../context/AuthContext'
import { SearchProvider } from '../context/SearchContext'
import { CartProvider } from '../context/UseCartContext'
import { GetUseType } from '../utils/getUserType'

export default function MyApp({ Component, pageProps }: AppProps) {
  const userData = GetUseType()
  const router = useRouter()

  useEffect(() => {
    const utms = {
      utm_source: router.query.utm_source,
      utm_medium: router.query.utm_medium,
      utm_campaign: router.query.utm_campaign,
    }
    router.query.utm_source && router.query.utm_medium && router.query.utm_campaign && setCookie(null, 'UTM', JSON.stringify(utms), {
      path: '/',
    })
  }, [router])

  return (
    <Theme
      dataTheme={`${userData?.type === 1 ? 'dark' : 'light'}`}
      className="bg-base-100"
    >
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
        {router.route === `/login` ||
          router.route === `/register` ||
          router.route === `/terms` ||
          router.route === `/politics` ||
          router.route === `/forgot-password` ? (
          <LoginRegister>
            <Component {...pageProps} />
          </LoginRegister>
        ) : (
          <>
            <SearchProvider>
              <CartProvider>
                <NavBar />
                <div className="py-12 md:py-20"></div>
                <Component {...pageProps} />
                <Footer />
              </CartProvider>
              <MyBottomNavigation />
            </SearchProvider>
          </>
        )}
      </AuthProvider>
    </Theme>
  )
}
