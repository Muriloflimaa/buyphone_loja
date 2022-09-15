import { TrashIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCart } from '../../context/UseCartContext'
import { moneyMask } from '../../utils/masks'

interface ProductProps {
  id: number
  amount: number
  name: string
  color: string
  price: number
  memory: string
  image: string
}

const ProductTeste = ({
  id,
  amount,
  name,
  color,
  price,
  memory,
  image,
}: ProductProps) => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [padding, setPadding] = useState(false)
  const { removeProduct, updateProductAmount } = useCart()

  useEffect(() => {
    if (
      router.asPath == '/shipping/address' ||
      router.asPath == '/shipping/payment/pix'
    ) {
      setShow(true)
    } else {
      setShow(false)
    }
    if (
      router.asPath == '/shipping/address' ||
      router.asPath == '/shipping/payment/pix' ||
      router.asPath == '/cart'
    ) {
      setPadding(true)
    } else {
      setPadding(false)
    }
  }, []) //verificação de rota para setar padding

  function handleProductIncrement(productId: number, productAmount: number) {
    updateProductAmount({
      productId: productId,
      amount: productAmount + 1,
    })
  } //incrementa 1 produto

  function handleProductDecrement(productId2: number, productAmount: number) {
    updateProductAmount({
      productId: productId2,
      amount: productAmount - 1,
    })
  } //remove 1 amount do produto

  function handleRemoveProduct(productId: number) {
    removeProduct(productId)
  } //remove produto do carrinho

  return (
    <div
      className={
        'bg-colorCard rounded-xl w-full h-min flex justify-between text-xs flex-col ' +
        (padding == true ? ' p-4' : ' p-0')
      }
      key={id}
    >
      <div className="grid grid-cols-3" data-testid="product">
        <div className="grid col-span-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-12 h-full flex items-center">
              <img src={image} alt={name} />
            </div>

            <div className="flex flex-col gap-2 justify-between">
              <div className="flex flex-col">
                <strong>{name}</strong>
                <span>
                  {color} / {memory}
                </span>
              </div>
              <span>Quantidade: {amount}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-between items-end">
          <strong>R$ {moneyMask(price?.toString())}</strong>
          <div className="flex flex-col items-end">
            <button
              type="button"
              data-testid="remove-product"
              onClick={() => handleRemoveProduct(id)}
            >
              <TrashIcon className="h-4 w-4 " />
            </button>
          </div>
          <div className="flex w-full justify-end">
            <div className="flex">
              {show == false ? (
                <div className="btn-group w-12">
                  <button
                    className="btn btn-error text-xs h-auto p-1 min-h-0 w-1/2"
                    type="button"
                    data-testid="decrement-product"
                    disabled={amount <= 1}
                    onClick={() => handleProductDecrement(id, amount)}
                  >
                    -
                  </button>

                  <button
                    className="btn btn-success text-xs h-auto p-1 min-h-0 w-1/2"
                    type="button"
                    data-testid="increment-product"
                    onClick={() => handleProductIncrement(id, amount)}
                  >
                    +
                  </button>
                </div>
              ) : (
                ' '
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTeste
