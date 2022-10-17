import axios from 'axios'
import { parseCookies } from 'nookies'

const { '@BuyPhone:Token': Cookies } = parseCookies()

const link = process.env.LINK_API

export function setupAPIClient(endpoint: string) {
  const api = axios.create({
    baseURL: `https://beta-api.buyphone.com.br/${endpoint}`,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${Cookies}`,
    },
  })

  return api
}

export const apiStore = setupAPIClient('store')
