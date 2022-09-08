import { TrashIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCart } from '../../context/UseCartContext'
import { Product } from '../../types'
import { formatPrice } from '../../utils/format'

const ProductCart = () => {
    const router = useRouter()

    const [show, setShow] = useState(false)
    const [padding, setPadding] = useState(false)

    useEffect(() => {
        if (
            router.asPath == '/shipping/address' ||
            router.asPath == '/shipping/payment/pix'
        ) {
            setShow(true)
        } else {
            setShow(false)
        }
    }, [])
    useEffect(() => {
        if (
            router.asPath == '/shipping/address' ||
            router.asPath == '/shipping/payment/pix' ||
            router.asPath == '/cart'
        ) {
            setPadding(true)
        } else {
            setPadding(false)
        }
    }, [])
    // Cart
    const { cart, removeProduct, updateProductAmount } = useCart()

    const cartFormatted = cart.map((product) => ({
        ...product,
        priceFormated: formatPrice(product.price),
        subTotal: formatPrice(product.price * product.amount),
    }))
    const total = formatPrice(
        cart.reduce((sumTotal, product) => {
            return sumTotal + product.price * product.amount
        }, 0)
    )

    function handleProductIncrement(product: Product) {
        updateProductAmount({
            productId: product.id,
            amount: product.amount + 1,
        })
    }

    function handleProductDecrement(product: Product) {
        updateProductAmount({
            productId: product.id,
            amount: product.amount - 1,
        })
    }

    function handleRemoveProduct(productId: number) {
        removeProduct(productId)
    }

    return (
        <div className="flex flex-col gap-4">
            {cartFormatted.map((product) => {
                return (
                    <div
                        className={
                            'bg-colorCard rounded-xl w-full h-min flex justify-between text-xs flex-col ' +
                            (padding == true ? ' p-4' : ' p-0')
                        }
                        key={product.id}
                    >
                        <div
                            className="flex justify-between w-full"
                            data-testid="product"
                        >
                            <div className="flex gap-3">
                                <div className="w-20 h-full">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                    />
                                </div>

                                <div className="flex flex-col justify-between">
                                    <div className="flex flex-col">
                                        <strong>{product.title}</strong>
                                        <span>
                                            {product.color} / {product.memory}
                                        </span>
                                    </div>
                                    <span>Quantidade: {product.amount}</span>
                                </div>
                            </div>
                            <div className="flex items-end w-full justify-between">
                                <div className="flex">
                                    {show == false ? (
                                        <div className="btn-group w-14">
                                            <button
                                                className="btn text-xs h-auto p-2 min-h-0 w-1/2"
                                                type="button"
                                                data-testid="decrement-product"
                                                disabled={product.amount <= 1}
                                                onClick={() =>
                                                    handleProductDecrement(
                                                        product
                                                    )
                                                }
                                            >
                                                -
                                            </button>

                                            <button
                                                className="btn text-xs h-auto p-2 min-h-0 w-1/2"
                                                type="button"
                                                data-testid="increment-product"
                                                onClick={() =>
                                                    handleProductIncrement(
                                                        product
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    ) : (
                                        ' '
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col items-end">
                                <strong>{product.subTotal}</strong>
                                <button
                                    type="button"
                                    data-testid="remove-product"
                                    onClick={() =>
                                        handleRemoveProduct(product.id)
                                    }
                                >
                                    <TrashIcon className="h-4 w-4 " />
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default ProductCart
