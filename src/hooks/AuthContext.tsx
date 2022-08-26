import axios from 'axios'
import Router from 'next/router'
import { createContext, ReactNode } from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import toast from 'react-hot-toast'
import { apiLogin } from '../services/apiLogin'

type SignInCredentials = {
    email: string
    password: string
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>
    signOut: any
    user: any
    isAuthenticated: boolean
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

            setCookies('@BuyPhone:User', UserObject) //chama a função setCookies para gravar os dados
            setCookies('@BuyPhone:Token', token)

            Router.push('/')
        } catch (error) {
            toast.error('Não foi possível fazer o login')
        }
    }

    async function signOut() {
        try {
            await apiLogin('/logout')
            destroyCookie(undefined, '@BuyPhone:User')
            destroyCookie(undefined, '@BuyPhone:Token')
            Router.push('/')
            toast.success('usuario deslogado')
        } catch (error) {
            toast.error('Não foi possível fazer deslogar')
        }
    }

    return (
        <AuthContext.Provider
            value={{ signIn, signOut, isAuthenticated, user }}
        >
            {children}
        </AuthContext.Provider>
    )
}
