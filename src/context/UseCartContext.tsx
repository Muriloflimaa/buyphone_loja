import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { toast } from 'react-hot-toast'
import { apiPedidos } from '../services/apiClient'
import { Product } from '../types'
import { useLocalStorage } from '../utils/useLocalStorage'

interface CartProviderProps {
    children: ReactNode
}

interface UpdateProductAmount {
    productId: number
    amount: number
}

interface CartContextData {
    cart: Product[]
    addProduct: (productId: number) => Promise<void>
    removeProduct: (productId: number) => void
    updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
    const [storagedCart] = useLocalStorage('@BuyPhone:cart', '')

    const [cart, setCart] = useState<Product[]>(() => {
        // Verificando se existe no localstorage o carrinho

        if (storagedCart) {
            //Se existir configurar o setCart
            return storagedCart
        }
        return []
    })

    /**
     *
     * Verificando alteração do carrinho
     * e atualizando o localstorage
     *
     *
     */
    const prevCartRef = useRef<Product[]>()
    useEffect(() => {
        prevCartRef.current = cart
    })
    const cartPreviousValue = prevCartRef.current ?? cart
    useEffect(() => {
        if (cartPreviousValue !== cart) {
            localStorage.setItem('@BuyPhone:cart', JSON.stringify(cart))
        }
    }, [cart, cartPreviousValue])
    /**
     *
     * Add Produto (Função)
     *
     *
     */
    const addProduct = async (productId: number) => {
        try {
            //Criando um novo array para manipular o cart
            const updatedCart = [...cart]
            // Verificando se ja existe o produto no carrinho
            const productExists = updatedCart.find(
                (product) => product.id === productId
            )

            // Verificando a quantidade inserida no carrinho
            const currentAmount = productExists ? productExists.amount : 0
            // Adicionando mais um item
            const newAmount = currentAmount + 1

            //verificando se o produto existe no carrinho
            if (productExists) {
                // se sim incrementa a quantidade
                productExists.amount = newAmount
            } else {
                //Se não, obtem o produto da api e add ao carrinho com o valor de 1
                const addProduct = await apiPedidos.get(`products/${productId}`)
                const products = addProduct.data.data

                //abaixo precisa typar o produto
                const newProduct = {
                    id: products.id,
                    amount: 1,
                    title: products.name,
                    color: products.color,
                    price: products.price,
                    image: products.media[0].original_url,
                    memory: products.memory,
                }
                updatedCart.push(newProduct)
            }
            //Atualizando o Carrinho
            setCart(updatedCart)
        } catch {
            //Caso dê algum erro exibir uma notificação
            toast.error('Erro na adição do produto')
        }
    }
    /**
     *
     * Remover Produto (Função)
     *
     *
     */
    const removeProduct = (productId: number) => {
        try {
            const updatedCart = [...cart]
            const productIndex = updatedCart.findIndex(
                (product) => product.id === productId
            )
            if (productIndex >= 0) {
                updatedCart.splice(productIndex, 1)
                setCart(updatedCart)
            } else {
                throw Error()
            }
        } catch {
            toast.error('Erro na remoção do produto')
        }
    }
    /**
     *
     * Atualizar Quantidade (Função)
     *
     *
     */
    const updateProductAmount = async ({
        productId,
        amount,
    }: UpdateProductAmount) => {
        try {
            //Se a quantidade recebida for 0 ou menos finaliza direto
            if (amount <= 0) {
                return
            }

            const updatedCart = [...cart]
            const productExists = updatedCart.find(
                (product) => product.id === productId
            )
            if (productExists) {
                productExists.amount = amount
                setCart(updatedCart)
                return
            } else {
                throw Error()
            }
        } catch {
            toast.error('Erro na alteração de quantidade do produto')
        }
    }

    return (
        <CartContext.Provider
            value={{ cart, addProduct, removeProduct, updateProductAmount }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart(): CartContextData {
    const context = useContext(CartContext)

    return context
}
