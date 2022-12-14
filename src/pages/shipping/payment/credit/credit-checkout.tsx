import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import React, { useContext, useEffect, useState } from 'react'
import LoadingComponent from '../../../../components/LoadingComponent'
import ProductCart from '../../../../components/ProductCart'
import ProductPaymentComponent from '../../../../components/ProductPaymentComponent'
import { AuthContext } from '../../../../context/AuthContext'
import { useCart } from '../../../../context/UseCartContext'
import { apiStore } from '../../../../services/api'
import { ArrayProduct, ProductPayment } from '../../../../types'
import { moneyMask } from '../../../../utils/masks'
import { ToastCustom } from '../../../../utils/toastCustom'
import { setCookies } from '../../../../utils/useCookies'

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
    installments: number
    card_holder_birthdate?: string
    card_holder_phone?: string
  }
  address: {
    address: string
    city: string
    complement: string | null
    created_at: string
    id: number
    neighborhood: string
    number: number
    postal_code: string
    uf: string
    updated_at: string
    user_id: number
  }
}

export default function creditFinally({
  GetInfoCredit,
  address,
}: GetInfoCreditProps) {
  const { user } = useContext(AuthContext)
  const { values, somaTotal, CleanCart, somaTotalInteger } = useCart()
  const [cartSize, setCartSize] = useState<number>()
  const discountValue = 15000
  const [stateModalSuccess, setStateModalSuccess] = useState(false)
  const [stateModalError, setStateModalError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingInstallments, setLoadingInstallments] = useState(true)
  const [installments, setInstallments] = useState(0)
  const router = useRouter()
  const [dataSuccess, setDataSuccess] = useState<any>()

  useEffect(() => {
    if (values) {
      setCartSize(values.length)
    }
  }, [values])

  useEffect(() => {
    getPriceInstallments()
  }, [somaTotal])

  async function getPriceInstallments() {
    if (somaTotal > 0) {
      try {
        const data = {
          amount: somaTotal,
        }

        const { data: response } = await apiStore.get(
          `/checkout/installments/${GetInfoCredit.installments}`,
          {
            params: data,
          }
        )
        setInstallments(response[0])
        setLoadingInstallments(false)
      } catch (error) {
        router.push('/shipping/payment/credit/credit-checkout')
      }
    }
  }

  async function handlePayment() {
    setLoading(true)
    const setDat: ProductPayment[] = []
    values.map(async (item: ArrayProduct) => {
      const response = {
        product_id: item.id,
        price: item.priceFormated,
        qty: item.amount,
      }
      setDat.push(response)
    })
    try {
      const mobile_phone =
        GetInfoCredit.card_holder_phone !== undefined
          ? '+55' + GetInfoCredit.card_holder_phone
          : user?.mobile_phone //pega o mobile phone digitado, se for undefined pega o do context

      const infoData = {
        ...GetInfoCredit,
        user_id: user?.id,
        card_holder_phone: mobile_phone,
        amount: somaTotalInteger,
        items: setDat,
      }

      const { data } = await axios.post(
        `/api/api/store/checkout/credit-card`,
        infoData
      )

      setDataSuccess(data)
      setLoading(false)
      setStateModalSuccess(true)
    } catch (error: any) {
      if (error.response.data.errors) {
        if (error.response.data.errors.document) {
          ToastCustom(5000, 'O campo de CPF ?? inv??lido!', 'error')
          router.push('/shipping/payment/credit/new-card')
          setCookies(
            '@BuyPhone:RedirectCheckout',
            '/shipping/payment/credit/credit-checkout',
            60 * 5
          )
          return
        }
        if (error.response.data.errors.card_holder_phone) {
          ToastCustom(5000, 'O campo de Telefone ?? inv??lido!', 'error')
          router.push('/shipping/payment/credit/new-card')
          setCookies(
            '@BuyPhone:RedirectCheckout',
            '/shipping/payment/credit/credit-checkout',
            60 * 5
          )
          return
        }
      }
      setLoading(false)
      setStateModalError(true)
    }
  }

  function handlePurchased() {
    destroyCookie(null, '@BuyPhone:GetCep')
    destroyCookie(null, '@BuyPhone:CreditCardInfo')
    destroyCookie(undefined, '@BuyPhone:GetCep')
    destroyCookie(undefined, '@BuyPhone:CreditCardInfo')
    destroyCookie({}, '@BuyPhone:CreditCardInfo')
    destroyCookie({}, '@BuyPhone:GetCep')
    setCookies('@BuyPhone:SuccessShipping', 'true', 60 * 5)
    setCookies('@BuyPhone:OrderId', dataSuccess.order_id, 60 * 5)
    setCookies('@BuyPhone:ValueOrder', somaTotalInteger, 60 * 5)
    CleanCart()
    router.push('/purchased')
  }

  return (
    <>
      {loading && (
        <>
          <input
            type="checkbox"
            id="my-modal-5"
            className="modal-toggle modal-open"
          />
          <div className="modal modal-open">
            <div className="modal-box bg-transparent shadow-none flex justify-center items-center max-w-5xl">
              <LoadingComponent message={'Processando Pedido...'} />
            </div>
          </div>
        </>
      )}
      {stateModalSuccess && (
        <div className="modal pointer-events-auto visible opacity-100 modal-bottom sm:modal-middle">
          <div className="flex flex-col gap-2 items-center text-center rounded-2xl p-10 bg-white relative z-50 max-w-md">
            <div className="bg-primary w-full h-fit absolute text-white -mt-10 py-10 z-10 rounded-t-2xl">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="h-20 w-h-20 mx-auto"
              />
              <h3 className="font-bold text-2xl mt-3">Sucesso!</h3>
            </div>

            <div className="m-0 mt-44"></div>
            <p className="font-bold text-lg text-primary">
              Obrigado pela sua compra!
            </p>
            <span className="mb-6 text-primary">
              O seu pedido foi aceito. <br />
              Voc?? ir?? receber uma notifica????o com os detalhes do pedido no seu
              e-mail.
            </span>

            <button
              onClick={handlePurchased}
              className="btn btn-primary max-w-xs text-white w-full shadow-md shadow-primary/60"
            >
              Ok
            </button>
          </div>
        </div>
      )}

      {stateModalError && (
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
            <button
              onClick={() => (
                setStateModalError(false),
                router.push('/shipping/payment/credit/new-card')
              )}
              className="btn btn-error max-w-xs text-white w-full rounded-full shadow-md shadow-error/60"
            >
              Alterar dados do cart??o
            </button>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 grid md:my-10">
        <div className="relative w-full">
          <h2 className="text-2xl md:text-3xl text-center font-medium my-6">
            Conferir e Finalizar
          </h2>
          <div className="flex flex-col justify-center items-center gap-6 max-w-3xl mx-auto mt-4 mb-12 pt-6 border-t border-base-300">
            <h3 className="text-2xl font-medium">Aparelho(s)</h3>

            <ProductPaymentComponent cartSize={cartSize} values={values} />
          </div>
          <div className="flex flex-col justify-center items-center gap-6 max-w-3xl mx-auto mt-4 mb-12 pt-6 border-t border-base-300">
            <h3 className="text-2xl font-medium">Enviar para</h3>
            <div className="flex justify-between gap-4 w-full">
              <div className="flex flex-col">
                <strong>Endere??o:</strong>
                <span>{`${address?.address}, ${address?.number}`}</span>
                <span></span>
                <span>{address?.neighborhood}</span>
                <span></span>
                <span>{address?.city}</span>
                <span></span>
              </div>
              <div className="flex flex-col">
                <strong>Comprador:</strong>
                <span>{user?.name}</span>
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-6 max-w-3xl mx-auto mt-4 mb-12 pt-6 border-t border-base-300">
            <h3 className="text-2xl font-medium">Pagamento</h3>
            <div className="flex justify-between gap-4 w-full">
              <div className="flex flex-col">
                <strong>Op????o:</strong>
                <span>Cr??dito</span>
              </div>
              <div className="flex flex-col items-end">
                <strong>Condi????o:</strong>
                {loadingInstallments ? (
                  <LoadingComponent />
                ) : (
                  <span>{`${GetInfoCredit.installments}x de ${moneyMask(
                    installments.toString()
                  )}`}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-6 max-w-3xl mx-auto mt-4 mb-12 py-6 border-y border-base-300">
            <h3 className="text-2xl font-medium">Total</h3>
            <div className="flex justify-between gap-4 w-full">
              <div className="flex flex-col">
                <strong>Subtotal</strong>
                <strong>Desconto</strong>
                <strong>Frete</strong>
              </div>
              <div className="flex flex-col">
                <span>
                  R${' '}
                  {loadingInstallments ? (
                    <LoadingComponent />
                  ) : (
                    moneyMask(
                      (
                        installments * GetInfoCredit.installments +
                        (user?.promotion ? discountValue : 0)
                      ).toString()
                    )
                  )}
                </span>
                {user && user.promotion ? (
                  <span className="text-green-600">
                    {' '}
                    R$ -{moneyMask(discountValue.toString())}
                  </span>
                ) : (
                  'R$ 0,00'
                )}
                <span className="text-green-600">Gr??tis</span>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center z-50">
            <div className="fixed bottom-[-10px] mb-20 md:mb-4 text-primary-content card card-compact glass w-[98%] md:w-80 z-50">
              <div className="card-body bg-primary/90 ">
                <div className="flex justify-between gap-4 w-full text-xl">
                  <span>Total</span>
                  {loadingInstallments ? (
                    <LoadingComponent />
                  ) : (
                    <span>
                      R${' '}
                      {moneyMask(
                        (installments * GetInfoCredit.installments).toString()
                      )}
                    </span>
                  )}
                </div>
                <a
                  onClick={() => handlePayment()}
                  className={
                    'flex btn btn-info text-white w-full ' +
                    (loading && 'btn-disabled')
                  }
                >
                  {loading ? 'Processando pedido...' : 'Finalizar Compra'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { '@BuyPhone:GetCep': getDataUser } = parseCookies(ctx)
  const { '@BuyPhone:cart': cart } = parseCookies(ctx)
  const { '@BuyPhone:CreditCardInfo': GetInfo } = parseCookies(ctx)

  if (getDataUser && cart !== '[]' && GetInfo) {
    const GetInfoCredit = JSON.parse(GetInfo)
    const address = JSON.parse(getDataUser)
    return {
      props: { GetInfoCredit, address },
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
