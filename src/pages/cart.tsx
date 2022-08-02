import ProductCart from '../components/ProductCart/ProductCart'
import iPhoneProduct from '../assets/images/product.svg'

export default function Cart() {
    return (
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
                    qtd={1}
                    price={5.2}
                    image={iPhoneProduct}
                    shadow="shadow-md"
                />
                <ProductCart
                    name="iPhone 12 pro MAX"
                    id="Azul / 256GB"
                    qtd={1}
                    price={5.2}
                    image={iPhoneProduct}
                    shadow="shadow-md"
                />
                <ProductCart
                    name="iPhone 12 pro MAX"
                    id="Azul / 256GB"
                    qtd={1}
                    price={5.2}
                    image={iPhoneProduct}
                    shadow="shadow-md"
                />
                <ProductCart
                    name="iPhone 12 pro MAX"
                    id="Azul / 256GB"
                    qtd={1}
                    price={5.2}
                    image={iPhoneProduct}
                    shadow="shadow-md"
                />
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
    )
}
