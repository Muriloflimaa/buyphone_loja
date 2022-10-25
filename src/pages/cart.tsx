import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import ProductCart from '../components/ProductCart'
import { AuthContext } from '../context/AuthContext'
import { useCart } from '../context/UseCartContext'
import { ArrayProduct } from '../types'
import { moneyMask } from '../utils/masks'

export default function Cart() {
  const { userData } = useContext(AuthContext)
  const { cart, values, somaTotal, discountValue } = useCart()
  const [cartSize, setCartSize] = useState<number>()

  useEffect(() => {
    if (cart) {
      setCartSize(cart.length)
    }
  }, [cart])

  return (
    <>
      <div className="max-w-7xl mx-auto px-5 my-10 flex flex-col gap-3">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="uppercase text-xl font-light text-info-content">
            Meu carrinho
          </h1>
          <span className="text-xs font-light text-info-content">
            {cartSize && cartSize > 1
              ? cartSize + ' itens'
              : cartSize == 1
                ? cartSize + ' item'
                : ''}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {cartSize && cartSize > 0 ? (
            values.map(
              (res: ArrayProduct) =>
                res.id && (
                  <li className="list-none" key={res.id}>
                    <ProductCart
                      id={res.id}
                      amount={res.amount}
                      name={res.product.name}
                      color={res.product.color}
                      price={res.subTotal}
                      memory={res.product.memory}
                      image={res.product.media[0].original_url}
                    />
                  </li>
                )
            )
          ) : (
            <h1 className="flex justify-center">Carrinho vazio</h1>
          )}
        </div>
        {cartSize && cartSize > 0 ? (
          <>
            {userData?.promotion &&
              <div className="flex justify-between">
                <span className="text-info-content text-lg">Desconto:</span>
                <span className="font-semibold text-lg text-green-600">
                  R$ - 150,00
                </span>
              </div>
            }
            <div className="flex items-center justify-between">
              <span className="text-info-content text-lg">Valor Total:</span>
              <div className="flex flex-col">
                {userData?.promotion &&
                  <span className="text-[14px] text-gray-500 line-through text-right">
                    R$ {moneyMask((somaTotal + discountValue).toString())}
                  </span>
                }
                <span className="font-semibold text-info-content text-lg">
                  R$ {moneyMask(somaTotal?.toString())}
                </span>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
        {cartSize && cartSize > 0 ? (
          <div className="card-actions justify-center">
            <Link href={'/shipping'}>
              <a className="btn btn-success btn-block font-medium normal-case">
                Finalizar Compra
              </a>
            </Link>
          </div>
        ) : null}
      </div>
    </>
  )
}
