import { useEffect, useState } from 'react'
import ProductCart from '../components/ProductCart'
import ProductTeste from '../components/ProductTeste'
import { useCart } from '../context/UseCartContext'
import { apiPedidos } from '../services/apiClient'
import { ArrayProduct } from '../types'
import { formatPrice } from '../utils/format'
import { GetUseType } from '../utils/getUserType'
import { moneyMask } from '../utils/masks'
import { verificationPrice } from '../utils/verificationPrice'

export default function Cart() {
  const { cart } = useCart()
  const cartSize = cart.length
  const [isOn, setIsOn] = useState(false)
  const [isUser, setIsUser] = useState(false)
  const user = GetUseType()
  const [showCart, setShowCart] = useState(false)
  const [somaTotal, setSomaTotal] = useState(0) //soma do total para aparecer no card carrinho
  const [data, setData] = useState<ArrayProduct | Array<{}> | any>([{}]) //state que recebe os produtos chamados da api
  const [values, setValues] = useState([]) //recebe o values do useEffect sem o item duplicado

  useEffect(() => {
    setData([]) //zera o array do data
    cart.map(async (item) => {
      try {
        const data = await apiPedidos.get(`products/${item.id}`) //chamando o produto pelo id
        const returnPrice = verificationPrice(data.data.data, user) //verificando preço
        const response = {
          ...item, //adicionando amount e id que está no localstorage
          product: data.data.data, //data vem da api que é chamada
          priceFormated: returnPrice.ourPrice, //formatação de preços
          subTotal: returnPrice.ourPrice * item.amount, //total simples
        }
        setData((data: Array<{}>) => [...data, response]) //gravando response no state
      } catch (error) {
        setData([]) //se der erro zerar o data com um array vazio
      }
    })
  }, [cart])

  useEffect(() => {
    const values = data.filter(function (this: any, a: any) {
      return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true)
    }, Object.create(null)) //removendo items duplicados do array, o data manda o primeiro produto adicionado 2x
    setValues(values) //setando values para dar o map no productCart

    const total = values.map((product: ArrayProduct) => {
      return product.subTotal
    }, 0) //da um map nos produtos e adiciona a const total

    var soma = 0
    for (var i = 0; i < total.length; i++) {
      soma += total[i]
    }
    setSomaTotal(soma) //somando produtos e setando no state
  }, [data])

  return (
    <>
      <div className="max-w-7xl mx-5 my-10 flex flex-col gap-3">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="uppercase text-xl font-light text-info-content">
            Meu carrinho
          </h1>
          <span className="text-xs font-light text-info-content">
            {cartSize > 1
              ? cartSize + ' itens'
              : cartSize == 1
              ? cartSize + ' item'
              : ''}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {cartSize > 0 ? (
            values.map((res: ArrayProduct) => (
              <li className="list-none" key={res?.id}>
                <ProductTeste
                  id={res?.id}
                  amount={res?.amount}
                  name={res?.product?.name}
                  color={res?.product?.color}
                  price={res?.subTotal}
                  memory={res?.product?.memory}
                  image={res?.product?.media[0].original_url}
                />
                {/* commits(apagar depois) !!raul - aqui eu removi o ProductCart para nao fazer map dentro dele denovo - o useEffect está dando erros */}
              </li>
            ))
          ) : (
            <div className="flex justify-center">
              {' '}
              <h1>Carrinho vazio</h1>
            </div>
          )}
        </div>
        {cartSize > 0 && (
          <div className="flex justify-between">
            <span className="text-info-content text-lg">Valor Total:</span>
            <span className="font-semibold text-info-content text-lg">
              R$ {moneyMask(somaTotal?.toString())}
            </span>
          </div>
        )}
      </div>
    </>
  )
}
