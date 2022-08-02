import ProductCart from '../../components/ProductCart/ProductCart'
import ShippingCard from '../../components/ShippingCard.tsx/ShippingCard'
import iPhoneProduct from '../../assets/images/product.svg'
export default function adress() {
    return (
        <div className="max-w-7xl mx-auto grid gap-3 my-10">
            <ShippingCard />
            <p>Preencha os campos abaixo</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                    <div>
                        <label className="text-xs ml-2">Endereço</label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="CEP"
                                className="input input-bordered rounded-md !important w-full text-PrimaryText"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="text-xs ml-2">Endereço</label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="CEP"
                                className="input input-bordered rounded-md !important w-full text-PrimaryText"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="text-xs ml-2">Endereço</label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="CEP"
                                className="input input-bordered rounded-md !important w-full text-PrimaryText"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="text-xs ml-2">Endereço</label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="CEP"
                                className="input input-bordered rounded-md !important w-full text-PrimaryText"
                            />
                        </label>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="btn btn-info font-medium"
                        >
                            Avançar
                        </button>
                    </div>
                </div>
                <div>
                    <ProductCart
                        name="iPhone 12 pro MAX"
                        id="Azul / 256GB"
                        qtd={1}
                        price={5.2}
                        image={iPhoneProduct}
                        shadow="shadow-md"
                    />
                </div>
            </div>
        </div>
    )
}
