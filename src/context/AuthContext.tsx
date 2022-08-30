import axios from 'axios'
import Router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { createContext, ReactNode, useState } from 'react'
import toast from 'react-hot-toast'
import { apiLogin } from '../services/apiLogin'

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
                type: 1,
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
        try {
            await apiLogin.post('/logout')
            destroyCookie(undefined, '@BuyPhone:User')
            destroyCookie(undefined, '@BuyPhone:Token')
            window.location.href = '/'
        } catch (error) {
            toast.error('Não foi possível deslogar')
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