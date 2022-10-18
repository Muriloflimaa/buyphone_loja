import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { IProduct } from './../types/index'

export const verificationPrice = (products: IProduct) => {
  const { '@BuyPhone:User': user } = parseCookies(undefined) //pega user dos cookies, cookies atualizado pelo authContext
  const [isUser, setIsUser] = useState(false) //state para verificar se existe user

  useEffect(() => {
    if (user) {
      setIsUser(true)
    }
  }, [user]) //atualiza o state para nao dar erro de renderizacao

  const discount = !!isUser && user && JSON.parse(user)?.type === 1 ? 12.5 : 7 //calcula o disconto
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
