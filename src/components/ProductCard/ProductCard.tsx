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
                <div className="flex items-center gap-2">
                    <div
                        className={
                            'w-3 h-3 rounded-full border border-white ' + color
                        }
                    ></div>
                    {colorPhone}
                </div>
                <h1 className="text-2xl font-bold">{name}</h1>
                <h2 className="text-base font-light">Preço comercializado</h2>
                <div className="relative">
                    <h3 className="font-light text-base">{priceOld}</h3>
                    <div className="bg-red-500 w-20 absolute -mt-3 -ml-[10px] h-[1px]"></div>
                </div>
                <h4 className="text-2xl font-light">Preço BuyPhone</h4>
                <h5 className="text-2xl font-normal text-green-600">{price}</h5>
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
