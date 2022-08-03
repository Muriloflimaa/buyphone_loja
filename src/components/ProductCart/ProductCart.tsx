import Image from 'next/image'
import { TrashIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const ProductCart = (props: any) => {
    const [qtd, setQtd] = useState(props.qtd)
    const [price, setPrice] = useState(props.price)
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
    })
    useEffect(() => {
        if (
            router.asPath == '/shipping/address' ||
            router.asPath == '/shipping/payment/pix'
        ) {
            setPadding(true)
        } else {
            setPadding(false)
        }
    })

    return (
        <div
            className={
                'bg-colorCard rounded-xl w-full h-min flex justify-between text-PrimaryText text-xs flex-col ' +
                props.shadow +
                (padding == true ? ' p-4' : ' p-0')
            }
        >
            <div className="flex justify-between w-full">
                <div className="flex">
                    <div className="w-20 h-full">
                        <Image src={props.image} layout="responsive"></Image>
                    </div>
                    <div className="flex flex-col items-start justify-between h-full w-full">
                        <div>
                            <h1>{props.name}</h1>
                            <h2>{props.id}</h2>
                        </div>
                        <div className="flex items-end w-full justify-between">
                            <h3>Quantidade: {qtd}</h3>
                            <div className="flex flex-col">
                                {show == false ? (
                                    <div className="btn-group w-14">
                                        <button
                                            className="btn text-xs h-auto p-2 min-h-0 w-1/2"
                                            onClick={() => {
                                                setQtd(qtd - 1)
                                                setPrice(price - props.price)
                                            }}
                                        >
                                            -
                                        </button>

                                        <button
                                            className="btn text-xs h-auto p-2 min-h-0 w-1/2"
                                            onClick={() => {
                                                setQtd(qtd + 1)
                                                setPrice(price + props.price)
                                            }}
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
                <div className="flex flex-col justify-between items-end">
                    <h1 className="text-sm">R$ {price}</h1>
                    <TrashIcon className="h-4 w-4 text-PrimaryText" />
                </div>
            </div>
        </div>
    )
}
export default ProductCart
