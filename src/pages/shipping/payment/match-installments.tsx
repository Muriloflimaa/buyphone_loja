import { faCreditCard } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import ProductCart from '../../../components/ProductCart'
import { TotalPayment } from '../../../components/TotalPayment'
import { useCart } from '../../../context/UseCartContext'
import { ToastCustom } from '../../../utils/toastCustom'
import { setCookies } from '../../../utils/useCookies'

export default function MatchInstallments() {
  const { values, somaTotal, CleanCart } = useCart()
  const [cartSize, setCartSize] = useState<number>()
  const [matchCard, setMatchCard] = useState<string>('')

  useEffect(() => {
    if (values) {
      setCartSize(values.length)
    }
  }, [values])

  function handleCard() {
    if (matchCard === 'newCard') {
      setCookies('@BuyPhone:GetCredit', matchCard, 60 * 60)

      return
    }
    if (matchCard !== '') {
      setCookies('@BuyPhone:GetCredit', matchCard, 60 * 60)

      return
    } else {
      ToastCustom(1500, 'Escolha uma das opções de cartão', 'error')
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
            <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
              <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
                <input
                  type="radio"
                  name="radio-6"
                  className="radio checked:bg-primary"
                />
                <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 ml-5" />
                <span className="label-text text-lg">1x R$1.633</span>
              </label>
            </div>
            <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
              <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
                <input
                  type="radio"
                  name="radio-6"
                  className="radio checked:bg-primary"
                />
                <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 ml-5" />
                <span className="label-text text-lg">2x R$1.633</span>
              </label>
            </div>
            <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
              <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
                <input
                  type="radio"
                  name="radio-6"
                  className="radio checked:bg-primary"
                />
                <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 ml-5" />
                <span className="label-text text-lg">3x R$1.633</span>
              </label>
            </div>
            <div className="form-control w-full h-full stat p-0 flex shadow-md rounded-lg">
              <label className="label gap-2 h-full py-5 px-6 cursor-pointer justify-start">
                <input
                  type="radio"
                  name="radio-6"
                  className="radio checked:bg-primary"
                />
                <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4 ml-5" />
                <span className="label-text text-lg">4x R$1.633</span>
              </label>
            </div>

            <div className="flex justify-end mt-4">
              <button onClick={handleCard} className="btn btn-info text-white">
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
