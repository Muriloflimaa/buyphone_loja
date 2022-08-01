import '../../styles/globals.scss'
import type { AppProps } from 'next/app'
import Body from '../components/Body/Body'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Body>
            <Component {...pageProps} />
        </Body>
    )
}

export default MyApp
