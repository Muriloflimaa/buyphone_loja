import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { Divider } from 'react-daisyui'
import ProductCart from '../components/ProductCart2'
import { AuthContext } from '../context/AuthContext'
import { useCart } from '../context/UseCartContext'
import { ArrayProduct } from '../types'
import { moneyMask } from '../utils/masks'

export default function Cart() {
  const { userData } = useContext(AuthContext)
  const { cart, values, somaTotal, discountValue, isAttCart } = useCart()
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
          {cartSize && cartSize > 0 && !!isAttCart ? (
            [1, 2].map(() => (
              <div className="rounded-md w-full ">
                <div className="animate-pulse flex w-full">
                  <div
                    className="flex justify-between w-full"
                    data-testid="product"
                  >
                    <div className="grid grid-cols-2 col-span-2 w-full">
                      <div className="w-36 h-full flex items-center">
                        <img
                          className="blur"
                          src={
                            'https://buyphone-files.s3.us-east-2.amazonaws.com/2531/11-BRANCO.webp'
                          }
                        />
                      </div>

                      <div className="flex flex-col gap-2 justify-between">
                        <div className="grid gap-2">
                          <div className="h-2 w-full bg-slate-300 rounded "></div>

                          <div className="h-2 w-full bg-slate-300 rounded "></div>
                        </div>

                        <div className="h-2 w-full bg-slate-300 rounded "></div>
                      </div>
                    </div>
                    <div className="flex flex-col w-1/3 gap-2 justify-between items-end">
                      <div className="h-2 w-full bg-slate-300 rounded "></div>

                      <div className="flex w-full justify-end">
                        <div className="h-2 w-1/2 bg-slate-300 rounded "></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : cartSize && cartSize > 0 ? (
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
            <div className="flex flex-col text-info-content gap-8 my-10 items-center max-w-3xl mx-auto">
              <FontAwesomeIcon icon={faShoppingCart} className="w-10 h-10" />
              <h1 className="text-2xl font-bold">Carrinho vazio!</h1>
              <span>Você ainda não possui itens no seu carrinho.</span>
              <Link href="/">
                <button className="btn btn-info text-white">
                  Ver produtos
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {cartSize && cartSize > 0 && (
        <div className="flex w-full justify-end max-w-7xl my-10 px-4">
          <div className="flex flex-col max-w-md w-full">
            {userData?.promotion && (
              <div className="flex justify-between">
                <span className="text-info-content text-lg">Desconto:</span>
                <span className="font-semibold text-lg text-green-600">
                  R$ - 150,00
                </span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Subtotal</span>
              <span className="text-sm text-gray-500">
                R$ {moneyMask((somaTotal + discountValue).toString())}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Frete</span>
              <span className="text-sm text-success font-semibold">Grátis</span>
            </div>
            {userData?.promotion && (
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Desconto:</span>
                <span className="font-semibold text-sm text-green-600">
                  R$ -150,00
                </span>
              </div>
            )}

            <Divider className="h-[1px] bg-black/50" />
            {
              <div className="flex w-full justify-between items-center">
                <span>Total</span>
                <span className="font-semibold text-info-content text-lg">
                  R$ {moneyMask(somaTotal?.toString())}
                </span>
              </div>
            }
            {cartSize && cartSize > 0 ? (
              <div className="w-full flex justify-end mt-2">
                <Link href={'/shipping'}>
                  <a className="btn w-64 btn-success font-medium normal-case">
                    Finalizar Compra
                  </a>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  )
}
