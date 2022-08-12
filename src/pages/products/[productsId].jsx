import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChevronDownIcon, StarIcon } from '@heroicons/react/solid'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar/NavBar'
import { apiPedidos } from '../../services/apiClient'
import { ICategory } from '../../types'
import {
    removeDuplicatesColorsProducts,
    removeDuplicatesImageProducts,
    removeDuplicatesMemoryProducts,
} from '../../services/formatColor'

export default function Products({ data }) {
    const [qtd, setQtd] = useState(0)
    const [showMore, setShowMore] = useState(false)
    const products = data.data
    const [description, setDescription] = useState('')

    useEffect(() => {
        const descriptionProduct = data.description
        setDescription(
            descriptionProduct ?? 'Descrição do produto não está disponível '
        )
    }, [])

    var uniqueColor = removeDuplicatesColorsProducts(products)
    var uniqueMemory = removeDuplicatesMemoryProducts(products)
    var uniqueImage = removeDuplicatesImageProducts(products)

    return (
        <>
            <NavBar dataCategory={data} />
            <div className="py-16"></div>

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
                        <img
                            src={products.media[0].original_url}
                            className="w-16 h-auto"
                            alt=""
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
                                    src={products.media[0].original_url}
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
                            {/* <Image
                                src={uniqueImage[0]}
                                layout="fixed"
                                width="200"
                                height="230"
                            ></Image> */}
                        </label>
                    </label>

                    <div className="flex flex-col gap-5 text-PrimaryText">
                        <div>
                            <div className="flex gap-2 items-center">
                                <h1 className="text-2xl">{data.data.name}</h1>
                            </div>
                            <div className="flex items-center">
                                <StarIcon className="w-5 h-5 text-yellow-500"></StarIcon>
                                <p className="text-PrimaryText text-xs">4,9</p>

                                <p className="text-xs ml-2">
                                    (1234 comentários)
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h1 className="text-2xl">Memória</h1>
                            <div className="flex gap-3">
                                {uniqueMemory.length > 0 ? (
                                    uniqueMemory.map((products) => {
                                        return (
                                            <>
                                                <span className="badge badge-info">
                                                    {products}
                                                </span>
                                            </>
                                        )
                                    })
                                ) : (
                                    <span>Memórias indisponíveis</span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <h1 className="text-2xl">Cores</h1>

                            <div className="flex gap-3">
                                {uniqueColor.length > 0 ? (
                                    uniqueColor.map((products) => {
                                        return (
                                            <>
                                                <div
                                                    className={
                                                        'w-5 h-5  rounded-full border border-white ' +
                                                        (products == 'preto'
                                                            ? 'bg-black'
                                                            : products ==
                                                              'branco'
                                                            ? 'bg-white'
                                                            : products ==
                                                              'vermelho'
                                                            ? 'bg-red-500'
                                                            : products ==
                                                                  'verdealpino' ??
                                                              'verdealpino'
                                                            ? 'bg-lime-900'
                                                            : products == 'azul'
                                                            ? 'bg-blue-500'
                                                            : products ==
                                                              'meianoite'
                                                            ? 'bg-gray-900'
                                                            : products ==
                                                              'azulsierra'
                                                            ? 'bg-slate-400'
                                                            : products ==
                                                              'azulpacifico'
                                                            ? 'bg-cyan-900'
                                                            : products ==
                                                              'grafite'
                                                            ? 'bg-gray-700'
                                                            : products ==
                                                              'prateado'
                                                            ? 'bg-gray-400'
                                                            : products ==
                                                              'estelar'
                                                            ? 'bg-white'
                                                            : products ==
                                                              'dourado'
                                                            ? 'bg-amber-100'
                                                            : products == 'pink'
                                                            ? 'bg-pink-200'
                                                            : '')
                                                    }
                                                />
                                            </>
                                        )
                                    })
                                ) : (
                                    <span>Cores indisponíveis</span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="relative w-24 flex justify-center">
                                <h1 className="font-semibold text-base leading-4">
                                    R$ 2.215,00
                                </h1>
                                <div className="bg-red-500 w-full mt-2 absolute h-[1px]"></div>
                            </div>
                            <h2 className="text-2xl font-bold">R$ 2.000,00</h2>
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
                            <div className="flex items-center md:items-center">
                                <h1>Frete: Grátis</h1>
                                <h2 className="text-xs text-gray-400">
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
                                <h1 className="text-xl">Descrição</h1>
                                <p className="transition-all duration-500 delay-500">
                                    {showMore
                                        ? description
                                        : `${description.substring(0, 250)}` +
                                          '...'}
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
                <div className="flex flex-col my-10 gap-3 text-PrimaryText">
                    <div className="w-full rounded-lg bg-colorCard hidden items-center justify-start p-4 gap-1 md:flex-col md:items-start md:flex">
                        <h1 className="text-2xl">Descrição</h1>
                    </div>
                    <p className="text-sm px-3">
                        {description.split('\n').map((it, i) => (
                            <div key={'x' + i}>{it}</div>
                        ))}
                    </p>
                </div>
            </div>
            <Footer dataCategory={data} />
        </>
    )
}

export const getStaticProps = async (context) => {
    const getVisitorData = async () => {
        try {
            const { params } = context
            const { data } = await apiPedidos.get(
                `products/${params.productsId}`
            )
            return {
                props: {
                    data,
                },
            }
        } catch (error) {
            return {
                props: {
                    data: null,
                },
            }
        }
    }
    return getVisitorData()
}

export async function getStaticPaths() {
    const { data } = await apiPedidos.get(`products/`)

    const paths = data.data.map((products) => {
        return {
            params: {
                productsId: `${products.id}`,
            },
        }
    })

    return { paths, fallback: false }
}
