interface PixProps {
    name: string
    street: string
    city: string
    address: string
    email: string
    price: number
}

export default function pix({
    name,
    street,
    city,
    address,
    email,
    price,
}: PixProps) {
    return (
        <>
            <div className="max-w-7xl mx-auto px-4 grid">
                <div className="relative w-full">
                    <h2 className="text-2xl md:text-3xl text-center font-medium my-6">
                        Conferir e Finalizar
                    </h2>
                    <div className="flex flex-col justify-center items-center gap-6 max-w-3xl mx-auto mt-4 mb-12 pt-6 border-t border-base-300">
                        <h3 className="text-2xl font-medium">Aparelho(s)</h3>
                        {/* <ProductCart
                            name="iPhone 12 pro MAX"
                            id="Azul / 256GB"
                            qtdProduct={1}
                            priceProduct={5.2}
                            image={iPhoneProduct}
                            shadow=" "
                        /> */}
                    </div>
                    <div className="flex flex-col justify-center items-center gap-6 max-w-3xl mx-auto mt-4 mb-12 pt-6 border-t border-base-300">
                        <h3 className="text-2xl font-medium">Enviar para</h3>
                        <div className="flex justify-between gap-4 w-full">
                            <div className="flex flex-col">
                                <strong>Endereço:</strong>
                                <span>{address}</span>
                                <span></span>
                                <span>{street}</span>
                                <span></span>
                                <span>{city}</span>
                                <span></span>
                            </div>
                            <div className="flex flex-col">
                                <strong>Comprador:</strong>
                                <span>{name}</span>
                                <span>{email}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-6 max-w-3xl mx-auto mt-4 mb-12 pt-6 border-t border-base-300">
                        <h3 className="text-2xl font-medium">Pagamento</h3>
                        <div className="flex justify-between gap-4 w-full">
                            <div className="flex flex-col">
                                <strong>Opção:</strong>
                                <span>PIX</span>
                            </div>
                            <div className="flex flex-col">
                                <strong>Condição:</strong>
                                <span>1x sem juros</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-6 max-w-3xl mx-auto mt-4 mb-12 py-6 border-y border-base-300">
                        <h3 className="text-2xl font-medium">Total</h3>
                        <div className="flex justify-between gap-4 w-full">
                            <div className="flex flex-col">
                                <strong>Subtotal</strong>
                                <strong>Frete</strong>
                            </div>
                            <div className="flex flex-col">
                                <span>{price}</span>
                                <span>Grátis</span>
                            </div>
                        </div>
                    </div>
                    <div className="fixed bottom-[-10px] right-1 card card-compact bg-white glass bg-opacity-90 w-[98%] md:w-80">
                        <div className="card-body">
                            <div className="flex justify-between gap-4 w-full text-xl">
                                <span>Total</span>
                                <span>{price}</span>
                            </div>
                            <a
                                href="https://loja.buyphone.com.br/payment/pix"
                                className="flex btn btn-success w-full"
                            >
                                Finalizar Compra
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}