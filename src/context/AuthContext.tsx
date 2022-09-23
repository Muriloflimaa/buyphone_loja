import axios from 'axios'
import Router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { createContext, ReactNode, useState } from 'react'
import toast from 'react-hot-toast'
import { apiLogin } from '../services/apiLogin'
import jwt_decode from 'jwt-decode'
import { api } from '../services/apiClient'

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

export const setCookies = (key: string, value: string | number | object) => {
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  setCookie(undefined, key, value, {
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    path: '/',
  })
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { '@BuyPhone:User': user } = parseCookies()

  const [userData, setUserData] = useState<UserDataType | undefined>()

  const isAuthenticated = !!user

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await apiLogin.post('/auth/login', {
        email,
        password,
      })
      const { type, name, id, profile_photo_url } = response.data.user

      const UserObject = {
        name: name,
        id: id,
        type: type,
        profile_photo_url: profile_photo_url,
      }
      const token = response.data.authorization.token

      setUserData(UserObject)

      setCookies('@BuyPhone:User', UserObject) //chama a função setCookies para gravar os dados
      setCookies('@BuyPhone:Token', token)
      const cookies = parseCookies(undefined)

      if (cookies['@BuyPhone:Router']) {
        window.location.href = cookies['@BuyPhone:Router']
        destroyCookie({}, '@BuyPhone:Router')
        return
      }
      window.location.href = '/'
    } catch (error) {
      toast.error('Não foi possível fazer o login')
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
          await apiLogin.post('/auth/logout')
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
