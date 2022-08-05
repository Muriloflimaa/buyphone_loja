import ProductCart from '../components/ProductCart/ProductCart'
import iPhoneProduct from '../assets/images/product.svg'

import Footer from '../components/Footer'
import NavBar from '../components/NavBar/NavBar'
import { apiPedidos } from '../services/apiClient'
import { ICategory } from '../types'
import { GetStaticProps } from 'next'

interface DataProps {
    data: {
        data: Array<ICategory>
    }
}

export default function Cart({ data }: DataProps) {
    return (
        <>
            <NavBar dataCategory={data} />
            <div className="py-16"></div>
            <div className="max-w-7xl mx-auto">
                <div className="w-full flex justify-between p-4 items-center">
                    <h1 className="uppercase text-xl font-light text-PrimaryText">
                        Meu carrinho
                    </h1>
                    <span className="text-xs font-light text-PrimaryText">
                        2 itens
                    </span>
                </div>
                <div className="flex flex-col gap-3 p-4">
                    <ProductCart
                        name="iPhone 12 pro MAX"
                        id="Azul / 256GB"
                        qtdProduct={1}
                        priceProduct={5.2}
                        image={iPhoneProduct}
                        shadow="shadow-md"
                    />
                    <ProductCart
                        name="iPhone 12 pro MAX"
                        id="Azul / 256GB"
                        qtdProduct={1}
                        priceProduct={5.2}
                        image={iPhoneProduct}
                        shadow="shadow-md"
                    />
                </div>
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
