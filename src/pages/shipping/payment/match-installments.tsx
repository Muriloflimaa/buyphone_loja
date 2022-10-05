import { faCreditCard } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'
import React, { useEffect, useState } from 'react'
import ProductCart from '../../../components/ProductCart'
import { TotalPayment } from '../../../components/TotalPayment'
import { useCart } from '../../../context/UseCartContext'
import { apiStoreBeta } from '../../../services/apiBetaConfigs'
import { Address, ArrayProduct, ProductPayment } from '../../../types'

export default function MatchInstallments({ address }: Address) {
  const { values, somaTotal, CleanCart } = useCart()
  const [cartSize, setCartSize] = useState<number>()
  const [matchInstallments, setMatchInstallments] = useState<string>('')
  const installments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const { '@BuyPhone:GetCredit': Getcredit } = parseCookies(undefined)

  useEffect(() => {
    if (values) {
      setCartSize(values.length)
    }
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

      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 grid">
      <TotalPayment />
      <div>
        <h2 className="text-2xl md:text-3xl font-medium text-start my-6">
          Em quantas vezes?
        </h2>
        <div className="flex flex-col-reverse md:flex-row mx-auto my-12 gap-4">
          <div className="flex flex-col w-full gap-2">
            {installments.map((res) => {
              return (
                <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
                  <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
                    <input
                      type="radio"
                      onClick={(e: any) => setMatchInstallments(e.target.value)}
                      value={res}
                      name="radio-6"
                      className="radio checked:bg-primary"
                    />
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      className="w-4 h-4 ml-5"
                    />
                    <span className="label-text text-lg">{res}x R$1.633</span>
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
          <div className="card card-compact bg-base-100 w-full ">
            <div className="card-body p-4 gap-4">
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
