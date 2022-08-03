import '../../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Body from '../components/Body/Body'
import LoginRegister from '../components/Login-Register/Login-Register'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
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
            ) : /* config rota para renderizar apenas o component */ router.route ===
              `/category` ? (
                <Component {...pageProps} />
            ) : (
                <>
                    <Toaster position="top-right" reverseOrder={false} />
                    <Body>
                        <Component {...pageProps} />
                    </Body>
                </>
            )}
        </>
    )
}

export default MyApp
