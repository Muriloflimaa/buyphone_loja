import ProductCart from '../ProductCart'
import React from 'react'
import { ArrayProduct } from '../../types'

interface ProductPaymentComponentProps {
  cartSize: number | undefined
  values: ArrayProduct[]
}

const ProductPaymentComponent = ({
  cartSize,
  values,
}: ProductPaymentComponentProps) => {
  return (
    <>
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
                  image={
                    res.product.media[0] && res.product.media[0].original_url
                  }
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
    </>
  )
}

export default ProductPaymentComponent
