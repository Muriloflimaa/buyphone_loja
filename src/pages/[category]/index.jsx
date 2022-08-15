import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { apiPedidos } from '../../services/apiClient'

import dynamic from 'next/dynamic'

dynamic(() => require('tw-elements'), { ssr: false })
//a
export default function Products({ data }) {
    const [click, setClick] = useState(false)
    console.log(data)

    return (
        <>
            {/* <NavBar dataCategory={data} /> */}
            <div className="py-20"></div>
            <div className="h-auto">
                {/* começo */}
                <div
                    id="carouselExampleControls"
                    className="carousel slide relative max-w-7xl mx-auto rounded-xl hidden md:block"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-inner relative w-full overflow-hidden">
                        <div className="carousel-item active relative float-left w-full">
                            <img
                                src="https://loja.buyphone.com.br/img/banner1.webp"
                                className="w-full"
                                alt="Banner 1"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="carousel-item relative float-left w-full">
                            <img
                                src="https://loja.buyphone.com.br/img/banner2.webp"
                                className="w-full"
                                alt="Banner 2"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev"
                        onClick={() => setClick(!click)}
                    >
                        <span
                            className="carousel-control-prev-icon inline-block bg-no-repeat"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="next"
                        onClick={() => setClick(!click)}
                    >
                        <span
                            className="carousel-control-next-icon inline-block bg-no-repeat"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                {/* fim */}

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
                    {/* {data.data.products.length > 0 ? (
                        data.data.products.map((products) => (
                            <ProductCard
                                id={products.id}
                                name={products.name}
                                colorPhone={products.color}
                                averagePrice={products.price}
                                price={products.price}
                                image={products.media[0].original_url}
                                memory={products.memory}
                            />
                        ))
                    ) : (
                        <span>Categoria de produtos não disponíveis.</span>
                    )} */}
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
            </div>
        </>
    )
}

export const getStaticProps = async (context) => {
    try {
        const { params } = context
        const { data } = await apiPedidos.get(`categories/${params.category}`)
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

export async function getStaticPaths() {
    const { data } = await apiPedidos.get(`categories/`)

    const paths = data.data.map((category) => {
        return {
            params: {
                category: `${category.id}`,
            },
        }
    })

    return { paths, fallback: false }
}
