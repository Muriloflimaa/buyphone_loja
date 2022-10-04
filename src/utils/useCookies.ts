import { setCookie } from 'nookies'

export const setCookies = (
  key: string,
  value: string | number | object,
  time: number,
  path?: string
) => {
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  setCookie(undefined, key, value, {
    maxAge: time,
    path: path ?? '/',
  })
}
