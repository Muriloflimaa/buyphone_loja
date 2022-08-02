import Image from 'next/image'
import { TrashIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const ProductCart = (props: any) => {
    const [qtd, setQtd] = useState(props.qtd)
    const [price, setPrice] = useState(props.price)
    const router = useRouter()

    const [show, setShow] = useState(false)
    useEffect(() => {
        if (router.asPath == '/shipping/address') {
            setShow(true)
        } else {
            setShow(false)
        }
    })

    return (
        <div
            className={
                'bg-colorCard rounded-xl w-full h-min p-2 flex hero-content justify-between text-PrimaryText text-xs flex-col ' +
                props.shadow
            }
        >
            {show == true ? (
                <div className="flex justify-between w-full p-4">
                    <p className="uppercase mt-2">Meu carrinho</p>{' '}
                    <p className="mt-2">2 itens</p>
                </div>
            ) : (
                ' '
            )}
            <div className="flex justify-between w-full">
                <div className="flex">
                    <div className="w-auto ">
                        <Image src={props.image} layout="fixed"></Image>
                    </div>
                    <div className="flex flex-col justify-between p-3 gap-2">
                        <div>
                            <h1>{props.name}</h1>
                            <h2>Id: {props.id}</h2>
                        </div>

                        <h3>Quantidade: {qtd}</h3>
                        {show == false ? (
                            <div className="btn-group">
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setQtd(qtd - 1)
                                        setPrice(price - props.price)
                                    }}
                                >
                                    -
                                </button>
                                <button className="btn"> {qtd}</button>
                                <button
                                    className="btn"
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

                <div className="flex flex-col justify-center p-3 items-end">
                    <h1 className="text-sm">R$ {price}</h1>
                    <TrashIcon className="h-4 w-4 text-PrimaryText" />
                </div>
            </div>
        </div>
    )
}
export default ProductCart
