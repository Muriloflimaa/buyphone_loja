import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChevronDownIcon, StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart } from '../../../../context/UseCartContext'
import { apiPedidosBeta } from '../../../../services/apiBetaConfigs'
import { IProduct, Product } from '../../../../types'
import { moneyMask } from '../../../../utils/masks'
import { verificationColor } from '../../../../utils/verificationColors'
import { verificationPrice } from '../../../../utils/verificationPrice'

interface IParams {
    params: {
        slugCategory: string
        slugProduct: string
    }
}

interface DataProps {
    data: {
        data: IProduct
    }
}

export default function Products({ data }: DataProps) {
    const [qtd, setQtd] = useState(0)
    const [showMore, setShowMore] = useState(false)
    const [color, setColor] = useState('')
    const returnPrice = verificationPrice(data.data)
    const [description, setDescrition] = useState('')

    useEffect(() => {
        verificationColor(data.data.color, setColor)
        if (data.data.description) {
            setDescrition(data.data.description)
        }
    }, [])

    const { addProduct } = useCart()

    function handleAddProduct(id: number) {
        addProduct(id)
    }

    return (
        <>
            <div className="max-w-4xl mx-auto p-4 md:my-4 w-full">
                <h1 className="font-medium flex items-start gap-2">
                    <Link href={'/'} passHref>
                        <a className="flex items-center gap-2 normal-case lg:gap-3 my-2">
                            <svg
                                className="h-6 w-6 fill-current md:h-8 md:w-8 rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                            </svg>
                            Detalhes
                        </a>
                    </Link>
                </h1>

                <div className="flex flex-col md:flex-row w-full mt-10 justify-between">
                    <div className="flex-col items-center gap-3 w-[20%] hidden md:flex">
                        <Image
                            src={
                                'https://pedidos.buyphone.com.br/media/2530/11-PRETO.webp'
                            }
                            width={60}
                            height={75}
                        />

                        <ChevronDownIcon className="w-5 h-5 text-PrimaryText" />
                    </div>
                    <div className="w-full h-full flex justify-center md:block md:w-[60%]">
                        <label
                            htmlFor="my-modal-4"
                            className="btn modal-button hover:bg-transparent hover:border-transparent bg-transparent border-transparent h-full"
                        >
                            <div className="w-40 md:w-72 h-auto relative">
                                <div className="flex justify-end w-full absolute ml-3 -mt-2 z-10">
                                    <FontAwesomeIcon
                                        icon={faMagnifyingGlassPlus}
                                        className="w-4 h-4"
                                    />
                                </div>
                                <Image
                                    src={
                                        'https://pedidos.buyphone.com.br/media/2530/11-PRETO.webp'
                                    }
                                    layout="fixed"
                                    width="200"
                                    height="230"
                                ></Image>
                            </div>
                        </label>
                    </div>

                    <input
                        type="checkbox"
                        id="my-modal-4"
                        className="modal-toggle"
                    />
                    <label
                        htmlFor="my-modal-4"
                        className="modal cursor-pointer"
                    >
                        <label
                            className="modal-box relative flex justify-around gap-4 items-center max-w-3xl h-[60vw]"
                            htmlFor=""
                        >
                            <label
                                htmlFor="my-modal-4"
                                className="btn btn-sm p-2 btn-circle absolute right-4 top-4"
                            >
                                ✕
                            </label>
                        </label>
                    </label>

                    <div className="flex flex-col gap-5 text-info-content">
                        <div>
                            <div className="flex gap-2 items-center">
                                <h1 className="text-2xl">{data.data.name}</h1>
                            </div>
                            <div className="flex items-center">
                                <StarIcon className="w-5 h-5 text-yellow-500"></StarIcon>
                                <p className="text-xs">4,9</p>

                                <p className="text-xs ml-2">
                                    (1234 comentários)
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col text-info-content">
                            <h1 className="text-2xl">Memória</h1>
                            <div className="flex gap-3">
                                <span className="badge badge-info">
                                    {data.data.memory}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col text-info-content">
                            <h1 className="text-2xl">Cor</h1>

                            <div className="flex gap-3">
                                <div
                                    className={`w-5 h-5  rounded-full border border-black ${color}`}
                                ></div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="relative w-24 flex justify-center">
                                <h1 className="font-semibold text-base leading-4">
                                    {moneyMask(
                                        returnPrice.averagePrice.toString()
                                    )}
                                </h1>
                                <div className="bg-red-500 w-full mt-2 absolute h-[1px]"></div>
                            </div>
                            <h2 className="text-2xl font-bold">
                                {moneyMask(returnPrice.ourPrice.toString())}
                            </h2>
                        </div>
                        <div className="hidden md:flex gap-3 items-center">
                            <button
                                className="btn btn-Primary"
                                data-testid="add-product-button"
                                onClick={() => handleAddProduct(data.data.id)}
                            >
                                Comprar
                            </button>
                        </div>
                        <div className="w-full rounded-lg text-info-content flex items-start justify-start p-4 gap-4 flex-col md:flex-row md:justify-center md:items-center md:gap-2">
                            <div className="flex items-center md:items-center text-info-content">
                                <h1>Frete: Grátis</h1>
                                <h2 className="ml-2 text-xs text-gray-400">
                                    (10 a 15 dias úteis)
                                </h2>
                            </div>
                            <div className="flex md:block gap-3 items-center">
                                <button className="btn btn-Primary block md:hidden">
                                    Comprar
                                </button>
                            </div>

                            <div className="flex flex-col gap-3 md:hidden">
                                <h1 className="text-xl">Descrição</h1>
                                <p className="transition-all duration-500 delay-500">
                                    {description}
                                </p>
                                <div className="border-PrimaryText border-t-[1px]"></div>

                                <p
                                    className="text-PrimaryText flex justify-center transition-all duration-500"
                                    onClick={() => setShowMore(!showMore)}
                                >
                                    {showMore ? 'Ver menos' : 'Ver mais'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-col my-5 gap-3 text-info-content hidden md:flex">
                    <div className="w-full rounded-lg bg-accent border-[1px] border-[#00000014] hidden items-center justify-start p-2 px-4 gap-1 md:flex-col md:items-start md:flex">
                        <h1 className="text-base font-medium">Descrição</h1>
                    </div>
                    <p className="text-sm px-3 text-info-content">
                        {description}
                    </p>
                </div>
                <div className="flex-col my-5 gap-3 text-info-content hidden md:flex">
                    <div className="w-full rounded-lg bg-accent border-[1px] border-[#00000014] hidden items-center justify-start p-2 px-4 gap-1 md:flex-col md:items-start md:flex">
                        <h1 className="text-base font-medium">
                            Avalaliação de clientes
                            <span className="text-[10px] pl-1 font-normal">
                                (300 avaliações)
                            </span>
                        </h1>
                    </div>
                    <p className="text-sm px-3 text-info-content">
                        {description}
                    </p>
                </div>
            </div>
        </>
    )
}

export const getStaticProps = async ({ params }: IParams) => {
    const data = await apiPedidosBeta.get(
        `products/${params.slugCategory}/${params.slugProduct}`
    )
    return {
        props: {
            data: data.data,
        },
        revalidate: 60 * 60 * 6,
    }
}

export const getStaticPaths = async () => {
    const { data } = await apiPedidosBeta.get(`products/`)

    const paths = data.data.map((product: IProduct) => ({
        params: {
            slugCategory: product.name.toLowerCase().replace(/ /g, '-'),
            slugProduct: product.slug,
        },
    }))

    return {
        paths,
        fallback: false,
    }
}
