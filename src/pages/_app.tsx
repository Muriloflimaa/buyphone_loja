import { NextComponentType, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import '../../styles/globals.scss'
import Footer from '../components/Footer'
import LoginRegister from '../components/Login-Register/Login-Register'
import MyBottomNavigation from '../components/MyBottomNavigation/MyBottomNavigation'
import NavBar from '../components/NavBar/NavBar'
import { CartProvider } from '../hooks/useCart'
import { apiPedidos } from '../services/apiClient'
import { ICategory } from '../types'

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

    return (
        <>
            {router.route === `/login` ||
            router.route === `/register` ||
            router.route === `/terms` ||
            router.route === `/politics` ||
            router.route === `/forgout-password` ? (
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
        </>
    )
}

MyApp.getInitialProps = async () => {
    const { data } = await apiPedidos.get(`categories/`)

    return {
        data: data,
    }
}
