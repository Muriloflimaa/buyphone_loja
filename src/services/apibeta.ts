import axios from 'axios'
import { GetServerSidePropsContext } from 'next/types'

export function setupAPIClient(
    endpoint: string,
    ctx?: GetServerSidePropsContext
) {
    const api = axios.create({
        baseURL: `https://beta-${endpoint}.buyphone.com.br/api/`,
        headers: { token: 'ef7223f0-55b4-49a7-9eed-f4b4ef14b2f1' },
    })

    return api
}
