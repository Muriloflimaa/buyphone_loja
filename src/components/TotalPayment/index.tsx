import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useCart } from '../../context/UseCartContext'
import { moneyMask } from '../../utils/masks'

export const TotalPayment = () => {
  const { somaTotal, discountValue } = useCart()
  const { userData } = useContext(AuthContext)
  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row text-center items-center md:text-start justify-between px-4 mt-6 md:mt-8">
        <span>Resumo</span>
        {somaTotal > 0 ? (
          <>
            {userData?.promotion ? (
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <strong>Subtotal: </strong>
                  <strong>Desconto: </strong>
                  <strong>SubTotal: </strong>
                </div>
                <div className="flex flex-col">
                  <span>
                    R$ {moneyMask((somaTotal + discountValue).toString())}
                  </span>
                  {userData?.promotion && (
                    <span className="text-green-600">
                      R$ -{moneyMask(discountValue.toString())}
                    </span>
                  )}
                  <span className="font-semibold">
                    R$ {moneyMask(somaTotal.toString())}
                  </span>
                </div>
              </div>
            ) : (
              <span className="font-semibold text-lg">
                SubTotal: R$ {moneyMask(somaTotal.toString())}
              </span>
            )}
          </>
        ) : null}
      </div>
      <div className="divider"></div>
    </React.Fragment>
  )
}
