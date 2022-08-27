import Link from 'next/link'
import { useState } from 'react'
import ReactInputMask from 'react-input-mask'
import Card from '../../../components/Card/index'
import ShippingCard from '../../../components/ShippingCard.tsx'

export default function credit() {
    const [name, setName] = useState('José Antonio')
    const [card, setCard] = useState('')
    const [expiration_date, setExpiration_date] = useState('')
    const [code, setCode] = useState('')
    const [unMask, setUnMask] = useState()
    const [focus, setFocus] = useState(false)

    const handleChangeName = (event: any) => {
        setName(event.target.value)
    }

    const handleChangeCard = (event: any) => {
        setCard(event.target.value)
    }

    const handleChangeValid = (event: any) => {
        setExpiration_date(event.target.value)
    }

    const handleChangeCode = (event: any) => {
        setCode(event.target.value)
    }

    function inputFocus() {
        setFocus(!focus)
    }

    function inputNoFocus() {
        setFocus(!focus)
    }

    return (
        <>
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
                        <Link href={'/shipping/payment/pix'} passHref>
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
                            <form id="form">
                                <div className="field-container">
                                    <label htmlFor="name" className="label">
                                        Nome impresso no cartão
                                    </label>
                                    <input
                                        className="input input-bordered w-full"
                                        id="name"
                                        name="name"
                                        onChange={handleChangeName}
                                        placeholder={name}
                                        maxLength={20}
                                        type="text"
                                    />
                                </div>
                                <div className="field-container">
                                    <label
                                        className="label"
                                    >
                                        Número do Cartão
                                    </label>
                                    <ReactInputMask
                                        mask="9999 9999 9999 9999"
                                        id="card"
                                        name="card"
                                        onChange={handleChangeCard}
                                        type="text"
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <div className="flex gap-2 w-full">
                                    <div className="field-container">
                                        <label
                                            className="label"
                                        >
                                            MM/AA
                                        </label>
                                        <ReactInputMask
                                            mask="99/99"
                                            id="card-expiration"
                                            name="card-expiration"
                                            onChange={handleChangeValid}
                                            type="text"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                    <div className="field-container w-full">
                                        <label
                                            className="label"
                                        >
                                            Código de Segurança
                                        </label>
                                        <ReactInputMask
                                            mask="999"
                                            id="securitycode"
                                            name="card_cvv"
                                            onChange={handleChangeCode}
                                            type="text"
                                            className="input input-bordered w-full"
                                            onFocus={inputFocus}
                                            onBlur={inputNoFocus}
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
                            <div className="flex flex-col">
                                <Link href={'/shipping/payment/pix'} passHref>
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
                                <Card
                                    name={name}
                                    card={card}
                                    expiration_date={expiration_date}
                                    foc={focus}
                                    code={code}
                                />
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
        </>
    )
}
