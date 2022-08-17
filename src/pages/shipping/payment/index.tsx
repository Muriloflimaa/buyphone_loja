import Link from 'next/link'
import ShippingCard from '../../../components/ShippingCard.tsx/ShippingCard'

import { ICategory } from '../../../types'
import { GetStaticProps } from 'next'
import { apiPedidos } from '../../../services/apiClient'
import NavBar from '../../../components/NavBar/NavBar'
import Footer from '../../../components/Footer'

interface DataProps {
    data: {
        data: Array<ICategory>
    }
}

export default function payment({ data }: DataProps) {
    return (
        <>
            <NavBar dataCategory={data} />
            <div className="py-16"></div>
            <div className="max-w-7xl mx-auto grid gap-3 my-10">
                <ShippingCard />
                <div className="flex flex-col justify-center items-center gap-4 max-w-sm mx-auto my-6 text-PrimaryText">
                    <h3 className="font-medium">Opções de pagamento</h3>
                    <div className="grid gap-8 text-PrimaryText">
                        <div>
                            <Link href={'/shipping/payment/pix'} passHref>
                                <a className="btn btn-outline w-full justify-between">
                                    <span>Pix</span>
                                    <svg
                                        className="h-6 w-6 fill-current md:h-8 md:w-8"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                                    </svg>
                                </a>
                            </Link>
                            <span className="text-PrimaryText mt-2 block text-xs font-normal">
                                * Com o pix à vista você paga muito mais barato!
                            </span>
                        </div>
                        <div>
                            <Link href={'/shipping/payment/credit'} passHref>
                                <a className="btn btn-outline w-full justify-between">
                                    <span>Cartão de crédito</span>
                                    <svg
                                        className="h-6 w-6 fill-current md:h-8 md:w-8"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                                    </svg>
                                </a>
                            </Link>
                            <span className="mt-2 block text-xs font-normal">
                                * Parcele em até 12x no cartão de crédito
                            </span>
                        </div>
                        <div>
                            <Link href={'/shipping/payment/custom'}>
                                <a className="btn btn-outline w-full justify-between">
                                    <span>Personalizado</span>
                                    <svg
                                        className="h-6 w-6 fill-current md:h-8 md:w-8"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                                    </svg>
                                </a>
                            </Link>
                            <span className=" mt-2 block text-xs font-normal">
                                * Nesta forma de pagamento você poderá dar uma
                                entrada no Pix e parcelar o restante. Assim você
                                economiza no valor final da compra!
                            </span>
                        </div>
                    </div>
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
                revalidate: 60 * 60 * 24 * 30,
            }
        } catch (error) {
            return {
                props: {
                    data: null,
                },
                revalidate: 60 * 60 * 24 * 30,
            }
        }
    }
    return getVisitorData()
}
