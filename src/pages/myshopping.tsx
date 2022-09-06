import { Divider } from 'react-daisyui'

export default function MyShopping() {
    return (
        <div className="max-w-7xl mx-auto my-8">
            <h1 className="text-2xl md:text-3xl text-center font-medium my-6">
                Minhas Compras
            </h1>
            <div className="collapse collapse-arrow card show border border-gray-100">
                <input type="checkbox" className="peer" />
                <div className="collapse-title border-b flex justify-between items-center">
                    <span className="font-bold text-lg">Pedido #054</span>
                    <span className="badge badge-warning h-auto text-center ml-12">
                        Aguardando pagamento
                    </span>
                    <span className="hidden sm:block text-xs">
                        12/08/2022 às 11:22
                    </span>
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
                                        <span className="text-sm">,</span>
                                        <span className="text-xs font-medium">
                                            R$3.179,76
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
                            <div className="divider md:divider-horizontal">
                                🔥
                            </div>
                            <div className="md:w-1/3">
                                <h3 className="text-xl mb-2 font-bold text-center">
                                    Meio de Pagamento
                                </h3>
                                <p className="text-center">Pix</p>
                                <span className="font-bold text-success text-lg mt-2 block text-center">
                                    Total: R$3.179,76
                                </span>
                            </div>
                            <div className="divider md:divider-horizontal">
                                🔥
                            </div>
                            <div className="md:w-1/3">
                                <h3 className="text-xl mb-2 font-bold text-center">
                                    Endereço de entrega
                                </h3>
                                {/* //endereço aqui */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
