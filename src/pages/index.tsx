import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FastForwardIcon } from '@heroicons/react/solid'
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import iPhoneProduct from '../assets/images/product.svg'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar/NavBar'
import ProductCard from '../components/ProductCard/ProductCard'
import { apiPedidos } from '../services/apiClient'
import { ICategory } from '../types'

interface DataProps {
    data: {
        data: Array<ICategory>
    }
}

const Home: NextPage<DataProps> = ({ data }) => {
    const [click, setClick] = useState(false)

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <>
            <NavBar dataCategory={data} />
            <div className="py-16"></div>
            <div className="h-auto">
                <div className="carousel mx-auto w-7xl max-w-7xl rounded-2xl mt-2 hidden md:flex">
                    <div id="item1" className="carousel-item w-full">
                        <div className="flickity-viewport">
                            <div className="flickity-slider">
                                <div
                                    className="absolute flex justify-between transform -translate-y-1/2 left-5 mx-auto max-w-7xl px-4 right-5 mt-[6.5rem]"
                                    onClick={() => setClick(!click)}
                                >
                                    <a
                                        href={click ? '#item1' : '#item2'}
                                        className="btn btn-circle text-PrimaryText"
                                        aria-hidden="true"
                                    >
                                        ❮
                                    </a>
                                    <a
                                        href={click ? '#item1' : '#item2'}
                                        className="btn btn-circle text-PrimaryText"
                                        aria-hidden="true"
                                    >
                                        ❯
                                    </a>
                                </div>
                                <img
                                    src="https://loja.buyphone.com.br/img/banner2.webp"
                                    className="w-full"
                                    alt=""
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    </div>
                    <div id="item2" className="carousel-item w-full">
                        <div className="flickity-viewport">
                            <div className="flickity-slider">
                                <img
                                    src="https://loja.buyphone.com.br/img/banner1.webp"
                                    className="w-full"
                                    alt=""
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="justify-center w-full py-6 gap-2 hidden md:flex">
                    <a
                        href="#item2"
                        onClick={() => setClick(!click)}
                        className={
                            click
                                ? 'bg-PrimaryText rounded-full btn btn-xs w-2 h-2 p-1 min-h-0  hover:bg-blue-700'
                                : 'bg-blue-700 rounded-full btn btn-xs w-2 h-2 p-1 min-h-0 hover:bg-blue-700'
                        }
                    ></a>
                    <a
                        href="#item1"
                        onClick={() => setClick(!click)}
                        className={
                            !click
                                ? 'bg-PrimaryText rounded-full btn btn-xs w-2 h-2 p-1 min-h-0  hover:bg-blue-700'
                                : 'bg-blue-700 rounded-full btn btn-xs w-2 h-2 p-1 min-h-0 hover:bg-blue-700'
                        }
                    ></a>
                </div>
                <div className="alert alert-success bg-[#00a843] justify-center my-6 text-sm md:text-md max-w-7xl mx-auto">
                    <FontAwesomeIcon
                        icon={faTruckFast}
                        className="w-7 h-7 text-PrimaryText"
                    />
                    <span className="text-PrimaryText">
                        Todos os nossos produtos com frete grátis. Prazo: 10 a
                        15 dias úteis
                    </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 mx-auto py-6 gap-6 px-5 md:px-0 max-w-7xl">
                    <ProductCard
                        name="iPhone X"
                        colorPhone="Preto"
                        priceOld="5.123,00"
                        price="4.659,00"
                        image={iPhoneProduct}
                    />
                    <ProductCard
                        name="iPhone X"
                        colorPhone="Branco"
                        priceOld="5.123,00"
                        price="4.659,00"
                        image={iPhoneProduct}
                    />
                    <ProductCard
                        name="iPhone X"
                        colorPhone="Vermelho"
                        priceOld="5.123,00"
                        price="4.659,00"
                        image={iPhoneProduct}
                    />
                    <ProductCard
                        name="iPhone X"
                        colorPhone="Preto"
                        priceOld="5.123,00"
                        price="4.659,00"
                        image={iPhoneProduct}
                    />
                    <ProductCard
                        name="iPhone X"
                        colorPhone="Preto"
                        priceOld="5.123,00"
                        price="4.659,00"
                        image={iPhoneProduct}
                    />
                </div>
                <a
                    href="https://api.whatsapp.com/send?phone=5518997188537"
                    target="_blank"
                    className="alert alert-success justify-center my-6 text-sm md:text-md max-w-7xl mx-auto text-PrimaryText bg-[#00a843]"
                >
                    <FontAwesomeIcon
                        icon={faWhatsapp}
                        className="w-7 h-7 text-PrimaryText"
                    />
                    Não encontrou o que procura? Clique aqui para falar com o
                    nosso consultor.
                </a>
                {/* DAR UM MAP COM O ARRAY DOS PRODUTOS */}
            </div>
            <Footer dataCategory={data} />
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const getVisitorData = async () => {
        try {
            const { data } = await apiPedidos.get(`categories/`)
            return {
                props: {
                    data,
                },
                revalidate: 60 * 60 * 6,
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

export default Home
