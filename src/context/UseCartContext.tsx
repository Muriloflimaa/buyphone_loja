import Image from 'next/image'
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
import SuccessImg from '../assets/images/success.webp'

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
  const [storagedCart] = useLocalStorage('@BuyPhone:cart', '') //pegando carrinho no storage

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

        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              }  z-50 h-auto items-center rounded-lg pointer-events-auto`}
            >
              <div className="alert bg-green-200 text-green-900 items-start border-l-4 border-green-700 shadow-lg z-50 sm:right-2 w-80">
                <div className="flex gap-3">
                  <Image
                    layout="fixed"
                    width={70}
                    height={60}
                    src={SuccessImg}
                  ></Image>
                  <div>
                    <h3 className="font-bold">Notificação</h3>
                    <div className="text-xs">
                      <span className="text-[8px]">
                        {products?.name +
                          ' ' +
                          products?.color +
                          ' - ' +
                          products?.memory}
                      </span>{' '}
                      adicionado ao carrinho com sucesso!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
          { duration: 2000 }
        )

        const newProduct = {
          id: products.id,
          amount: 1,
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
