import { TrashIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCart } from '../../context/UseCartContext'
import { moneyMask } from '../../utils/masks'
import CountDownComponent from '../CountDownComponent'

interface ProductProps {
  id: number
  amount: number
  name: string
  color: string
  price: number
  memory: string
  image: string
  blackfriday?: number | boolean
}

const ProductCart = ({
  id,
  amount,
  name,
  color,
  price,
  memory,
  image,
  blackfriday,
}: ProductProps) => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const { removeProduct, updateProductAmount } = useCart()

  useEffect(() => {
    if (
      router.asPath == '/shipping/payment/pix/pix-checkout' ||
      router.asPath == '/shipping/payment' ||
      router.asPath == '/shipping/address' ||
      router.asPath == '/shipping/payment/credit/new-card' ||
      router.asPath == '/shipping/payment/credit/match-card' ||
      router.asPath == '/shipping/payment/credit/match-installments' ||
      router.asPath == '/shipping/payment/credit/credit-checkout' ||
      router.asPath == '/shipping/payment/custom' ||
      router.asPath == '/shipping/payment/credit' ||
      router.asPath == '/shipping/payment/credit-checkout' ||
      router.asPath == '/shipping/payment/match-installments' ||
      router.asPath == '/shipping/payment/credit-finally'
    ) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [router]) //verificação de rota para setar padding

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

  function handleRemoveProduct(
    productId: number,
    name: string,
    color: string,
    memory: string
  ) {
    removeProduct(productId, name, color, memory)
  } //remove produto do carrinho

  const [changeText, setChangeText] = useState(false)

  setTimeout(() => {
    setChangeText(!changeText)
    setCountDownBlackFriday(getCountDown)
  }, 1400)

  const [countDownBlackFriday, setCountDownBlackFriday] = useState<
    | { days: number; minutes: number; seconds: number; hours: number }
    | undefined
  >(undefined)

  const getCountDown = () => {
    const terminyBlack = process.env.NEXT_PUBLIC_TIME_COUNT_DOWN ?? ''
    var countDownDate = new Date(terminyBlack).getTime()

    // Update the count down every 1 second

    // Get today's date and time
    var now = new Date().getTime()

    // Find the distance between now and the count down date
    var distance = countDownDate - now

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)
    return {
      days,
      hours,
      minutes,
      seconds,
    }
  }

  return (
    <div
      className={
        'bg-colorCard rounded-xl w-full h-min flex justify-between text-xs flex-col '
      }
      key={id}
    >
      {process.env.NEXT_PUBLIC_BLACK_FRIDAY &&
        !!JSON.parse(process.env.NEXT_PUBLIC_BLACK_FRIDAY) &&
        blackfriday == 1 &&
        countDownBlackFriday && (
          <CountDownComponent
            changeText={changeText}
            countDownBlackFriday={countDownBlackFriday}
          />
        )}
      <div className="grid grid-cols-3">
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
          {!show && (
            <div className="flex flex-col items-end">
              <button
                type="button"
                data-testid="remove-product"
                onClick={() => handleRemoveProduct(id, name, color, memory)}
              >
                <TrashIcon className="h-4 w-4 text-red-600" />
              </button>
            </div>
          )}
          <div className="flex w-full justify-end">
            <div className="flex">
              {!show && (
                <div className="btn-group w-12">
                  <button
                    className="btn btn-accent text-xs h-auto p-1 min-h-0 w-1/2"
                    type="button"
                    data-testid="decrement-product"
                    disabled={amount <= 1}
                    onClick={() => handleProductDecrement(id, amount)}
                  >
                    -
                  </button>

                  <button
                    className="btn btn-accent text-xs h-auto p-1 min-h-0 w-1/2"
                    type="button"
                    data-testid="increment-product"
                    onClick={() => handleProductIncrement(id, amount)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCart
