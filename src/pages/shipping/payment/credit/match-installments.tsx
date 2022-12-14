import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import React, { useContext, useEffect, useState } from 'react'
import Installments from '../../../../components/Installments'
import LoadingComponent from '../../../../components/LoadingComponent'
import ProductCart from '../../../../components/ProductCart'
import ProductPaymentComponent from '../../../../components/ProductPaymentComponent'
import { AuthContext } from '../../../../context/AuthContext'
import { useCart } from '../../../../context/UseCartContext'
import { apiStore } from '../../../../services/api'
import { moneyMask } from '../../../../utils/masks'
import { ToastCustom } from '../../../../utils/toastCustom'
import { setCookies } from '../../../../utils/useCookies'

interface installmentsProps {
  1: number | string
  2: number | string
  3: number | string
  4: number | string
  5: number | string
  6: number | string
  7: number | string
  8: number | string
  9: number | string
  10: number | string
  11: number | string
  12: number | string
}

interface GetInfoCreditProps {
  GetInfoCredit: {
    address_id: number
    amount: number
    card_cvv: number
    card_holder_name: string
    card_number: number
    document: string
    expiration_date: string
    items: Array<{}>
    shippingPrice: number
    user_id: number
  }
}

export default function MatchInstallment({
  GetInfoCredit,
}: GetInfoCreditProps) {
  const { values, somaTotal, discountValue } = useCart()
  const [cartSize, setCartSize] = useState<number>()
  const [matchInstallments, setMatchInstallments] = useState<string>('')
  const [installments, setInstallments] = useState<installmentsProps>()
  const [loading, setLoading] = useState(true)
  const { user } = useContext(AuthContext)

  const router = useRouter()

  useEffect(() => {
    if (values) {
      setCartSize(values.length)
    }
  }, [values])

  useEffect(() => {
    getInstallments()
  }, [somaTotal])

  async function handleCard() {
    const infoData = {
      ...GetInfoCredit,
      installments: matchInstallments,
    }
    destroyCookie(null, '@BuyPhone:CreditCardInfo')
    setCookies('@BuyPhone:CreditCardInfo', infoData, 60 * 5)
    router.push('/shipping/payment/credit/credit-checkout')
  }

  async function getInstallments() {
    try {
      const data = {
        amount: somaTotal,
      }

      const response = await apiStore.get(`checkout/installments`, {
        params: data,
      })
      setLoading(false)
      setInstallments(response.data)
    } catch (error) {
      ToastCustom(
        3000,
        'Ocorreu algum erro para calcular as parcelas, tente novamente ou contate o suporte.',
        'error'
      )
      try {
        const data = {
          amount: somaTotal,
        }

        const response = await apiStore.get(`checkout/installments`, {
          params: data,
        })
        setLoading(false)
        setInstallments(response.data)
      } catch (error) {}
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 grid">
      <div>
        <h2 className="text-2xl md:text-3xl font-medium text-center md:text-start my-6">
          Em quantas vezes?
        </h2>
        <div className="flex flex-col-reverse md:flex-row mx-auto my-12 gap-4">
          <div className="flex flex-col w-full gap-2">
            {cartSize && cartSize > 0 && installments && (
              <Installments
                setMatchInstallments={setMatchInstallments}
                props={installments}
              />
            )}
            {loading && <LoadingComponent />}

            <div className="flex justify-end mt-4">
              <button
                onClick={handleCard}
                className={
                  'btn self-end text-white ' +
                  (matchInstallments ? 'btn-info' : 'btn-disabled')
                }
              >
                Avan??ar
                <FontAwesomeIcon icon={faAngleRight} className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="card card-compact bg-base-100 shadow w-full h-fit">
            <div className="card-body">
              <div className="flex justify-between items-center">
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
              {/* <div className="flex justify-between py-4">
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
              </div> */}
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
  const { '@BuyPhone:CreditCardInfo': GetInfo } = parseCookies(ctx)

  if (getDataUser && cart !== '[]' && GetInfo) {
    const GetInfoCredit = JSON.parse(GetInfo)
    return {
      props: { GetInfoCredit },
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
