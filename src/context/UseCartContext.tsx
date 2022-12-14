import axios from 'axios'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ArrayProduct, Product } from '../types'
import { ToastCustom } from '../utils/toastCustom'
import { setCookies } from '../utils/useCookies'
import { useLocalStorage } from '../utils/useLocalStorage'
import { verificationPrice } from '../utils/verificationPrice'
import { AuthContext } from './AuthContext'

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
  removeProduct: (
    productId: number,
    name: string,
    color: string,
    memory: string
  ) => void
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void
  CleanCart: () => void
  values: ArrayProduct[]
  somaTotal: number
  somaTotalInteger: number
  discountValue: number
  isAttCart: boolean
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const storagedCart = useLocalStorage('@BuyPhone:cart') //pegando carrinho no storage
  const [somaTotal, setSomaTotal] = useState(0) //soma do total para aparecer no card carrinho com disconto
  const [somaTotalInteger, setSomaTotalInteger] = useState(0) //soma do total para aparecer no card carrinho sem disconto
  const [data, setData] = useState<ArrayProduct[]>([]) //state que recebe os produtos chamados da api
  const [values, setValues] = useState<ArrayProduct[]>([]) //recebe o values do useEffect sem o item duplicado
  const [isUser, setIsUser] = useState(false) //state para previnir erro de renderização no usuario logado
  const [isAttCart, setIsAttCart] = useState(false) //state para mostrar que esta buscando produtos na api
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const discountValue = 15000

  const [cart, setCart] = useState<Product[]>(() => {
    // Verificando se existe no localstorage o carrinho

    if (storagedCart) {
      //Se existir configurar o setCart
      return storagedCart
    }
    return []
  })

  useEffect(() => {
    if (user) {
      setIsUser(true)
    }
  }, [user])

  useEffect(() => {
    setData([]) //zera o array do data
    setIsAttCart(true)
    cart.map(async (item) => {
      try {
        const { data } = await axios.get(`/api/api/store/products/${item.id}`) //chamando o produto pelo id

        const returnPrice = verificationPrice(data, user, isUser)

        if (returnPrice.ourPrice <= 0) {
          CleanCart()
          window.location.href = '/'
          return
        }

        const response = {
          ...item, //adicionando amount e id que está no localstorage
          product: data, //data vem da api que é chamada
          priceFormated: returnPrice.ourPrice, //formatação de preços
          subTotal: returnPrice.ourPrice * item.amount, //total simples
        }

        setData((data) => [...data, response]) //gravando response no state
        setIsAttCart(false)
      } catch (error) {
        CleanCart()
      }
    })
  }, [cart, user])

  useEffect(() => {
    const values = data.filter(function (this: any, a: any) {
      return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true)
    }, Object.create(null)) //removendo items duplicados do array, o data manda o primeiro produto adicionado 2x
    setValues(values) //setando values para dar o map no productCart

    const total = values.map((product: ArrayProduct) => {
      return product.subTotal
    }, 0) //da um map nos produtos e adiciona a const total

    var soma = 0
    for (var i = 0; i < total.length; i++) {
      soma += total[i]
    }
    setSomaTotalInteger(soma)
    user?.promotion ? setSomaTotal(soma - discountValue) : setSomaTotal(soma) //somando produtos e setando no state
  }, [data]) //effect para somar todos os produtos do carrinho - total / remover duplicados

  function CleanCart() {
    setCart([])
    setData([])
    localStorage.removeItem('@BuyPhone:cart')
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
      setCookies('@BuyPhone:cart', JSON.stringify(cart), 100000000)
    }
  }, [cart, cartPreviousValue])
  /**
   *
   * Add Produto (Função)
   *
   *
   */
  const addProduct = async (productId: number) => {
    if (cart.length <= 6) {
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
          const addProduct = await axios.get(
            `/api/api/store/products/${productId}`
          )
          const products = addProduct.data
          ToastCustom(
            300,
            `${products?.name} ${
              products?.color
            } - ${products?.memory.toUpperCase()} adicionado ao carrinho!`,
            'success',
            'Sucesso'
          )
        } else {
          //Se não, obtem o produto da api e add ao carrinho com o valor de 1
          const addProduct = await axios.get(
            `/api/api/store/products/${productId}`
          )
          const products = addProduct.data

          ToastCustom(
            300,
            `${products?.name} ${
              products?.color
            } - ${products?.memory.toUpperCase()} adicionado ao carrinho!`,
            'success',
            'Sucesso'
          )

          if (cart.length == 0) {
            const newProduct = {
              id: products.id,
              amount: 1,
            }
            updatedCart.push(newProduct)
            router.push('/cart')
          } else {
            const newProduct = {
              id: products.id,
              amount: 1,
            }
            updatedCart.push(newProduct)
          }
        }
        //Atualizando o Carrinho

        setCart(updatedCart)
      } catch {
        ToastCustom(2000, 'Erro na adição do produto', 'error', 'Que pena...')
        localStorage.removeItem('@BuyPhone:cart')
        CleanCart()
      }
    } else {
      ToastCustom(
        3000,
        'Não adicione tantos produtos ao mesmo tempo',
        'error',
        'Que pena...'
      )
    }
  }
  /**
   *
   * Remover Produto (Função)
   *
   *
   */
  const removeProduct = (
    productId: number,
    name: string,
    color: string,
    memory: string
  ) => {
    try {
      const updatedCart = [...cart]
      const productIndex = updatedCart.findIndex(
        (product) => product.id === productId
      )
      if (productIndex >= 0) {
        updatedCart.splice(productIndex, 1)
        setCart(updatedCart)
        ToastCustom(
          300,
          `${name} ${color} - ${memory.toUpperCase()} removido do carrinho!`,
          'error',
          'Que pena...'
        )
      } else {
        throw Error()
      }
    } catch {
      ToastCustom(2000, 'Erro na remoção do produto', 'error', 'Que pena...')
      CleanCart()
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
        3000,
        'Erro na alteração de quantidade do produto',
        'error',
        'Que pena...'
      )
      CleanCart()
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
        values,
        somaTotal,
        discountValue,
        isAttCart,
        somaTotalInteger,
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
