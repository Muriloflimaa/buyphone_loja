import { parseCookies } from 'nookies'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { apiStore } from '../services/api'
import { ArrayProduct, Product } from '../types'
import { ToastCustom } from '../utils/toastCustom'
import { setCookies } from '../utils/useCookies'
import { useLocalStorage } from '../utils/useLocalStorage'
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
  discountValue: number
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [storagedCart] = useLocalStorage('@BuyPhone:cart', '') //pegando carrinho no storage
  const [somaTotal, setSomaTotal] = useState(0) //soma do total para aparecer no card carrinho
  const [data, setData] = useState<ArrayProduct[]>([]) //state que recebe os produtos chamados da api
  const [values, setValues] = useState<ArrayProduct[]>([]) //recebe o values do useEffect sem o item duplicado
  const { '@BuyPhone:User': user } = parseCookies(undefined) //pega dados do usuário logado
  const [isUser, setIsUser] = useState(false) //state para previnir erro de renderização no usuario logado
  const { userData } = useContext(AuthContext)
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
    cart.map(async (item) => {
      try {
        const { data } = await apiStore.get(`products/${item.id}`) //chamando o produto pelo id

        const discount =
          process.env.NEXT_PUBLIC_BLACK_FRIDAY &&
          !!JSON.parse(process.env.NEXT_PUBLIC_BLACK_FRIDAY)
            ? 12.5
            : !!isUser && user && JSON.parse(user)?.type === 1
            ? 12.5
            : 7
        const itens = [
          data.price,
          data.magalu_price,
          data.americanas_price,
          data.casasbahia_price,
          data.ponto_price,
        ]
        const filteredItens = itens.filter((item) => item)
        const averagePrice =
          filteredItens.length > 0 ? Math.min(...filteredItens) : 0
        const discountPrice = Math.round(averagePrice * (discount / 100))
        const ourPrice = averagePrice - discountPrice //realiza a verificacao de preco, nao foi possivel usar a existente

        const response = {
          ...item, //adicionando amount e id que está no localstorage
          product: data, //data vem da api que é chamada
          priceFormated: ourPrice, //formatação de preços
          subTotal: ourPrice * item.amount, //total simples
        }

        setData((data) => [...data, response]) //gravando response no state
      } catch (error) {
        CleanCart()
      }
    })
  }, [cart])

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
    userData?.promotion
      ? setSomaTotal(soma - discountValue)
      : setSomaTotal(soma) //somando produtos e setando no state
  }, [data]) //effect para somar todos os produtos do carrinho - total / remover duplicados

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
          const addProduct = await apiStore.get(`products/${productId}`)
          const products = addProduct.data
          ToastCustom(
            300,
            `${products?.name} ${
              products?.color
            } - ${products?.memory.toUpperCase()} adicionado ao carrinho!`,
            'success',
            'Notificação'
          )
        } else {
          //Se não, obtem o produto da api e add ao carrinho com o valor de 1
          const addProduct = await apiStore.get(`products/${productId}`)
          const products = addProduct.data

          ToastCustom(
            300,
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
          3000,
          `${name} ${color} - ${memory.toUpperCase()} removido do carrinho!`,
          'error',
          'Que pena...'
        )
      } else {
        throw Error()
      }
    } catch {
      ToastCustom(2000, 'Erro na remoção do produto', 'error', 'Notificação')
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
