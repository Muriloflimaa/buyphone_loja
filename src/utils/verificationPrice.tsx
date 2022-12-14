import { IProduct, IUser } from './../types/index'

export const verificationPrice = (
  products: IProduct,
  user: IUser | null,
  isUser: boolean
) => {
  const discount =
    process.env.NEXT_PUBLIC_BLACK_FRIDAY && //black friday é ativa?
    !!JSON.parse(process.env.NEXT_PUBLIC_BLACK_FRIDAY) && //se sim pega ela
    process.env.NEXT_PUBLIC_PERCENT_DISCOUNT_BLACK_FRIDAY && // pega a variavel de desconto
    products.blackfriday == 1 //verifica se o produto está com promoção ativa
      ? parseFloat(process.env.NEXT_PUBLIC_PERCENT_DISCOUNT_BLACK_FRIDAY) //aplica o valor de desconto da variavel
      : !!isUser && user && user.type === 1 //se não for ativa verifica o tipo de user
      ? 12.5 //se for revendedor aplica 12.5
      : parseFloat(process.env.NEXT_PUBLIC_PERCENT_DISCOUNT ?? '0') //se for consumidor aplica o desconto DO CONSUMIDOR
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
