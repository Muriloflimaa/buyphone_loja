import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import React, { useEffect, useState } from 'react'
import LoadingComponent from '../../../../components/LoadingComponent'
import ProductCart from '../../../../components/ProductCart'
import { useCart } from '../../../../context/UseCartContext'
import { apiStore } from '../../../../services/api'
import { Address, ProductPayment } from '../../../../types'
import { GetUseType } from '../../../../utils/getUserType'
import { moneyMask } from '../../../../utils/masks'
import { ToastCustom } from '../../../../utils/toastCustom'

export default function custom({ address }: Address) {
  const [loading, setLoading] = useState(false)
  const [stateModalSuccess, setStateModalSuccess] = useState(false)
  const user = GetUseType()
  const { values, somaTotal, CleanCart } = useCart()
  const [cartSize, setCartSize] = useState<number>()
  const router = useRouter()
  const discountValue = 15000

  useEffect(() => {
    if (values) {
      setCartSize(values.length)
    }
  }, [values])

  async function handlePayment() {
    setLoading(true)
    try {
      const setDat: ProductPayment[] = []
      values.map(async (item) => {
        const response = {
          product_id: item.id,
          price: item.priceFormated,
          qty: item.amount,
        }
        setDat.push(response)
      })

      const items = {
        user_id: user.id,
        address_id: address?.id,
        amount: somaTotal,
        items: setDat,
      }
      await apiStore.post('checkout/custom', items)

      setLoading(false)
      setStateModalSuccess(true)
      destroyCookie(null, '@BuyPhone:GetCep')
      destroyCookie(null, 'USER_LEAD')
      CleanCart()
    } catch (error) {
      setLoading(false)
      ToastCustom(3000, 'Ocorreu um erro, contate o suporte.', 'error')
      CleanCart()
      destroyCookie(null, '@BuyPhone:GetCep')
      router.push('/')
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
            <div className="bg-success shadow-sm shadow-success w-full h-fit absolute text-white -mt-10 py-10 z-10 rounded-t-2xl">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="h-20 w-h-20 mx-auto"
              />
              <h3 className="font-bold text-2xl mt-3">Sucesso!</h3>
            </div>

            <div className="m-0 mt-44"></div>
            <p className="font-bold text-lg text-success">
              Obrigado pelo pedido de compra!
            </p>
            <span className="mb-6 text-success">
              O seu pedido foi aceito. <br />
              Iremos redireciona-lo(a) para o whatsapp para finalizar-mos o
              pagamento.
            </span>

            <a
              onClick={() => router.push('/user/myshopping')}
              href={`https://api.whatsapp.com/send?phone=5518981367275&text=Olá,%20Realizei%20uma%20compra%20no%20modo%20personalizado%20meu%20nome%20é%20${user.name}%20e%20meu%20email%20${user.email}`}
              target={'_blank'}
            >
              <button className="btn btn-success max-w-xs text-white w-full rounded-full shadow-md shadow-success/60">
                Finalizar pagamento
              </button>
            </a>
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
                <span>Personalizado</span>
              </div>
              <div className="flex flex-col">
                <strong>Condição:</strong>
                <span>1x sem juros</span>
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
                  {' '}
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
                <div className="flex gap-4 w-full justify-between text-xl">
                  <span>Total</span>
                  <span> R$ {moneyMask(somaTotal.toString())}</span>
                </div>
                <a
                  onClick={() => handlePayment()}
                  className="flex btn btn-info text-white w-full"
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
