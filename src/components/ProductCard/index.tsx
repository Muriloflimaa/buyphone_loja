import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart } from '../../context/UseCartContext'
import { moneyMask } from '../../utils/masks'

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
        <div
            className="card w-full mx-auto shadow-xl bg-colorCard hover:scale-100 md:hover:scale-105 hover:shadow-2xl ease-in-out duration-300"
            key={id}
        >
            <div className="card-body items-center p-4 text-center text-PrimaryText">
                <figure className="w-40 h-56 block mx-auto">
                    <Image
                        src={image}
                        layout="responsive"
                        width={350}
                        height={450}
                    />
                </figure>

                <h1 className="text-2xl font-light">{name}</h1>

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
                <div className="flex-col flex mb-3 w-full my-6 gap-2 ">
                    <div className="flex flex-col md:flex-row justify-between w-full">
                        Preço Comum:{' '}
                        <span className="opacity-40 line-through decoration-red-600">
                            {moneyMask(price.toString())}
                        </span>
                    </div>

                    <div className="text-lg flex flex-col md:flex-row justify-between w-full">
                        <span>Nosso Preço:</span>
                        <span className="text-success font-semibold text-xl">
                            {moneyMask(averagePrice.toString())}
                        </span>
                    </div>
                </div>

                <div className="card-actions">
                    <button
                        className="btn btn-primary"
                        data-testid="add-product-button"
                        onClick={() => handleAddProduct(id)}
                    >
                        Adicionar
                    </button>
                </div>
                <Link href={`/${slugCategory}/${slug}`} passHref>
                    <a>
                        <button className="btn btn-primary font-light text-PrimaryText bg-transparent border-transparent link">
                            Saiba mais
                        </button>
                    </a>
                </Link>
            </div>
        </div>
    )
}
export default ProductCard
