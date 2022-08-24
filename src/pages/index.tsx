import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useContext, useState } from 'react'
import CarouselComponent from '../components/carousel'
import ProductCard from '../components/ProductCard/ProductCard'
import { useCart } from '../hooks/useCart'
import { apiPedidos } from '../services/apiClient'
import { ICategory } from '../types'
import { AuthContext } from '../hooks/AuthContext'
import { useLocalStorage } from '../services/useLocalStorage'

interface DataProps {
    data: {
        data: Array<ICategory>
    }
}

interface CartItemsAmount {
    [key: number]: number
}

const Home: NextPage<DataProps> = ({ data }) => {
    const { cart } = useCart()
    // Calculando itens por produto disponível no carrinho (anterior, atual)
    cart.reduce((sumAmount, product) => {
        const newSumAmount = { ...sumAmount }
        newSumAmount[product.id] = product.amount
        return newSumAmount
    }, {} as CartItemsAmount)

    return (
        <>
            <div className="h-auto">
                <CarouselComponent />
                <div className="alert alert-success bg-[#00a843] justify-center my-10 text-sm md:text-md max-w-7xl mx-auto">
                    <FontAwesomeIcon
                        icon={faTruckFast}
                        className="w-7 h-7 text-PrimaryText"
                    />
                    <span className="text-PrimaryText">
                        Todos os nossos produtos com frete grátis. Prazo: 10 a
                        15 dias úteis
                    </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 mx-auto gap-6 px-5 md:px-0 max-w-7xl">
                    {data.data.length > 0 ? (
                        data.data.map((category) =>
                            category.products.map((products) => (
                                <ProductCard
                                    key={products.id}
                                    id={products.id}
                                    name={products.name}
                                    idCategory={category.id}
                                    colorPhone={products.color}
                                    averagePrice={products.price}
                                    price={products.price}
                                    slug={products.slug}
                                    slugCategory={category.slug}
                                    image={products.media[0].original_url}
                                    memory={products.memory}
                                />
                            ))
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

export const getStaticProps: GetStaticProps = async () => {
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
}

export default Home
