import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import React, { useEffect, useState } from 'react'
import ProductCart from '../../../components/ProductCart'
import { useCart } from '../../../context/UseCartContext'
import { apiStoreBeta } from '../../../services/apiBetaConfigs'
import { GetUseType } from '../../../utils/getUserType'
import { moneyMask } from '../../../utils/masks'
import { setCookies } from '../../../utils/useCookies'

export interface Address {
  CEP: string
  UF: string
  city: string
  address: string
  neighborhood: string
  number: number
  Message?: string
  id: number
}

interface Product {
  product_id: number
  price: number
  qty: number
}

export default function pix() {
  const [address, setAddress] = useState<Address>()
  const user = GetUseType()
  const { values, somaTotal, CleanCart } = useCart()
  const [cartSize, setCartSize] = useState<number>()
  const router = useRouter()

  useEffect(() => {
    const { '@BuyPhone:GetCep': getDataUser } = parseCookies(undefined)
    setAddress(JSON?.parse(getDataUser))
  }, [])

  useEffect(() => {
    if (values) {
      setCartSize(values.length)
    }
  }, [values])

  async function handlePayment() {
    try {
      const setDat: Product[] = []
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
      const { data } = await apiStoreBeta.post('checkout/pix', items)
      setCookies(
        '@BuyPhone:Pix',
        data,
        60 * 60,
        '/shipping/payment/pixCheckout'
      )
      CleanCart()
      destroyCookie({}, '@BuyPhone:GetCep')
      router.push('/shipping/payment/pixCheckout')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
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
                <strong>Frete</strong>
              </div>
              <div className="flex flex-col">
                <span> R$ {moneyMask(somaTotal.toString())}</span>
                <span>Grátis</span>
              </div>
            </div>
          </div>
          <div className="fixed bottom-[-10px] right-1 card card-compact bg-white glass bg-opacity-90 w-[98%] md:w-80 z-50">
            <div className="card-body">
              <div className="flex justify-between gap-4 w-full text-xl">
                <span>Total</span>
                <span> R$ {moneyMask(somaTotal.toString())}</span>
              </div>
              <a
                onClick={() => handlePayment()}
                className="flex btn btn-success w-full"
              >
                Finalizar Compra
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
