import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface ProductCardProps {
    name: string
    colorPhone: string
    priceOld: string
    price: string
    image: HTMLImageElement
}

const ProductCard = ({
    name,
    colorPhone,
    priceOld,
    price,
    image,
}: ProductCardProps) => {
    const [color, setColor] = useState('')

    useEffect(() => {
        if (colorPhone == 'Preto') {
            setColor('bg-black')
        }
        if (colorPhone == 'Branco') {
            setColor('bg-white')
        }
        if (colorPhone == 'Vermelho') {
            setColor('bg-red-700')
        }
    })

    return (
        <div className="card w-full mx-auto shadow-xl bg-colorCard hover:scale-100 md:hover:scale-105 hover:shadow-2xl ease-in-out duration-300">
            <figure className="px-4 pt-4">
                <Image src={image} layout="fixed" />
            </figure>
            <div className="card-body items-center p-4 text-center text-PrimaryText">
                <h1 className="text-2xl font-bold">{name}</h1>

                <div className="flex gap-2 justify-center">
                    <div className="badge badge-outline text-xs h-auto">
                        <div
                            className={
                                'h-2 w-2 rounded-full mr-2 border-white' + color
                            }
                        ></div>
                        <span className="w-max">{colorPhone}</span>
                    </div>
                    <span className="badge badge-outline text-xs">64Gb</span>
                </div>

                <div>
                    Preço Comum:{' '}
                    <span className="opacity-40 line-through decoration-red-600">
                        {priceOld}
                    </span>
                    <br />
                </div>

                <div className="text-lg">
                    Nosso Preço:{' '}
                    <span className="text-success font-semibold text-xl">
                        {price}
                    </span>
                </div>

                <div className="card-actions">
                    <button className="btn btn-primary">Adicionar</button>
                </div>
                <Link href={'/description'} passHref>
                    <button className="btn btn-primary text-PrimaryText bg-transparent border-transparent link">
                        Saiba mais
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default ProductCard
