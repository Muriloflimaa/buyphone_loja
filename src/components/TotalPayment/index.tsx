import React from 'react'
import { useCart } from '../../context/UseCartContext'
import { moneyMask } from '../../utils/masks'

export const TotalPayment = () => {
  const { somaTotal } = useCart()
  return (
    <React.Fragment>
      <div className="flex flex-col md:flex-row text-center md:text-start justify-between pt-4 px-4">
        <span>Resumo</span>
        {somaTotal > 0 ? (
          <span className="font-semibold text-lg">
            Valor total: R$ {moneyMask(somaTotal.toString())}
          </span>
        ) : null}
      </div>
      <div className="divider"></div>
    </React.Fragment>
  )
}
