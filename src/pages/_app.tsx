import { NextComponentType, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'
import '../../styles/globals.scss'
import Footer from '../components/Footer'
import LoginRegister from '../components/Login-Register'
import MyBottomNavigation from '../components/MyBottomNavigation'
import NavBar from '../components/NavBar'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/UseCartContext'
import { apiPedidos } from '../services/apiClient'
import { ICategory } from '../types'
import { GetUseType } from '../utils/getUserType'
import { Theme } from 'react-daisyui'
import { SearchProvider } from '../context/SearchContext'
import { useEffect } from 'react'

interface AppProps {
  data: {
    data: Array<ICategory>
  }
  Component: NextComponentType<NextPageContext, any, {}>
  pageProps: any
}

export default function MyApp({ Component, pageProps, data }: AppProps) {
  const userData = GetUseType()
  const router = useRouter()

  useEffect(() => {
    async function Teste() {
      const { data } = await apiPedidos.get(`categories/`)
      console.log(data)
    }
    Teste()
  }, [])

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
                <NavBar dataCategory={data} />
                <div className="py-12 md:py-20"></div>
                <Component {...pageProps} />
                <Footer dataCategory={data} />
              </CartProvider>
              <MyBottomNavigation />
            </SearchProvider>
          </>
        )}
      </AuthProvider>
    </Theme>
  )
}

MyApp.getInitialProps = async () => {
  try {
    const { data } = await apiPedidos.get(`categories/`)
    return {
      data: data,
    }
  } catch (error) {
    return {
      data: null,
    }
  }
}
