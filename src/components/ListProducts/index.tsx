import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { date, moneyMask } from '../../utils/masks'

interface ListProductsProps {
    key: number
    created: string
    statuspayment: string
    number: number
    value: number
    method: string
    address: string
    city: string
    numberAddress: string
    district: string
    state: string
    zipCode: number
    linkPayment: string
    CodImgPix: string
    brCode: string
    pdf: string
}
const ListProducts = ({
    key,
    created,
    statuspayment,
    number,
    value,
    method,
    address,
    city,
    numberAddress,
    district,
    state,
    zipCode,
    linkPayment,
    CodImgPix,
    brCode,
    pdf,
}: ListProductsProps) => {
    const router = useRouter()

    const copyToClipBoard = async (copyMe: any) => {
        try {
            await navigator.clipboard.writeText(copyMe)
            toast.success('link copiado com sucesso')
        } catch (err) {
            toast.error('erro ao copiar o link')
        }
    }

    return (
        <div
            className="collapse collapse-arrow card show border border-gray-100"
            key={number + key}
        >
            <input type="checkbox" className="peer" />
            <div className="collapse-title border-b flex justify-between items-center">
                <span className="font-bold text-lg">Pedido #{number}</span>

                <div className="flex gap-2 items-center">
                    <div className="flex flex-col gap-1 items-end md:flex-row">
                        <span className="flex justify-center">
                            {(method === 'PIX' && statuspayment !== 'paid') ??
                            'manual_paid' ??
                            'captured' ? (
                                <>
                                    <label
                                        htmlFor={CodImgPix}
                                        className="badge cursor-pointer z-10"
                                    >
                                        Realizar pagamento
                                    </label>

                                    <input
                                        type="checkbox"
                                        id={CodImgPix}
                                        className="modal-toggle"
                                    />
                                    <label
                                        htmlFor={CodImgPix}
                                        className="modal cursor-pointer z-50"
                                    >
                                        <label className="modal-box relative max-w-7xl">
                                            <div className="my-10">
                                                <div className="flex flex-col gap-4 max-w-5xl mx-auto">
                                                    <div className="flex flex-col w-full md:flex-row justify-evenly mb-10">
                                                        <div className="text-center w-full px-8">
                                                            <div className="card card-compact shadow w-fit mx-auto">
                                                                <img
                                                                    src={`https://loja.buyphone.com.br/img/qrcode/4551812214423552.png`}
                                                                    alt="QRCode"
                                                                    className="mx-auto h-60"
                                                                />
                                                            </div>
                                                            <h3 className="font-bold text-3xl my-6">
                                                                Valor: R${' '}
                                                                {moneyMask(
                                                                    value.toString()
                                                                )}
                                                            </h3>
                                                            <div className="grid gap-2">
                                                                <span
                                                                    onClick={() =>
                                                                        copyToClipBoard(
                                                                            `${brCode}`
                                                                        )
                                                                    }
                                                                    className="btn btn-primary btn-block font-bold normal-case"
                                                                >
                                                                    <span className="">
                                                                        Copiar
                                                                        QRCode
                                                                    </span>
                                                                </span>
                                                                <a
                                                                    href={pdf}
                                                                    target="_blank"
                                                                    className="btn btn-primary btn-outline btn-block font-bold normal-case"
                                                                >
                                                                    Baixar PDF
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="divider md:divider-horizontal"></div>
                                                        <div className="flex flex-col w-full justify-center px-8">
                                                            <div className="badge badge-lg badge-warning px-6 py-4">
                                                                Aguardando
                                                                Pagamento
                                                            </div>
                                                            <div className="my-4 flex flex-col">
                                                                <h3 className="font-bold text-3xl my-6">
                                                                    Enviar R${' '}
                                                                    {moneyMask(
                                                                        value.toString()
                                                                    )}{' '}
                                                                    para:
                                                                </h3>
                                                                <div>
                                                                    <span className="font-bold">
                                                                        Nome:
                                                                    </span>{' '}
                                                                    Buyp
                                                                    Programas de
                                                                    Vantagens e
                                                                    Tecnologia
                                                                    Ltda
                                                                </div>
                                                                <div>
                                                                    <span className="font-bold">
                                                                        CNPJ:
                                                                    </span>{' '}
                                                                    45.679.637/0001-94
                                                                </div>
                                                            </div>
                                                            <a
                                                                className="btn btn-primary btn-outline btn-block font-bold normal-case"
                                                                onClick={() =>
                                                                    router.push(
                                                                        '/myshopping'
                                                                    )
                                                                }
                                                            >
                                                                Verificar
                                                                Pagamento
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    </label>
                                </>
                            ) : (
                                ''
                            )}
                        </span>

                        {statuspayment == 'canceled' ?? 'voided' ? (
                            <span className="badge h-auto text-center ml-12">
                                Cobrança cancelada
                            </span>
                        ) : statuspayment == 'processing' ??
                          'waiting_capture' ??
                          'partial_captured' ??
                          'failed' ? (
                            <span className="badge badge-warning h-auto text-center ml-12">
                                Processando pagamento
                            </span>
                        ) : statuspayment == 'registered' ? (
                            <span className="badge badge-warning h-auto text-center ml-12">
                                Registrado
                            </span>
                        ) : statuspayment == 'paid' ??
                          'manual_paid' ??
                          'captured' ? (
                            <span className="badge badge-success h-auto text-center ml-12">
                                Pagamento aprovado
                            </span>
                        ) : statuspayment == 'manual_failed' ? (
                            <span className="badge badge-error h-auto text-center ml-12">
                                Falha ao efetuar pagamento
                            </span>
                        ) : statuspayment == 'not_authorized' ? (
                            <span className="badge badge-error h-auto text-center ml-12">
                                Não autorizada
                            </span>
                        ) : statuspayment == 'with_error' ? (
                            <span className="badge badge-error h-auto text-center ml-12">
                                Com erro
                            </span>
                        ) : statuspayment == 'created' ? (
                            <span className="badge badge-warning h-auto text-center ml-12">
                                Aguardando Pagamento
                            </span>
                        ) : (
                            <span className="badge badge-warning h-auto text-center ml-12">
                                Aguardando Pagamento
                            </span>
                        )}
                    </div>

                    <span className="hidden sm:block text-xs">
                        {date(created)}
                    </span>
                </div>
            </div>
            <div className="collapse-content">
                <div className="py-2"></div>
                <ul className="steps mx-auto w-full">
                    <li className="step">
                        Processando
                        <br />
                        pedido
                    </li>
                    <li className="step">
                        <span className="opacity-50">
                            Produto conferido
                            <br />
                            aguardando coleta
                        </span>
                    </li>
                    <li className="step">
                        <span className="opacity-50">Produto enviado</span>
                    </li>
                </ul>
                <div className="mb-6">
                    <div className="flex justify-center gap-2 my-8">
                        <div className="card p-4 bg-base-200">
                            <div className="flex flex-col sm:flex-row items-center gap-2">
                                <div className="flex flex-col">
                                    <span className="font-bold"></span>
                                    <span className="text-xs font-medium">
                                        R$ {moneyMask(value.toString())}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <div className="md:w-1/3">
                            <h3 className="text-xl mb-2 font-bold text-center">
                                Prazo de entrega
                            </h3>
                            <p className="text-center">
                                de 10 a 15 dias úteis em todos os produtos.
                            </p>
                        </div>
                        <div className="divider md:divider-horizontal">🔥</div>
                        <div className="md:w-1/3">
                            <h3 className="text-xl mb-2 font-bold text-center">
                                Meio de Pagamento
                            </h3>
                            <p className="text-center">{method}</p>
                            <span className="font-bold text-success text-lg mt-2 block text-center">
                                Total: R$ {moneyMask(value.toString())}
                            </span>
                        </div>
                        <div className="divider md:divider-horizontal">🔥</div>
                        <div className="md:w-1/3">
                            <h3 className="text-xl mb-2 font-bold text-center">
                                Endereço de entrega
                            </h3>
                            <span className="font-normal text-base mt-2 block text-center">
                                {`${address}, ${numberAddress} ${district}, ${city} - ${state}`}
                                <br />
                                {zipCode}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ListProducts
