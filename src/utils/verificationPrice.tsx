import { IProduct } from './../types/index'

export const verificationPrice = (
  products: IProduct,
  user: string,
  isUser: boolean
) => {
  const discount =
    products.blackfriday == 1
      ? 12.5
      : !!isUser && user && JSON.parse(user)?.type === 1
      ? 12.5
      : 7 //calcula o desconto
  const itens = [
    products.price,
    products.magalu_price,
    products.americanas_price,
    products.casasbahia_price,
    products.ponto_price,
  ]
  const filteredItens = itens.filter((item) => item)
  const averagePrice = filteredItens.length > 0 ? Math.min(...filteredItens) : 0
  const discountPrice = Math.round(averagePrice * (discount / 100))
  const ourPrice = averagePrice - discountPrice
  return {
    averagePrice,
    ourPrice,
  }
}
