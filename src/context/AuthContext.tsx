import axios from 'axios'
import Router from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { IUser } from '../types'
import { ToastCustom } from '../utils/toastCustom'
import { setCookies } from '../utils/useCookies'

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  signOut: Function
  user: IUser | null
  isUser: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const { '@BuyPhone:Token': token } = parseCookies()
  const [isUser, setIsUser] = useState(false)

  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    if (token) {
      axios
        .get('/api/api/store/me')
        .then((response) => {
          setUser(response.data)
        })
        .catch(() => {
          destroyCookie(null, '@BuyPhone:Token')
          Router.push('/account/login')
        })
    }
  }, []) //effect para buscar usuário pelo token

  useEffect(() => {
    if (user === null) {
      setIsUser(false)
    } else {
      setIsUser(true)
    }
  }, [user]) //useEffect para previnir erro de renderização

  async function signIn({ email, password }: SignInCredentials) {
    const cookies = parseCookies(undefined)
    const lead = cookies.LEAD ? JSON.parse(cookies.LEAD) : null

    try {
      const response = await axios.post('/api/api/store/login', {
        email,
        password,
        lead,
      })

      const { type, name, id, profile_photo_url, promotion } =
        response.data.user

      const UserObject = {
        name: name,
        id: id,
        type: type,
        profile_photo_url: profile_photo_url,
        email: email,
        lead: lead,
        promotion: promotion,
      }

      const token = response.data.authorization.token

      setUser(UserObject)
      setCookies('@BuyPhone:Token', token, 60 * 60 * 24 * 30)

      if (
        cookies['@BuyPhone:Router'] &&
        cookies['@BuyPhone:Router'] !== 'undefined'
      ) {
        Router.push(cookies['@BuyPhone:Router'])
        destroyCookie(undefined, '@BuyPhone:Router')
        destroyCookie(null, '@BuyPhone:Router')
        destroyCookie({}, '@BuyPhone:Router')
        return
      }
      Router.push('/')
    } catch (error: any) {
      if (error.response.data.message === 'Unauthorized.') {
        ToastCustom(
          3000,
          'Senha ou email incorreto(s). Tente novamente.',
          'error',
          'Que pena...'
        )
        return
      }
      if (error.response.data.message === 'The selected email is invalid.') {
        ToastCustom(
          3000,
          'E-mail inválido ou inexistente.',
          'error',
          'Que pena...'
        )
        return
      }
      ToastCustom(
        3000,
        'Ocorreu um erro para realizar o login, contate o suporte.',
        'error',
        'Que pena...'
      )
    }
  }

  async function signOut() {
    destroyCookie(undefined, '@BuyPhone:Token')
    destroyCookie(null, '@BuyPhone:Token')
    destroyCookie({}, '@BuyPhone:Token')
    setUser(null)
    Router.push('/')
  } //função para realizar o logout

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isUser }}>
      {children}
    </AuthContext.Provider>
  )
}
