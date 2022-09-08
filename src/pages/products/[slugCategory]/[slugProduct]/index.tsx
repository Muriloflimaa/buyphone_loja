import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChevronDownIcon, StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { apiPedidosBeta } from '../../../../services/apiBetaConfigs'
import { IProduct } from '../../../../types'
import { moneyMask } from '../../../../utils/masks'
import { refact } from '../../../../utils/RefctDescript'
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
    const [color, setColor] = useState<string | undefined>()
    const [qtd, setQtd] = useState(0)
    const [showMore, setShowMore] = useState(false)
    const returnPrice = verificationPrice(data.data)
    useEffect(() => {
        setColor(verificationColor(data.data.color))
    }, [])

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
                    <div className="w-full h-full flex justify-center md:w-[60%]">
                        <Image
                            src={
                                'https://pedidos.buyphone.com.br/media/2530/11-PRETO.webp'
                            }
                            layout="fixed"
                            width="200"
                            height="230"
                        ></Image>
                    </div>

                    <div className="flex flex-col gap-5 text-black">
                        <div>
                            <div className="flex gap-2 items-center">
                                <h1 className="text-2xl">{data.data.name}</h1>
                            </div>
                            <div className="flex items-center">
                                <StarIcon className="w-5 h-5 text-yellow-500"></StarIcon>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h1 className="text-2xl">Memória</h1>
                            <div className="flex gap-3">
                                <span className="badge badge-info">
                                    {data.data.memory}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col">
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
                            <div className="btn-group w-36 flex items-center">
                                <button
                                    className="btn text-xs h-auto p-4 min-h-0 border border-white rounded-md"
                                    disabled={qtd <= 1}
                                    type="button"
                                    onClick={() => {
                                        setQtd(qtd - 1)
                                    }}
                                >
                                    -
                                </button>
                                <h1 className="p-5">{qtd}</h1>
                                <button
                                    className="btn text-xs h-auto p-4 min-h-0 border border-white rounded-md"
                                    onClick={() => {
                                        setQtd(qtd + 1)
                                    }}
                                >
                                    +
                                </button>
                            </div>
                            <button className="btn btn-Primary">Comprar</button>
                        </div>
                        <div className="w-full rounded-lg bg-colorCard flex items-start justify-start p-4 gap-4 flex-col md:flex-row md:justify-center md:items-center md:gap-2">
                            <div className="flex items-center md:items-center text-white">
                                <h1>Frete: Grátis</h1>
                                <h2 className="ml-2 text-xs text-gray-400">
                                    (10 a 15 dias úteis)
                                </h2>
                            </div>
                            <div className="flex md:block gap-3 items-center">
                                <div className="btn-group w-36 flex items-center md:hidden">
                                    <button
                                        className="btn text-xs h-auto p-4 min-h-0 border border-white rounded-md bg-transparent"
                                        disabled={qtd <= 1}
                                        type="button"
                                        onClick={() => {
                                            setQtd(qtd - 1)
                                        }}
                                    >
                                        -
                                    </button>
                                    <h1 className="p-5">{qtd}</h1>
                                    <button
                                        className="btn text-xs h-auto p-4 min-h-0 border border-white rounded-md bg-transparent"
                                        onClick={() => {
                                            setQtd(qtd + 1)
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                                <button className="btn btn-Primary block md:hidden">
                                    Comprar
                                </button>
                            </div>

                            <div className="flex flex-col gap-3 md:hidden">
                                <h1 className="text-xl text-white">
                                    Descrição
                                </h1>
                                <span className="transition-all duration-500 delay-500">
                                    {data.data.description &&
                                        refact(data.data.description)}
                                </span>
                                <div className="border-PrimaryText border-t-[1px]"></div>

                                <span
                                    className="text-PrimaryText flex justify-center transition-all duration-500"
                                    onClick={() => setShowMore(!showMore)}
                                >
                                    {showMore ? 'Ver menos' : 'Ver mais'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-col my-10 gap-3 text-info-content hidden md:flex">
                    <div className="w-full rounded-lg bg-colorCard hidden items-center justify-start p-4 gap-1 md:flex-col md:items-start md:flex">
                        <h1 className="text-2xl text-white">Descrição</h1>
                    </div>
                    <span className="text-sm px-3 text-primary">
                        {data.data.description && refact(data.data.description)}
                    </span>
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
        revalidate: 60,
    }
}

export const getStaticPaths = async () => {
    const { data } = await apiPedidosBeta.get(`products/`)

    const paths = data.data.map((product: IProduct) => ({
        params: {
            slugCategory: product.name.toLowerCase().replace(' ', '-'),
            slugProduct: product.slug,
        },
    }))

    return {
        paths,
        fallback: false,
    }
}
