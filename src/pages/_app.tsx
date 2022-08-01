import '../../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Body from '../components/Body/Body'

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()
    return (
        <>
            {router.route === `/login` ? (
                <Component {...pageProps} />
            ) : (
                <>
                    <Body>
                        <Component {...pageProps} />
                    </Body>
                </>
            )}
        </>
    )
}

export default MyApp
