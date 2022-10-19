import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { parseCookies, setCookie } from 'nookies'
import { useEffect, useState } from 'react'
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
import { LightOrDark } from '../utils/verifyDarkLight'

export default function MyApp({ Component, pageProps }: AppProps) {
  const { '@BuyPhone:User': user } = parseCookies(undefined)
  const [isUser, setIsUser] = useState(false)
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
    if (user) {
      setIsUser(true)
    }
  }, [user]) //realiza verificacao de user para nao dar erro de renderização

  LightOrDark(process.env.NEXT_PUBLIC_BLACK_FRIDAY, user, isUser)

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
                <Component
                  {...pageProps}
                  darkOrLigth={LightOrDark(
                    process.env.NEXT_PUBLIC_BLACK_FRIDAY,
                    user,
                    isUser
                  )}
                />
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
