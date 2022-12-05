import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { destroyCookie, parseCookies } from 'nookies'
import React, { useEffect, useState } from 'react'
import LoadingComponent from '../../../../components/LoadingComponent'
import ProductCart from '../../../../components/ProductCart'
import { useCart } from '../../../../context/UseCartContext'
import { apiStore } from '../../../../services/api'
import { ArrayProduct, ProductPayment } from '../../../../types'
import { GetUseType } from '../../../../utils/getUserType'
import { moneyMask } from '../../../../utils/masks'
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

interface DataProps {
  data: {
    amount: number
    created_at: string
    id: number
    invoice_id: string
    order_id: number
    status: string
    updated_at: string
  }
}

export default function creditFinally({
  GetInfoCredit,
  address,
}: GetInfoCreditProps) {
  const user = GetUseType()
  const { values, somaTotal, CleanCart, somaTotalInteger } = useCart()
  const [cartSize, setCartSize] = useState<number>()
  const discountValue = 15000
  const [stateModalSuccess, setStateModalSuccess] = useState(false)
  const [stateModalError, setStateModalError] = useState(false)
  const [products, setProducts] = useState<ProductPayment[]>([])
  const [disableFinally, setDisableFinally] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingInstallments, setLoadingInstallments] = useState(true)
  const [installments, setInstallments] = useState(0)

  useEffect(() => {
    if (values) {
      setCartSize(values.length)
    }
  }, [values])

  async function getPriceInstallments() {
    try {
      const data = {
        amount: somaTotal,
      }

      const { data: response } = await apiStore.get(
        `checkout/installments/${GetInfoCredit.installments}`,
        {
          params: data,
        }
      )
      setInstallments(response[0])
      setLoadingInstallments(false)
    } catch (error) {}
  }
  getPriceInstallments()

  async function handlePayment() {
    setDisableFinally(true)
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
      const infoData = {
        ...GetInfoCredit,
        card_holder_phone: '+55' + GetInfoCredit.card_holder_phone,
        amount: somaTotalInteger,
        items: setDat,
      }

      const { data }: DataProps = await apiStore.post(
        `checkout/credit-card`,
        infoData
      )

      setDisableFinally(false)
      setProducts(setDat)
      setLoading(false)
      if (data.status === 'created' || data.status === 'paid') {
        setCookies('@BuyPhone:SuccessShipping', 'true', 60 * 5)
        setStateModalSuccess(true)
        CleanCart()
        destroyCookie(null, '@BuyPhone:GetCep')
        destroyCookie(null, '@BuyPhone:CreditCardInfo')
        destroyCookie(undefined, '@BuyPhone:GetCep')
        destroyCookie(undefined, '@BuyPhone:CreditCardInfo')
        destroyCookie({}, '@BuyPhone:CreditCardInfo')
        destroyCookie({}, '@BuyPhone:GetCep')
        return
      } else {
        setDisableFinally(false)
        setProducts(setDat)
        setLoading(false)
        setStateModalError(true)
        return
      }
    } catch (error: any) {
      setDisableFinally(false)
      setProducts(setDat)
      setLoading(false)
      setProducts(setDat)
      setStateModalError(true)
    }
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
              Você irá receber uma notificação com os detalhes do pedido no seu
              e-mail.
            </span>

            <Link href={'/purchased'} passHref>
              <button className="btn btn-primary max-w-xs text-white w-full shadow-md shadow-primary/60">
                Ok
              </button>
            </Link>
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

            {/* <a
              target={'_blank'}
              href={`https://api.whatsapp.com/send?phone=5518981367275&text=${
                products && JSON.stringify(products)
              }${maskReais(
                GetInfoCredit?.installments && GetInfoCredit?.installments
              )}`}
              className="link  md:mb-0 text-error"
            >
              Contatar o suporte
            </a> */}
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 grid">
        <div className="relative w-full">
          <h2 className="text-2xl md:text-3xl text-center font-medium my-6">
            Conferir e Finalizar
          </h2>
          <div className="flex flex-col justify-center items-center gap-6 max-w-3xl mx-auto mt-4 mb-12 pt-6 border-t border-base-300">
            <h3 className="text-2xl font-medium">Aparelho(s)</h3>

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
                        blackfriday={res.product.blackfriday}
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
          <div className="flex flex-col justify-center items-center gap-6 max-w-3xl mx-auto mt-4 mb-12 pt-6 border-t border-base-300">
            <h3 className="text-2xl font-medium">Enviar para</h3>
            <div className="flex justify-between gap-4 w-full">
              <div className="flex flex-col">
                <strong>Endereço:</strong>
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
                <strong>Opção:</strong>
                <span>Crédito</span>
              </div>
              <div className="flex flex-col items-end">
                <strong>Condição:</strong>
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
                  R$ {moneyMask((somaTotal + discountValue).toString())}
                </span>
                {user?.promotion && (
                  <span className="text-green-600">
                    {' '}
                    R$ -{moneyMask(discountValue.toString())}
                  </span>
                )}
                <span className="text-green-600">Grátis</span>
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
                    (disableFinally && 'btn-disabled')
                  }
                >
                  {disableFinally
                    ? 'Processando pedido...'
                    : 'Finalizar Compra'}
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
