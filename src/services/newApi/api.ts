import axios from 'axios'
import { parseCookies } from 'nookies'

export const link = process.env.API_URL

export function setupAPIClient(ctx?: any) {
  const { '@BuyPhone:Token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: `${link}`,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return api
}
