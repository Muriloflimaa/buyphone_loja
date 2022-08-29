import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart } from '../../context/UseCartContext'
import { moneyMask } from '../../utils/masks'
import styles from './styles.module.scss'

interface ProductCardProps {
    id: number
    name: string
    colorPhone: string
    averagePrice: number
    price: number
    memory: string
    image: string
    idCategory: number
    slug: string
    slugCategory: string
}

const ProductCard = ({
    id,
    name,
    colorPhone,
    averagePrice,
    price,
    image,
    slug,
    slugCategory,
    memory,
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
        if (colorPhone == 'Meia-noite') {
            setColor('bg-gray-900')
        }
        if (colorPhone == 'Azul') {
            setColor('bg-sky-700')
        }
        if (colorPhone == 'Azul-Sierra') {
            setColor('bg-sky-200')
        }
        if (
            colorPhone == 'Azul-Pacífico' ||
            colorPhone == 'Azul Pacífico' ||
            colorPhone == 'Azul pacífico'
        ) {
            setColor('bg-cyan-900')
        }
        if (colorPhone == 'Verde' || colorPhone == 'Verde-Alpino') {
            setColor('bg-emerald-200')
        }
        if (colorPhone == 'Grafite') {
            setColor('bg-zinc-500')
        }
        if (colorPhone == 'Prateado' || colorPhone == 'Estelar') {
            setColor('bg-gray-50')
        }
        if (colorPhone == 'Dourado') {
            setColor('bg-amber-100')
        }
        if (colorPhone == 'Rosa') {
            setColor('bg-pink-200')
        }
    })

    const { addProduct } = useCart()

    function handleAddProduct(id: number) {
        addProduct(id)
    }

    return (
        // <div className="relative flex items-center justify-center overflow-hidden rounded-lg">
        //     <div
        //         className={
        //             'w-[390%] h-full absolute ' + styles.GradientBuyPhone
        //         }
        //     ></div>
        <div
            className="card card-compact w-full h-full shadow-black hover:shadow-2xl hover:drop-shadow-lg hover:scale-105 transition-all duration-200 sm:card-normal max-w-xs relative bg-base-100 overflow-visible rounded-lg"
            key={id}
        >
            <div className="card-body text-center ">
                <div className="w-[80%] mx-auto">
                    <figure className="mb-6">
                        <Image src={image} width={350} height={450} />
                    </figure>
                </div>
                <h2 className="card-title justify-center flex-col font-medium">
                    {name}
                </h2>
                <div className="flex gap-2 justify-center">
                    <div className="badge badge-outline text-xs h-auto">
                        <div
                            className={`h-2 w-2 rounded-full mr-2 border-white' ${color}`}
                        ></div>
                        <span className="w-max">{colorPhone}</span>
                    </div>
                    <span className="badge badge-outline text-xs">
                        {memory}
                    </span>
                </div>
                <div className="flex-col mb-3 text-sm text-left my-6 gap-2 hidden lg:flex">
                    <div className="flex justify-between">
                        Preço Comum:{' '}
                        <span className="opacity-40 line-through decoration-red-600">
                            {moneyMask(averagePrice.toString())}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Nosso Preço:</span>
                        <span className="text-success font-semibold text-lg">
                            {moneyMask(price.toString())}
                        </span>
                    </div>
                </div>
                <div className="my-6 block lg:hidden">
                    <div>
                        Preço comum:{' '}
                        <span className="opacity-40 line-through decoration-red-600">
                            {moneyMask(averagePrice.toString())}
                        </span>
                        <br />
                    </div>
                    <div className="text-lg">
                        Nosso preço:{' '}
                        <span className="text-success font-semibold text-xl">
                            {moneyMask(price.toString())}
                        </span>
                    </div>
                </div>

                <div className="card-actions flex-col items-center">
                    <button
                        className="btn btn-sm btn-primary rounded-full text-xs md:text-md py-0
                        "
                        data-testid="add-product-button"
                        onClick={() => handleAddProduct(id)}
                    >
                        Comprar
                    </button>
                </div>
                <Link href={`/${slugCategory}/${slug}`} passHref>
                    <a className="text-xs link">Saiba mais</a>
                </Link>
            </div>
        </div>
        // </div>
    )
}
export default ProductCard
