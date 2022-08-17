import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import '../../styles/globals.scss'
import LoginRegister from '../components/Login-Register/Login-Register'
import MyBottomNavigation from '../components/MyBottomNavigation/MyBottomNavigation'
import { CartProvider } from '../hooks/useCart'

export default function MyApp({ Component, pageProps }: AppProps) {
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
                        <Component {...pageProps} />
                    </CartProvider>
                    <MyBottomNavigation />
                </>
            )}
        </>
    )
}
