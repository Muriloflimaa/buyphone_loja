import {
  faCircleCheck,
  faCircleXmark,
  faCreditCard,
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { destroyCookie, parseCookies } from 'nookies'
import React, { useEffect, useState } from 'react'
import ProductCart from '../../../components/ProductCart'
import { TotalPayment } from '../../../components/TotalPayment'
import { useCart } from '../../../context/UseCartContext'
import { apiStoreBeta } from '../../../services/apiBetaConfigs'
import { Address, ArrayProduct, ProductPayment } from '../../../types'
import { moneyMask } from '../../../utils/masks'
import { ToastCustom } from '../../../utils/toastCustom'

export default function MatchInstallments({ address }: Address) {
  const { values, somaTotal, CleanCart } = useCart()
  const [cartSize, setCartSize] = useState<number>()
  const [matchInstallments, setMatchInstallments] = useState<string>('')
  const [stateModalSuccess, setStateModalSuccess] = useState(false)
  const [stateModalError, setStateModalError] = useState(false)
  const [installments, setInstallments] = useState<any>()
  const { '@BuyPhone:GetCredit': Getcredit } = parseCookies(undefined)

  useEffect(() => {
    if (values) {
      setCartSize(values.length)
    }
    getInstallments()
  }, [values])

  async function handleCard() {
    try {
      const setDat: ProductPayment[] = []
      values.map(async (item: ArrayProduct) => {
        const response = {
          product_id: item.id,
          price: item.priceFormated,
          qty: item.amount,
        }
        setDat.push(response)
      })

      const { data } = await apiStoreBeta.post(`checkout/credit-card`, {
        user_id: address.user_id,
        address_id: address.id,
        card_id: Getcredit,
        installments: matchInstallments,
        shippingPrice: 0,
        items: setDat,
        amount: somaTotal,
      })

      if (data.original.status === 'paid') {
        setStateModalSuccess(true)
        CleanCart()
        destroyCookie(null, '@BuyPhone:GetCep')
        destroyCookie(null, '@BuyPhone:GetCredit')
      } else {
        setStateModalError(true)
      }
    } catch (error: any) {
      if (error.response.data.errors?.document) {
        ToastCustom(3000, 'Por favor verifique o seu número de CPF', 'error')
        return
      }

      setStateModalError(true)
    }
  }

  async function getInstallments() {
    try {
      const data = {
        amount: somaTotal,
      }

      const response = await apiStoreBeta.get(`checkout/installments`, {
        params: data,
        headers: { 'contents-type': 'application/json' },
      })

      setInstallments(Object.values(response.data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 grid">
      <TotalPayment />
      {stateModalSuccess == true && (
        <div className="modal pointer-events-auto visible opacity-100 modal-bottom sm:modal-middle">
          <div className="flex flex-col gap-2 items-center text-center rounded-2xl p-10 bg-white relative z-50 max-w-md">
            <div className="bg-success shadow-sm shadow-success w-full h-fit absolute text-white -mt-10 py-10 z-10 rounded-t-2xl">
              <FontAwesomeIcon icon={faCircleCheck} className="h-20 w-h-20" />
              <h3 className="font-bold text-2xl">Sucesso!</h3>
            </div>

            <div className="divider m-0 mt-36"></div>
            <p className="font-bold text-lg text-success">
              Obrigado pela sua compra!
            </p>
            <span className="mb-6 text-success">
              O seu pedido foi aceito. <br />
              Você irá receber uma notificação com os detalhes do pedido no seu
              e-mail.
            </span>

            <Link href={'/myshopping'} passHref>
              <button className="btn btn-success max-w-xs text-white w-full rounded-full shadow-md shadow-success/60">
                Ok
              </button>
            </Link>
            <Link href={'/'} passHref>
              <a className="link  md:mb-0 text-success">
                Ir para página inicial
              </a>
            </Link>
          </div>
        </div>
      )}

      {stateModalError == true && (
        <div className="modal pointer-events-auto visible opacity-100 modal-bottom sm:modal-middle">
          <div className="flex flex-col gap-2 items-center text-center rounded-2xl p-10 bg-white relative z-50 max-w-md">
            <div className="bg-error shadow-sm shadow-error w-full h-fit absolute text-white -mt-10 py-10 z-10 rounded-t-2xl">
              <FontAwesomeIcon icon={faCircleXmark} className="h-20 w-h-20" />
              <h3 className="font-bold text-2xl">Falha!</h3>
            </div>

            <div className="divider m-0 mt-36"></div>
            <p className="font-bold text-lg text-error">
              Ops, ocorreu alguma falha no pagamento!
            </p>
            <span className="mb-6 text-error">
              Tente novamente ou contate o nosso suporte.
            </span>

            <button
              onClick={() => setStateModalError(false)}
              className="btn btn-error max-w-xs text-white w-full rounded-full shadow-md shadow-error/60"
            >
              Tentar novamente
            </button>

            <a
              target={'_blank'}
              href="#link-para-suporte"
              className="link  md:mb-0 text-error"
            >
              Contatar o suporte
            </a>
          </div>
        </div>
      )}
      <div>
        <h2 className="text-2xl md:text-3xl font-medium text-center md:text-start my-6">
          Em quantas vezes?
        </h2>
        <div className="flex flex-col-reverse md:flex-row mx-auto my-12 gap-4">
          <div className="flex flex-col w-full gap-2">
            {installments.map((res: any) => {
              return (
                <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
                  <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
                    <input
                      type="radio"
                      onClick={(e: any) => setMatchInstallments(e.target.value)}
                      value={res}
                      name="radio-6"
                      className="radio checked:bg-blue-500"
                    />
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      className="w-4 h-4 ml-5"
                    />
                    <span className="label-text text-lg">{res}</span>
                  </label>
                </div>
              )
            })}

            <div className="flex justify-end mt-4">
              <button
                onClick={handleCard}
                className={
                  'btn text-white ' +
                  (matchInstallments ? 'btn-info' : 'btn-disabled')
                }
              >
                Continuar
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
                    : 'Carrinho está vazio'}
                </span>
              </div>
            </div>
            <div className="card-body">
              {cartSize && cartSize > 0 ? (
                values.map(
                  (res) =>
                    res.id && (
                      <React.Fragment key={res.id}>
                        <ProductCart
                          id={res.id}
                          amount={res.amount}
                          name={res.product.name}
                          color={res.product.color}
                          price={res.subTotal}
                          memory={res.product.memory}
                          image={res.product.media[0].original_url}
                        />
                      </React.Fragment>
                    )
                )
              ) : (
                <div className="flex gap-3">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <h1>Carregando...</h1>
                </div>
              )}
            </div>
            <div className="card-body bg-base-200">
              <div className="flex justify-between py-4">
                <span className="text-gray-500 text-lg">Valor Total:</span>
                <span className="font-semibold text-lg">
                  R$ {moneyMask(somaTotal.toString())}
                </span>
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
