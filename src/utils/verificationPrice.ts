import { IProduct } from './../types/index'
import { GetUseType } from './getUserType'

export const verificationPrice = (products: IProduct) => {
    const userData = GetUseType()
    const discount = userData?.type === 1 ? 12.5 : 7
    const itens = [
        products.price,
        products.magalu_price,
        products.americanas_price,
        products.casasbahia_price,
        products.ponto_price,
    ]
    const filteredItens = itens.filter((item) => item)
    const averagePrice =
        filteredItens.length > 0 ? Math.min(...filteredItens) : 0
    const discountPrice = Math.round(averagePrice * (discount / 100))
    const ourPrice = averagePrice - discountPrice

    return {
        averagePrice,
        ourPrice,
    }
}
