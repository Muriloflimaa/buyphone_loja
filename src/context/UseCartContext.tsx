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
import { ToastCustom } from '../utils/toastCustom'

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
  CleanCart: () => void
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

  function CleanCart() {
    setCart([])
  } //função para limpar o state do carrinho

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

        ToastCustom(
          2000,
          `${products?.name} ${
            products?.color
          } - ${products?.memory.toUpperCase()} adicionado ao carrinho!`,
          'success',
          'Notificação'
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
      ToastCustom(2000, 'Erro na adição do produto', 'error', 'Notificação')
      localStorage.removeItem('@BuyPhone:cart')
      setCart([]) // se der algum erro a aplicação irá limpar o storage e atualizar o carrinho
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
      ToastCustom(2000, 'Erro na remoção do produto', 'error', 'Notificação')
      localStorage.removeItem('@BuyPhone:cart')
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
      ToastCustom(
        2000,
        'Erro na alteração de quantidade do produto',
        'error',
        'Notificação'
      )
      localStorage.removeItem('@BuyPhone:cart')
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        updateProductAmount,
        CleanCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextData {
  const context = useContext(CartContext)

  return context
}
