import axios from 'axios'
import { parseCookies } from 'nookies'

const { '@BuyPhone:Token': Cookies } = parseCookies(undefined)

export const link = process.env.NEXT_PUBLIC_LINK_API

export const apiStore = setupAPIClient('store')

export const api = setupAPIClient('')

export function setupAPIClient(endpoint: string) {
  const api = axios.create({
    baseURL: `${link}/${endpoint}`,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${Cookies}`,
    },
  })

  return api
}
