export const UniqueName = (props: any) => {
  if (props) {
    const palavras = props.split(' ')

    return FirstUpper(palavras[0])
  }
}

export const FirstAllUpper = (props: any) => {
  if (props) {
    const palavras = props.split(' ')

    for (let i = 0; i < palavras.length; i++) {
      palavras[i] = palavras[i][0].toUpperCase() + palavras[i].substring(1)
    }

    return palavras.join(' ')
  }
  return
}

const FirstUpper = (str: any) => {
  if (typeof str !== 'string') {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.substring(1)
}
