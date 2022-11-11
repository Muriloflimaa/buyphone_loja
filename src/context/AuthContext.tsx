import Router from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { apiStore } from '../services/api'
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
  user: string | undefined | number
  isUser: boolean
  userData: IUser | null
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const { '@BuyPhone:User': user } = parseCookies(undefined)
  const [isUser, setIsUser] = useState(false)

  const [userData, setUserData] = useState<IUser | null>(() => {
    // Verificando se existe user nos cookies

    if (user) {
      //Se existir configurar o useData
      return JSON.parse(user)
    }
    return null
  })

  useEffect(() => {
    if (user && JSON.parse(user) !== userData) {
      setCookies('@BuyPhone:User', JSON.stringify(userData), 60 * 60 * 24 * 90)
    }
  }, [userData])

  useEffect(() => {
    if (userData === null) {
      setIsUser(false)
    } else {
      setIsUser(true)
    }
  }, [userData]) //useEffect para previnir erro de renderização

  async function signIn({ email, password }: SignInCredentials) {
    const cookies = parseCookies(undefined)
    const lead = cookies.LEAD ? JSON.parse(cookies.LEAD) : null

    try {
      const response = await apiStore.post('/login', {
        email,
        password,
        lead,
      })
      console.log(response.data)
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

      setUserData(UserObject)

      setCookies('@BuyPhone:User', UserObject, 60 * 60 * 24 * 90) //chama a função setCookies para gravar os dados
      setCookies('@BuyPhone:Token', token, 60 * 60 * 24 * 90)
      const cookies = parseCookies(undefined)

      if (
        cookies['@BuyPhone:Router'] &&
        cookies['@BuyPhone:Router'] !== 'undefined'
      ) {
        window.location.href = cookies['@BuyPhone:Router']
        destroyCookie(undefined, '@BuyPhone:Router')
        return
      }
      window.location.href = '/'
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
    try {
      await apiStore.post('/logout')
      destroyCookie(undefined, '@BuyPhone:User')
      destroyCookie(undefined, '@BuyPhone:Token')
      destroyCookie({}, '@BuyPhone:User')
      destroyCookie({}, '@BuyPhone:Token')
      destroyCookie(null, '@BuyPhone:Token')
      destroyCookie(null, '@BuyPhone:User')
      setUserData(null)
      Router.push('/')
    } catch (error) {
      destroyCookie(undefined, '@BuyPhone:User')
      destroyCookie(undefined, '@BuyPhone:Token')
      destroyCookie({}, '@BuyPhone:User')
      destroyCookie({}, '@BuyPhone:Token')
      destroyCookie(null, '@BuyPhone:Token')
      destroyCookie(null, '@BuyPhone:User')
      setUserData(null)
      Router.push('/')
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, userData, isUser }}>
      {children}
    </AuthContext.Provider>
  )
}
