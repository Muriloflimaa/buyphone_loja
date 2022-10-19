export function LightOrDark(black?: any, user?: any, isUser?: any) {
  if (black === 'true' || (!!isUser && user && JSON.parse(user).type === 1)) {
    return true
  } else {
    return false
  }
}
