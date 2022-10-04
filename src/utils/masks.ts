export const moneyMask = (value: string) => {
  var tmp = value + ''
  tmp = tmp.replace(/([0-9]{2})$/g, ',$1')
  if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2')

  return tmp
}

export const date = (date: string) => {
  const convert = new Date(date).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  })
  return convert.split(' ')[0]
}

export const cpfMask = (value: string) => {
  value = value + ''

  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  } else {
    value = value.replace(/^(\d{2})(\d)/, '$1.$2')
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2')
    value = value.replace(/(\d{4})(\d)/, '$1-$2')
  }

  return value
}

export function maskCpfInput(evt: any) {
  var v = evt?.target.value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')

  evt.target.value = v
}

export function maskCreditCard(evt: any) {
  var v = evt?.target.value
  v = v.replace(/\D/g, '') // Permite apenas dígitos
  v = v.replace(/(\d{4})/g, '$1 ') // Coloca um ponto a cada 4 caracteres
  v = v.replace(/\.$/, '') // Remove o ponto se estiver sobrando
  v = v.substring(0, 19) // Limita o tamanho

  evt.target.value = v
}

export function maskExpirationDate(evt: any) {
  var v = evt?.target.value
  v = v.replace(/\D/g, '') // Permite apenas dígitos
  v = v.replace(/(\d{2})/g, '$1/') // Coloca um / a cada 2 caracteres
  v = v.substring(0, 5) // Limita o tamanho
  evt.target.value = v
}

export function maskMustNumber(evt: any) {
  var v = evt?.target.value
  v = v.replace(/\D/g, '') // Permite apenas dígitos
  v = v.substring(0, 5) // Limita o tamanho
  evt.target.value = v
}

export function masktel(evt: any) {
  var v = evt?.target.value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2')
  evt.target.value = v
}

export function mascaraCep(t: any, mask: string) {
  var i = t.value.length
  var saida = mask.substring(1, 0)
  var texto = mask.substring(i)
  if (texto.substring(0, 1) != saida) {
    t.value += texto.substring(0, 1)
  }
}
