import { TrashIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCart } from '../../context/UseCartContext'
import { ArrayProduct, Product } from '../../types'
import { moneyMask } from '../../utils/masks'

const ProductCart = ({ values }: any) => {
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

    function handleProductIncrement(product: Product) {
        updateProductAmount({
            productId: product.id,
            amount: product.amount + 1,
        })
    } //incrementa 1 produto

    function handleProductDecrement(product: Product) {
        updateProductAmount({
            productId: product.id,
            amount: product.amount - 1,
        })
    } //remove 1 amount do produto

    function handleRemoveProduct(productId: number) {
        removeProduct(productId)
    } //remove produto do carrinho

    return (
        <div className="flex flex-col gap-4">
            {values.map((product: ArrayProduct) => {
                //da um map no state
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
                                        src={
                                            product.product?.media[0]
                                                .original_url
                                        }
                                        alt={product.product?.name}
                                    />
                                </div>

                                <div className="flex flex-col justify-between">
                                    <div className="flex flex-col">
                                        <strong>{product.product?.name}</strong>
                                        <span>
                                            {product.product?.color} /{' '}
                                            {product.product?.memory}
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
                                <strong>
                                    {moneyMask(product.subTotal?.toString())}
                                </strong>{' '}
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
