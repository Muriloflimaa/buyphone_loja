import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const ProductCard = (props: any) => {
    const [color, setColor] = useState('')

    useEffect(() => {
        if (props.color == 'Preto') {
            setColor('bg-black')
        }
        if (props.color == 'Branco') {
            setColor('bg-white')
        }
        if (props.color == 'Vermelho') {
            setColor('bg-red-700')
        }
    })

    return (
        <div className="card w-36 mx-auto shadow-xl bg-colorCard hover:scale-100 md:hover:scale-105 hover:shadow-2xl ease-in-out duration-300 sm:w-48 md:w-48 lg:w-64 xl:w-72">
            <figure className="px-4 pt-4">
                <Image src={props.image} layout="fixed" />
            </figure>
            <div className="card-body items-center p-4 text-center text-PrimaryText">
                <p className="flex items-center gap-2">
                    <div
                        className={
                            'w-3 h-3 rounded-full border border-white ' + color
                        }
                    ></div>
                    {props.color}
                </p>
                <h1 className="text-2xl font-bold">{props.name}</h1>
                <h2 className="text-base font-light">Preço comercializado</h2>
                <div className="relative">
                    <h3 className="font-light text-base">{props.priceOld}</h3>
                    <div className="bg-red-500 w-20 absolute -mt-3 -ml-[10px] h-[1px]"></div>
                </div>
                <h4 className="text-2xl font-light">Preço BuyPhone</h4>
                <h5 className="text-2xl font-normal text-green-600">
                    {props.price}
                </h5>
                <div className="card-actions">
                    <button className="btn btn-primary">Adicionar</button>
                </div>
                <Link href={'/description'}>
                    <button className="btn btn-primary text-PrimaryText bg-transparent border-transparent link">
                        Saiba mais
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default ProductCard
