import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useCart } from '../../context/UseCartContext'
import { moneyMask } from '../../utils/masks'

export const TotalPayment = () => {
  const { somaTotal, discountValue } = useCart()
  const { userData } = useContext(AuthContext)
  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row text-center md:text-start justify-between pt-10 md:pt-4 px-4">
        <span>Resumo</span>
        {somaTotal > 0 ? (
          <>
            {userData?.promotion ? (
              <div className="flex items-center">
                <span className="font-semibold text-lg mr-5">
                  Valor total:
                </span>
                <div className="flex flex-col justify-center">
                  <span className="text-[14px] text-gray-500 line-through text-right">
                    R$ {moneyMask((somaTotal + discountValue).toString())}
                  </span>
                  <span className="font-semibold text-lg">
                    R$ {moneyMask(somaTotal.toString())}
                  </span>
                </div>
              </div>
            ) :
              <span className="font-semibold text-lg">
                Valor total: R$ {moneyMask(somaTotal.toString())}
              </span>
            }
          </>
        ) : null}
      </div>
      <div className="divider"></div>
    </React.Fragment>
  )
}
