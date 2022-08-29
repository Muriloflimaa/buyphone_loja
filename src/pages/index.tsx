import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useContext } from 'react'
import CarouselComponent from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import { AuthContext } from '../context/AuthContext'
import { useCart } from '../context/UseCartContext'
import { apiPedidos } from '../services/apiClient'
import { ICategory } from '../types'

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
    const { userData } = useContext(AuthContext)
    // Calculando itens por produto disponível no carrinho (anterior, atual)
    cart.reduce((sumAmount, product) => {
        const newSumAmount = { ...sumAmount }
        newSumAmount[product.id] = product.amount
        return newSumAmount
    }, {} as CartItemsAmount)
    console.log(userData)
    const discount = userData?.type === 1 ? 12.5 : 7

    return (
        <>
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
                            category.products.map((products) => {
                                const itens = [
                                    products.price,
                                    products.magalu_price,
                                    products.americanas_price,
                                    products.casasbahia_price,
                                    products.ponto_price,
                                ]
                                const filteredItens = itens.filter(
                                    (item) => item
                                )
                                const averagePrice =
                                    filteredItens.length > 0
                                        ? Math.min(...filteredItens)
                                        : 0
                                const discountPrice = Math.round(
                                    averagePrice * (discount / 100)
                                )
                                const ourPrice = averagePrice - discountPrice

                                return ourPrice ? (
                                    <ProductCard
                                        key={products.id}
                                        id={products.id}
                                        name={products.name}
                                        idCategory={category.id}
                                        colorPhone={products.color}
                                        price={ourPrice}
                                        averagePrice={averagePrice}
                                        slug={products.slug}
                                        slugCategory={category.slug}
                                        image={products.media[0].original_url}
                                        memory={products.memory}
                                    />
                                ) : (
                                    <></>
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
