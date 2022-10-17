import Router from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import { createContext, ReactNode, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { ToastCustom } from '../utils/toastCustom'
import { setCookies } from '../utils/useCookies'
import { apiStore } from '../services/api'

type SignInCredentials = {
  email: string
  password: string
}

type UserDataType = {
  type: number
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  signOut: Function
  user: string | undefined | number
  isAuthenticated: boolean
  userData: UserDataType | undefined
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const { '@BuyPhone:User': user } = parseCookies(undefined)

  const [userData, setUserData] = useState<UserDataType | undefined>()

  const isAuthenticated = !!user

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
        destroyCookie({}, '@BuyPhone:Router')
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
    const cookies = parseCookies(undefined)

    if (cookies['@BuyPhone:Token']) {
      const decodedToken = jwt_decode<any>(cookies['@BuyPhone:Token']) //decodifica o token

      //se tiver um token expirado apenas destruir os cookies
      if (Date.now() >= decodedToken.exp * 1000) {
        destroyCookie({}, '@BuyPhone:User')
        destroyCookie({}, '@BuyPhone:Token')
        Router.push('/')
      } else {
        //se tiver um cookies mandar para a rota de logout
        try {
          await apiStore.post('/logout')
          destroyCookie({}, '@BuyPhone:User')
          destroyCookie({}, '@BuyPhone:Token')
          Router.push('/')
        } catch (error) {
          //se der algum erro apenas destruir os cookies
          destroyCookie({}, '@BuyPhone:User')
          destroyCookie({}, '@BuyPhone:Token')
          Router.push('/')
        }
      }
    } else {
      //caso não tiver um cookie destruir cookies, possivelmente nao entrara nesse caso
      destroyCookie({}, '@BuyPhone:User')
      destroyCookie({}, '@BuyPhone:Token')
      Router.push('/')
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, isAuthenticated, user, userData }}
    >
      {children}
    </AuthContext.Provider>
  )
}
