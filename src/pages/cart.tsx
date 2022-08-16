import ProductCart from '../components/ProductCart/ProductCart'
import iPhoneProduct from '../assets/images/product.svg'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar/NavBar'
import { apiPedidos } from '../services/apiClient'
import { ICategory } from '../types'
import { GetStaticProps } from 'next'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/format'

interface DataProps {
    data: {
        data: Array<ICategory>
    }
}

export default function Cart({ data }: DataProps) {
    const { cart } = useCart()
    const cartSize = cart.length
    const total = formatPrice(
        cart.reduce((sumTotal, product) => {
            return sumTotal + product.price * product.amount
        }, 0)
    )
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
                        {cartSize > 1 ? (
                            cartSize + 'itens'
                        ) : cartSize == 1 ? (
                            cartSize + 'item'
                        ) : (
                            <h1>Carrinho está vazio</h1>
                        )}
                    </span>
                </div>
                <div className="flex flex-col gap-3 p-4">
                    {cartSize > 0 ? <ProductCart /> : <h1>Carrinho vazio</h1>}
                </div>
            </div>
            <div className="card-body bg-base-200">
                <div className="flex justify-between py-4">
                    <span className="text-gray-500 text-lg">Valor Total:</span>
                    <span className="font-semibold text-lg">{total}</span>
                </div>
            </div>
            <Footer dataCategory={data} />
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
