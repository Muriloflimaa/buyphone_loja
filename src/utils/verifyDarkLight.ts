import { IUser } from '../types'

export function LightOrDark(
  black?: string,
  user?: IUser | null,
  isUser?: boolean
) {
  if (black === 'true' || (!!isUser && user && user && user.type === 1)) {
    return true
  } else {
    return false
  }
}
