import axios from 'axios'
import Router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { createContext, ReactNode, useState } from 'react'
import toast from 'react-hot-toast'
import { apiLogin } from '../services/apiLogin'
import jwt_decode from 'jwt-decode'

type SignInCredentials = {
    email: string
    password: string
}

type UserDataType = {
    type: number
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>
    signOut: any
    user: any
    isAuthenticated: boolean
    userData: UserDataType | undefined
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export const setCookies = (key: any, value: any) => {
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
            const response = await axios.post(
                'https://loja.buyphone.com.br/api/login',
                {
                    email,
                    password,
                }
            )
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

            window.location.href = '/'
            Router.push('/')
        } catch (error) {
            toast.error('Não foi possível fazer o login')
        }
    }

    async function signOut() {
        const cookies = parseCookies(undefined)

        if (cookies['@BuyPhone:Token']) {
            const decodedToken = jwt_decode<any>(cookies['@BuyPhone:Token']) //decodifica o token
            const timeElapsed = Date.now() // pega a data de agora
            const today = new Date(timeElapsed)
            const d = new Date(0)

            d.setUTCSeconds(decodedToken.exp) // pega a data do token e transforma ela em tempo

            const diff = Math.abs(d.getTime() - today.getTime()) //divide o tempo do token pelo tempo atual
            const days = Math.ceil(diff / (1000 * 60)) //divide o tempo atual e o tempo restante do token em Min - 60 = 1 Hora
 
            // Se existir um Token e ele tiver o tempo menor que 0 minutos ele nao vai chamar a api vai só limpar os tokens
            if (days < 0){
            destroyCookie(undefined, '@BuyPhone:User')
            destroyCookie(undefined, '@BuyPhone:Token')
            Router.push('/')
            }
            // se existir um token maior que os 10 minutos ele vai chamar a api de logout e destruir os tokens
            else {
                try {
                    await apiLogin.post('/logout')
                    destroyCookie(undefined, '@BuyPhone:User')
                    destroyCookie(undefined, '@BuyPhone:Token')
                    Router.push('/')
                } catch (error) {
                    toast.error('Não foi possível deslogar')
                }
            }
        }else{
            toast.error('Você precisa estar logado')
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
