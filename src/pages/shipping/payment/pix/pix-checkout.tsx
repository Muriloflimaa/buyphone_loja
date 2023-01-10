import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import React, { useContext, useEffect, useState } from 'react'
import LoadingComponent from '../../../../components/LoadingComponent'
import ProductPaymentComponent from '../../../../components/ProductPaymentComponent'
import { AuthContext } from '../../../../context/AuthContext'
import { useCart } from '../../../../context/UseCartContext'
import { Address, ProductPayment } from '../../../../types'
import { moneyMask } from '../../../../utils/masks'
import { ToastCustom } from '../../../../utils/toastCustom'
import { setCookies } from '../../../../utils/useCookies'

export default function pix({ address }: Address) {
  const [loading, setLoading] = useState(false)
  const { user } = useContext(AuthContext)
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
        user_id: user && user.id,
        address_id: address?.id,
        amount: somaTotal,
        items: setDat,
      }
      const { data } = await axios.post('/api/api/store/checkout/pix', items)
      setCookies('@BuyPhone:Pix', data, 60 * 10, '/')
      destroyCookie(null, '@BuyPhone:GetCep')
      destroyCookie(null, 'USER_LEAD')
      CleanCart()
      router.push('/shipping/payment/pix/pix-payment')
    } catch (error) {
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
                <span>PIX</span>
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
                  <span>
                    R${' '}
                    {cartSize &&
                      cartSize > 0 &&
                      moneyMask(somaTotal.toString())}
                  </span>
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
