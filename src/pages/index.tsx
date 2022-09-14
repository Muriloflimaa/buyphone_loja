import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SearchIcon, XIcon } from '@heroicons/react/solid'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import CarouselComponent from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/UseCartContext'
import { apiPedidos } from '../services/apiClient'
import { ICategory } from '../types'
import { GetUseType } from '../utils/getUserType'
import { PersistentLogin } from '../utils/PersistentLogin'
import { verificationPrice } from '../utils/verificationPrice'

interface DataProps {
    data: {
        data: Array<ICategory>
    }
}

interface CartItemsAmount {
    [key: number]: number
}

const Home: NextPage<DataProps> = ({ data }) => {
    const user = GetUseType()
    const { cart } = useCart()
    const [showSearch, setShowSearch] = useState(false)

    // Calculando itens por produto disponível no carrinho (anterior, atual)
    cart.reduce((sumAmount, product) => {
        const newSumAmount: any = { ...sumAmount }
        newSumAmount[product.id] = product.amount
        return newSumAmount
    }, {} as CartItemsAmount)

    const [inputSearch, setInputSearch] = useState('')
    const [searchParam] = useState(['name', 'memory', 'color'])

    function search(items: any) {
        return items.filter((item: any) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .replace(/ /g, '')
                        .indexOf(inputSearch.toLowerCase().replace(/ /g, '')) >
                    -1
                )
            })
        })
    }

    return (
        <>
            <div className="w-full flex justify-end fixed z-50 -mt-[70px] px-7 md:hidden">
                {showSearch === false ? (
                    <SearchIcon
                        className="h-5 w-5 text-PrimaryText block md:hidden"
                        onClick={() => setShowSearch(!showSearch)}
                    />
                ) : (
                    <XIcon
                        className="h-5 w-5 text-PrimaryText block md:hidden"
                        onClick={() => setShowSearch(!showSearch)}
                    />
                )}
            </div>
            <div
                className={
                    'fixed z-50 w-full h-12 transition-all duration-200 block md:hidden ' +
                    (showSearch === false ? '-mt-[200px]' : '-mt-[30px]')
                }
            >
                <input
                    type="input"
                    name="search-form"
                    id="search-form"
                    className="input input-bordered rounded-none  w-full text-white bg-primary"
                    placeholder="Pesquisa..."
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                />
            </div>
            <div className=" z-50 pb-4 fixed xl:w-[600px] left-1/2 xl:-ml-[300px] md:w-[400px] md:-ml-[200px] -mt-[87px] md:-mt-32 hidden md:block">
                <input
                    type="search"
                    name="search-form"
                    id="search-form"
                    className="input input-bordered rounded-md !important w-full text-white bg-[#4a3e865b]"
                    placeholder="Pesquisa..."
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                />
            </div>
            <div className="h-auto">
                <CarouselComponent />
                <img
                    className="md:hidden max-h-full"
                    src="https://loja.buyphone.com.br/img/banner-full1.webp"
                    alt=""
                ></img>
                <div className="flex justify-center mx-5">
                    <div className="alert alert-success bg-[#00a843] justify-center my-10 text-sm text-center md:text-md w-full max-w-7xl">
                        <FontAwesomeIcon
                            icon={faTruckFast}
                            className="w-7 h-7 text-PrimaryText hidden md:flex"
                        />
                        <span className="text-PrimaryText">
                            Todos os nossos produtos com frete grátis. Prazo: 10
                            a 15 dias úteis
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 mx-auto gap-6 px-5 md:px-0 max-w-7xl">
                    {data.data.length > 0 ? (
                        data.data.map((category) =>
                            search(category.products).map((products: any) => {
                                const returnPrice = verificationPrice(
                                    products,
                                    user
                                )
                                return (
                                    returnPrice.ourPrice > 0 && (
                                        <ProductCard
                                            key={products.id}
                                            id={products.id}
                                            name={products.name}
                                            idCategory={category.id}
                                            colorPhone={products.color}
                                            price={returnPrice.ourPrice}
                                            averagePrice={
                                                returnPrice.averagePrice
                                            }
                                            slug={products.slug}
                                            slugCategory={category.slug}
                                            image={
                                                products.media[0].original_url
                                            }
                                            memory={products.memory}
                                        />
                                    )
                                )
                            })
                        )
                    ) : (
                        <span>Categoria de produtos não disponíveis.</span>
                    )}
                </div>
                <Link
                    href={'https://api.whatsapp.com/send?phone=5518981367275'}
                    passHref
                >
                    <a
                        target="_blank"
                        className="alert alert-success justify-center my-10 text-sm md:text-md max-w-7xl mx-auto text-PrimaryText bg-[#00a843]"
                    >
                        <FontAwesomeIcon
                            icon={faWhatsapp}
                            className="w-7 h-7 text-PrimaryText"
                        />
                        Não encontrou o que procura? Clique aqui para falar com
                        o nosso consultor.
                    </a>
                </Link>
            </div>
        </>
    )
}

export const getServerSideProps = PersistentLogin(async (ctx) => {
    try {
        const { data } = await apiPedidos.get(`categories/`)
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
})

export default Home
