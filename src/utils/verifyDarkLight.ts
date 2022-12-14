export function LightOrDark(black?: string, user?: string, isUser?: boolean) {
  if (
    black === 'true' ||
    (!!isUser && user && !!JSON.parse(user) && JSON.parse(user).type === 1)
  ) {
    return true
  } else {
    return false
  }
}
