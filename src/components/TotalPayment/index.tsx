import { useCart } from '../../context/UseCartContext'
import { moneyMask } from '../../utils/masks'

export const TotalPayment = () => {
  const { somaTotal } = useCart()
  return (
    <div className="flex flex-col md:flex-row text-center md:text-start justify-between py-4 border-b border-primary/50">
      <span>Resumo</span>
      {somaTotal > 0 ? (
        <span className="font-semibold text-lg">
          Valor total: R$ {moneyMask(somaTotal.toString())}
        </span>
      ) : null}
    </div>
  )
}
