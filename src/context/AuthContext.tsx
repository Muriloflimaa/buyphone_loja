import Router from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { ToastCustom } from '../utils/toastCustom'
import { setCookies } from '../utils/useCookies'
import { apiStore } from '../services/api'

type SignInCredentials = {
  email: string
  password: string
}

type UserDataType = {
  type: number
  name: string
  profile_photo_url: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  signOut: Function
  user: string | undefined | number
  isUser: boolean
  userData: UserDataType
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const { '@BuyPhone:User': user } = parseCookies(undefined)
  const [isUser, setIsUser] = useState(false)

  const [userData, setUserData] = useState<any>(() => {
    // Verificando se existe user nos cookies

    if (user) {
      //Se existir configurar o useData
      return JSON.parse(user)
    }
    return null
  })

  useEffect(() => {
    if (userData === null) {
      setIsUser(false)
    } else {
      setIsUser(true)
    }
  }, [userData]) //useEffect para previnir erro de renderização

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await apiStore.post('/login', {
        email,
        password,
      })
      const { type, name, id, profile_photo_url } = response.data.user

      const UserObject = {
        name: name,
        id: id,
        type: type,
        profile_photo_url: profile_photo_url,
        email: email,
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
          'Notificação'
        )
        return
      }
      ToastCustom(
        3000,
        'Ocorreu um erro para realizar o login, contate o suporte.',
        'error',
        'Notificação'
      )
    }
  }

  async function signOut() {
    try {
      await apiStore.post('/logout')
      destroyCookie(undefined, '@BuyPhone:User')
      destroyCookie(undefined, '@BuyPhone:Token')
      setUserData(null)
      Router.push('/')
    } catch (error) {
      destroyCookie(undefined, '@BuyPhone:User')
      destroyCookie(undefined, '@BuyPhone:Token')
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
