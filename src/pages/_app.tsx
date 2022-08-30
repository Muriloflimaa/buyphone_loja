import { NextComponentType, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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

interface AppProps {
    data: {
        data: Array<ICategory>
    }
    Component: NextComponentType<NextPageContext, any, {}>
    pageProps: any
}

export default function MyApp({ Component, pageProps, data }: AppProps) {
    const router = useRouter()
    const [width, setWidth] = useState('')

    useEffect(() => {
        if (router.asPath == '/terms' || router.asPath == '/politics') {
            setWidth('max-w-2xl')
        } else {
            setWidth('max-w-md')
        }
    })

    const userData = GetUseType()

    return (
        <AuthProvider data-theme={`${userData?.type ? 'dark' : 'light'}`}>
            {router.route === `/login` ||
            router.route === `/register` ||
            router.route === `/terms` ||
            router.route === `/politics` ||
            router.route === `/forgot-password` ? (
                <LoginRegister width={width}>
                    <Component {...pageProps} />
                </LoginRegister>
            ) : (
                <>
                    <Toaster position="top-right" reverseOrder={false} />
                    <CartProvider>
                        <NavBar dataCategory={data} />
                        <div className="py-12 md:py-20"></div>
                        <Component {...pageProps} />
                        <Footer dataCategory={data} />
                    </CartProvider>
                    <MyBottomNavigation />
                </>
            )}
        </AuthProvider>
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
