import { getCookie } from 'cookies-next'
import { setCookie } from 'nookies'

export const setCookies = (
  key: string,
  value: string | number | object,
  time?: number | undefined,
  path?: string
) => {
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  setCookie(undefined, key, value, {
    maxAge: time ?? 60 * 60 * 24 * 30,
    path: path ?? '/',
  })
}

export function useCookies(key: string, ctx?: any) {
  const cookies = getCookie(key, ctx)
  // if (cookies && cookies !== true && typeof cookies !== 'string') {
  //   return JSON.parse(cookies)
  // }
  return cookies ?? null
}
