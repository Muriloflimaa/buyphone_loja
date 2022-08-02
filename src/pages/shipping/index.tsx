import { ChevronRightIcon, MapIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import ShippingCard from '../../components/ShippingCard.tsx/ShippingCard'

export default function Shipping() {
    return (
        <div className="max-w-7xl mx-auto grid gap-3 my-10">
            <ShippingCard />
            <div className="max-w-2xl w-full mx-auto grid gap-3">
                <div className="flex flex-col items-center">
                    <h2 className="text-xl mt-3 text-PrimaryText">
                        Insira o CEP para ver as opções de entrega
                    </h2>
                </div>
                <div>
                    <label className="input-group">
                        <input
                            type="text"
                            placeholder="CEP"
                            className="input input-bordered rounded-md !important w-full text-PrimaryText"
                        />
                    </label>
                </div>

                <div className="flex justify-end text-PrimaryText">
                    <Link href={'/shipping/address'}>
                        <a className="link ">Avançar</a>
                    </Link>
                </div>
                <div className="flex justify-center text-PrimaryText">
                    <p>Ou selecione um endereço abaixo</p>
                </div>

                <button
                    type="submit"
                    className="normal-case btn btn-sm btn-primary text-PrimaryText btn-outline h-full leading-4 max-h-20 py-3 w-full gap-4 justify-between relative"
                >
                    <div className="flex gap-3 items-center">
                        <MapIcon className="w-10 h-7" />
                        <div className="flex flex-col items-start">
                            <strong>
                                Gilberto Trivelato - lado ímpar, 502
                            </strong>
                            <p> Conjunto Habitacional Hilda Mandarino</p>
                            <p>Araçatuba SP</p>
                        </div>
                    </div>
                    <ChevronRightIcon className="w-7 h-7" />
                </button>
            </div>
        </div>
    )
}
