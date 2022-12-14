import { faCreditCard } from '@fortawesome/free-regular-svg-icons'
import { faAngleRight, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import React, { useContext, useEffect, useState } from 'react'
import LoadingComponent from '../../../../components/LoadingComponent'
import ProductCart from '../../../../components/ProductCart'
import ProductPaymentComponent from '../../../../components/ProductPaymentComponent'
import { TotalPayment } from '../../../../components/TotalPayment'
import { AuthContext } from '../../../../context/AuthContext'
import { useCart } from '../../../../context/UseCartContext'
import { Address } from '../../../../types'
import { moneyMask } from '../../../../utils/masks'
import { ToastCustom } from '../../../../utils/toastCustom'
import { setCookies } from '../../../../utils/useCookies'

interface CardProps {
  brand: string
  card_id: string
  created_at: string
  holder_name: string
  id: number
  last_digits: string
  updated_at: string
  user_id: number
}

export default function CreditCheckout({ address }: Address) {
  const [matchCard, setMatchCard] = useState<string | null>(null)
  const router = useRouter()
  const [cards, setCards] = useState<CardProps[]>([])
  const { values, somaTotal, discountValue } = useCart()
  const [cartSize, setCartSize] = useState<number>()
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (values) {
      setCartSize(values.length)
    }
  }, [values])

  useEffect(() => {
    GetCreditCard()
  }, [])

  async function handleRemoveCard(id: number) {
    try {
      setCards((oldState) => oldState.filter((card) => card.id !== id))
      await axios.delete(`/api/api/store/cards/${id}`)
    } catch (error) {
      return
    }
  }

  async function GetCreditCard() {
    try {
      const { data } = await axios.get(
        `/api/api/store/cards/user/${address.user_id}`
      )
      setCards(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setCards([])
    }
  }

  function handleCard() {
    if (matchCard === 'newCard') {
      router.push('/shipping/payment/credit/new-card')
      return
    }
    if (matchCard !== null) {
      const data = {
        card_id: matchCard,
        user_id: user?.id,
        address_id: address.id,
        shippingPrice: 0,
      }

      setCookies('@BuyPhone:CreditCardInfo', data, 60 * 5)
      router.push('/shipping/payment/credit/match-installments')

      return
    } else {
      ToastCustom(3000, 'Escolha uma op????o de cart??o', 'error')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 grid">
      <TotalPayment />
      <div>
        <h2 className="text-2xl md:text-3xl font-medium text-center my-6">
          Selecione um cart??o
        </h2>
        <div className="flex flex-col-reverse md:flex-row mx-auto my-12 gap-4">
          <div className="flex flex-col w-full gap-3">
            {cards.map((res) => {
              return (
                <div key={res.id} className="flex gap-2 w-full items-center">
                  <FontAwesomeIcon
                    onClick={() => handleRemoveCard(res.id)}
                    icon={faTrash}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <div
                    key={res.id}
                    className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg"
                  >
                    <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
                      <input
                        type="radio"
                        onClick={() => setMatchCard(res.card_id.toString())}
                        name="radio-6"
                        className="radio checked:bg-blue-500"
                      />
                      <FontAwesomeIcon
                        icon={faCreditCard}
                        className="w-4 h-4 ml-5"
                      />
                      <span className="label-text text-lg">
                        {res.brand} **** {res.last_digits}
                      </span>
                    </label>
                  </div>
                </div>
              )
            })}
            {loading && <LoadingComponent />}

            <div className="flex gap-2 w-full items-center">
              {/* <div className="w-5 h-5" /> */}
              <div className="form-control w-full stat p-0 flex shadow-md rounded-lg">
                <label className="label gap-2 py-5 px-6 cursor-pointer justify-start">
                  <input
                    type="radio"
                    name="radio-6"
                    onClick={() => setMatchCard('newCard')}
                    className="radio checked:bg-blue-500"
                  />
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="w-4 h-4 ml-5"
                  />
                  <span className="label-text text-lg">
                    Novo cart??o de cr??dito
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleCard}
                className={
                  'btn self-end text-white ' +
                  (!matchCard ? 'btn-disabled' : 'btn-info')
                }
              >
                Avan??ar{' '}
                <FontAwesomeIcon icon={faAngleRight} className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="card card-compact bg-base-100 shadow w-full h-fit">
            <div className="card-body">
              <div className="flex justify-between items-center text-gray-500">
                <span className="text-lg uppercase">Meu Carrinho</span>
                <span className="font-thin text-xs">
                  {cartSize && cartSize > 1
                    ? cartSize + ' itens'
                    : cartSize == 1
                    ? cartSize + ' item'
                    : 'Carrinho est?? vazio'}
                </span>
              </div>
            </div>
            <div className="card-body">
              <ProductPaymentComponent cartSize={cartSize} values={values} />
            </div>
            <div className="card-body bg-base-200">
              {user?.promotion && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Subtotal:</span>
                    <span className="text-sm text-gray-500">
                      R$ {moneyMask((somaTotal + discountValue).toString())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-sm">Desconto:</span>
                    <span className="font-semibold text-sm text-green-600">
                      R$ -150,00
                    </span>
                  </div>
                </>
              )}
              <div className="flex justify-between py-4 items-center">
                <span className="text-gray-500 text-lg">Valor Total:</span>
                <div className="flex flex-col">
                  {user?.promotion && (
                    <span className="text-[14px] text-gray-500 line-through text-right">
                      R$ {moneyMask((somaTotal + discountValue).toString())}
                    </span>
                  )}
                  <span className="font-semibold text-lg">
                    R$ {moneyMask(somaTotal.toString())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { '@BuyPhone:GetCep': getDataUser } = parseCookies(ctx)
  const { '@BuyPhone:cart': cart } = parseCookies(ctx)

  if (!getDataUser) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  if (getDataUser && cart !== '[]') {
    const address = JSON.parse(getDataUser)
    return {
      props: { address },
    }
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
