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

export default function credit({ data }: DataProps) {
    return (
        <>
            <NavBar dataCategory={data} />
            <div className="py-16"></div>

            <div className="max-w-7xl mx-auto grid gap-3 my-10">
                <ShippingCard />
                <div className="flex flex-col gap-4 max-w-4xl mx-auto my-6">
                    <h3 className="font-medium flex items-center gap-2">
                        <Link href={'/shipping/payment'} passHref>
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
                                Opções de pagamento
                            </a>
                        </Link>
                    </h3>
                    <div className="grid gap-4">
                        <div className="w-full btn btn-disabled bg-base-200 btn-md gap-2 normal-case lg:gap-3 justify-between my-2">
                            <div className="flex flex-col text-left">
                                <span>Cartão de Crédito</span>
                                <span className="text-neutral-100/30 text-xs font-normal">
                                    Parcele em até 12x no cartão de crédito
                                </span>
                            </div>
                            <svg
                                className="h-6 w-6 fill-current md:h-8 md:w-8"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                            </svg>
                        </div>
                        <div className="divider">Informações de Pagamento</div>
                        <Link href={'/shipping/payment'} passHref>
                            <a className="alert border-2 my-2 md:mt-5 md:flex flex-row justify-start">
                                <i className="fa fa-lightbulb mr-2"></i>
                                <div className="flex flex-col items-start text-xs">
                                    <strong>
                                        Economize no valor final da compra!
                                    </strong>
                                    <span>
                                        Clique aqui para realizar o pagamento de
                                        forma personalizada, com um pix de
                                        entrada, diminuindo o valor final do
                                        parcelamento!
                                    </span>
                                </div>
                            </a>
                        </Link>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <form
                                id="form"
                                method="POST"
                                action="https://loja.buyphone.com.br/payment/credit"
                            >
                                <input
                                    type="hidden"
                                    name="_token"
                                    defaultValue={''}
                                />
                                <div className="field-container">
                                    <label htmlFor="name" className="label">
                                        Nome impresso no cartão
                                    </label>
                                    <input
                                        className="input input-bordered w-full"
                                        id="name"
                                        name="card_holder_name"
                                        defaultValue={''}
                                        maxLength={20}
                                        type="text"
                                    />
                                </div>
                                <div className="field-container">
                                    <label
                                        htmlFor="cardnumber"
                                        className="label"
                                    >
                                        Número do Cartão
                                    </label>
                                    <input
                                        className="input input-bordered w-full"
                                        id="cardnumber"
                                        name="card_number"
                                        type="tel"
                                        inputMode="numeric"
                                        defaultValue={''}
                                    />
                                    <svg
                                        id="ccicon"
                                        className="ccicon"
                                        width="750"
                                        height="471"
                                        viewBox="0 0 750 471"
                                        xmlns="http://www.w3.org/2000/svg"
                                    ></svg>
                                </div>
                                <div className="flex gap-2 w-full">
                                    <div className="field-container">
                                        <label
                                            htmlFor="expirationdate"
                                            className="label"
                                        >
                                            MM/AA
                                        </label>
                                        <input
                                            className="input input-bordered w-full"
                                            id="expirationdate"
                                            name="expiration_date"
                                            type="tel"
                                            inputMode="numeric"
                                            defaultValue={''}
                                        />
                                    </div>
                                    <div className="field-container w-full">
                                        <label
                                            htmlFor="securitycode"
                                            className="label"
                                        >
                                            Código de Segurança
                                        </label>
                                        <input
                                            className="input input-bordered w-full"
                                            id="securitycode"
                                            name="card_cvv"
                                            type="text"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>
                                <div className="field-container">
                                    <label
                                        htmlFor="carddocument"
                                        className="label"
                                    >
                                        CPF / CNPJ
                                    </label>
                                    <input
                                        className="input input-bordered w-full"
                                        id="carddocument"
                                        name="document"
                                        maxLength={20}
                                        type="text"
                                        defaultValue={''}
                                    />
                                </div>
                                <div className="field-container">
                                    <label
                                        htmlFor="installments"
                                        className="label"
                                    >
                                        Opções de Parcelamento
                                    </label>
                                    <select
                                        name="installments"
                                        id="installments"
                                        className="select select-bordered w-full"
                                        defaultValue={2}
                                    >
                                        <option value={1}>
                                            1x de R$0,00 (sem juros)
                                        </option>
                                        <option value={2}>
                                            2x de R$0,50 (com juros)
                                        </option>
                                        <option value={3}>
                                            3x de R$0,33 (com juros)
                                        </option>
                                        <option value={4}>
                                            4x de R$0,25 (com juros)
                                        </option>
                                        <option value={5}>
                                            5x de R$0,20 (com juros)
                                        </option>
                                        <option value={6}>
                                            6x de R$0,17 (com juros)
                                        </option>
                                        <option value={7}>
                                            7x de R$0,14 (com juros)
                                        </option>
                                        <option value={8}>
                                            8x de R$0,12 (com juros)
                                        </option>
                                        <option value={9}>
                                            9x de R$0,11 (com juros)
                                        </option>
                                        <option value={10}>
                                            10x de R$0,10 (com juros)
                                        </option>
                                        <option value={11}>
                                            11x de R$0,09 (com juros)
                                        </option>
                                        <option value={12}>
                                            12x de R$0,08 (com juros)
                                        </option>
                                    </select>
                                </div>
                            </form>
                            <div className="container mx-auto">
                                <Link href={'/shipping/payment'} passHref>
                                    <a className="alert border-2 my-2 md:mt-5 md:flex flex-row justify-start hidden">
                                        <i className="fa fa-lightbulb mr-2"></i>
                                        <div className="flex flex-col items-start text-xs">
                                            <strong>
                                                Economize no valor final da
                                                compra!
                                            </strong>
                                            <span>
                                                Clique aqui para realizar o
                                                pagamento de forma
                                                personalizada, com um pix de
                                                entrada, diminuindo o valor
                                                final do parcelamento!
                                            </span>
                                        </div>
                                    </a>
                                </Link>
                                <div className="creditcard h-[54vw] md:h-auto mt-4 md:mt-auto">
                                    <div className="front shadow-md rounded-3xl">
                                        <div id="ccsingle"></div>
                                        <svg
                                            id="cardfront"
                                            xmlns="http://www.w3.org/2000/svg"
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 750 471"
                                            xmlSpace="preserve"
                                        >
                                            <g id="Front">
                                                <g id="CardBackground">
                                                    <g id="Page-1_1_">
                                                        <g id="amex_1_">
                                                            <path
                                                                id="Rectangle-1_1_"
                                                                className="lightcolor grey"
                                                                d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40 C0,17.9,17.9,0,40,0z"
                                                            ></path>
                                                        </g>
                                                    </g>
                                                    <path
                                                        className="darkcolor greydark"
                                                        d="M750,431V193.2c-217.6-57.5-556.4-13.5-750,24.9V431c0,22.1,17.9,40,40,40h670C732.1,471,750,453.1,750,431z"
                                                    ></path>
                                                </g>
                                                <text
                                                    transform="matrix(1 0 0 1 60.106 295.0121)"
                                                    id="svgnumber"
                                                    className="st2 st3 st4"
                                                >
                                                    0123 4567 8910 1112
                                                </text>
                                                <text
                                                    transform="matrix(1 0 0 1 54.1064 428.1723)"
                                                    id="svgname"
                                                    className="st2 st5 st6"
                                                >
                                                    BUYPHONE MATCH
                                                </text>
                                                <text
                                                    transform="matrix(1 0 0 1 54.1074 389.8793)"
                                                    className="st7 st5 st8"
                                                >
                                                    nome
                                                </text>
                                                <text
                                                    transform="matrix(1 0 0 1 479.7754 388.8793)"
                                                    className="st7 st5 st8"
                                                >
                                                    validade
                                                </text>
                                                <text
                                                    transform="matrix(1 0 0 1 65.1054 241.5)"
                                                    className="st7 st5 st8"
                                                >
                                                    número do cartão
                                                </text>
                                                <g>
                                                    <text
                                                        transform="matrix(1 0 0 1 574.4219 433.8095)"
                                                        id="svgexpire"
                                                        className="st2 st5 st9"
                                                    >
                                                        01/23
                                                    </text>
                                                    <text
                                                        transform="matrix(1 0 0 1 479.3848 417.0097)"
                                                        className="st2 st10 st11"
                                                    >
                                                        VALID
                                                    </text>
                                                    <text
                                                        transform="matrix(1 0 0 1 479.3848 435.6762)"
                                                        className="st2 st10 st11"
                                                    >
                                                        THRU
                                                    </text>
                                                    <polygon
                                                        className="st2"
                                                        points="554.5,421 540.4,414.2 540.4,427.9"
                                                    ></polygon>
                                                </g>
                                                <g id="cchip">
                                                    <g>
                                                        <path
                                                            className="st2"
                                                            d="M168.1,143.6H82.9c-10.2,0-18.5-8.3-18.5-18.5V74.9c0-10.2,8.3-18.5,18.5-18.5h85.3 c10.2,0,18.5,8.3,18.5,18.5v50.2C186.6,135.3,178.3,143.6,168.1,143.6z"
                                                        ></path>
                                                    </g>
                                                    <g>
                                                        <g>
                                                            <rect
                                                                x="82"
                                                                y="70"
                                                                className="st12"
                                                                width="1.5"
                                                                height="60"
                                                            ></rect>
                                                        </g>
                                                        <g>
                                                            <rect
                                                                x="167.4"
                                                                y="70"
                                                                className="st12"
                                                                width="1.5"
                                                                height="60"
                                                            ></rect>
                                                        </g>
                                                        <g>
                                                            <path
                                                                className="st12"
                                                                d="M125.5,130.8c-10.2,0-18.5-8.3-18.5-18.5c0-4.6,1.7-8.9,4.7-12.3c-3-3.4-4.7-7.7-4.7-12.3 c0-10.2,8.3-18.5,18.5-18.5s18.5,8.3,18.5,18.5c0,4.6-1.7,8.9-4.7,12.3c3,3.4,4.7,7.7,4.7,12.3 C143.9,122.5,135.7,130.8,125.5,130.8z M125.5,70.8c-9.3,0-16.9,7.6-16.9,16.9c0,4.4,1.7,8.6,4.8,11.8l0.5,0.5l-0.5,0.5 c-3.1,3.2-4.8,7.4-4.8,11.8c0,9.3,7.6,16.9,16.9,16.9s16.9-7.6,16.9-16.9c0-4.4-1.7-8.6-4.8-11.8l-0.5-0.5l0.5-0.5 c3.1-3.2,4.8-7.4,4.8-11.8C142.4,78.4,134.8,70.8,125.5,70.8z"
                                                            ></path>
                                                        </g>
                                                        <g>
                                                            <rect
                                                                x="82.8"
                                                                y="82.1"
                                                                className="st12"
                                                                width="25.8"
                                                                height="1.5"
                                                            ></rect>
                                                        </g>
                                                        <g>
                                                            <rect
                                                                x="82.8"
                                                                y="117.9"
                                                                className="st12"
                                                                width="26.1"
                                                                height="1.5"
                                                            ></rect>
                                                        </g>
                                                        <g>
                                                            <rect
                                                                x="142.4"
                                                                y="82.1"
                                                                className="st12"
                                                                width="25.8"
                                                                height="1.5"
                                                            ></rect>
                                                        </g>
                                                        <g>
                                                            <rect
                                                                x="142"
                                                                y="117.9"
                                                                className="st12"
                                                                width="26.2"
                                                                height="1.5"
                                                            ></rect>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                            <g id="Back"></g>
                                        </svg>
                                    </div>
                                    <div className="back shadow-md rounded-3xl">
                                        <svg
                                            id="cardback"
                                            xmlns="http://www.w3.org/2000/svg"
                                            x="0px"
                                            y="0px"
                                            viewBox="0 0 750 471"
                                            xmlSpace="preserve"
                                        >
                                            <g id="Front">
                                                <line
                                                    className="st0"
                                                    x1="35.3"
                                                    y1="10.4"
                                                    x2="36.7"
                                                    y2="11"
                                                ></line>
                                            </g>
                                            <g id="Back">
                                                <g id="Page-1_2_">
                                                    <g id="amex_2_">
                                                        <path
                                                            id="Rectangle-1_2_"
                                                            className="darkcolor greydark"
                                                            d="M40,0h670c22.1,0,40,17.9,40,40v391c0,22.1-17.9,40-40,40H40c-22.1,0-40-17.9-40-40V40 C0,17.9,17.9,0,40,0z"
                                                        ></path>
                                                    </g>
                                                </g>
                                                <rect
                                                    y="61.6"
                                                    className="st2"
                                                    width="750"
                                                    height="78"
                                                ></rect>
                                                <g>
                                                    <path
                                                        className="st3"
                                                        d="M701.1,249.1H48.9c-3.3,0-6-2.7-6-6v-52.5c0-3.3,2.7-6,6-6h652.1c3.3,0,6,2.7,6,6v52.5 C707.1,246.4,704.4,249.1,701.1,249.1z"
                                                    ></path>
                                                    <rect
                                                        x="42.9"
                                                        y="198.6"
                                                        className="st4"
                                                        width="664.1"
                                                        height="10.5"
                                                    ></rect>
                                                    <rect
                                                        x="42.9"
                                                        y="224.5"
                                                        className="st4"
                                                        width="664.1"
                                                        height="10.5"
                                                    ></rect>
                                                    <path
                                                        className="st5"
                                                        d="M701.1,184.6H618h-8h-10v64.5h10h8h83.1c3.3,0,6-2.7,6-6v-52.5C707.1,187.3,704.4,184.6,701.1,184.6z"
                                                    ></path>
                                                </g>
                                                <text
                                                    transform="matrix(1 0 0 1 621.999 227.2734)"
                                                    id="svgsecurity"
                                                    className="st6 st7"
                                                >
                                                    985
                                                </text>
                                                <g className="st8">
                                                    <text
                                                        transform="matrix(1 0 0 1 518.083 280.0879)"
                                                        className="st9 st6 st10"
                                                    >
                                                        Cod.Segurança
                                                    </text>
                                                </g>
                                                <rect
                                                    x="58.1"
                                                    y="378.6"
                                                    className="st11"
                                                    width="375.5"
                                                    height="13.5"
                                                ></rect>
                                                <rect
                                                    x="58.1"
                                                    y="405.6"
                                                    className="st11"
                                                    width="421.7"
                                                    height="13.5"
                                                ></rect>
                                                <text
                                                    transform="matrix(1 0 0 1 59.5073 228.6099)"
                                                    id="svgnameback"
                                                    className="st12 st13"
                                                >
                                                    BuyPhone Match
                                                </text>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="btn btn-info mt-8 mb-0"
                            id="refresh"
                        >
                            Pagar
                        </button>
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
