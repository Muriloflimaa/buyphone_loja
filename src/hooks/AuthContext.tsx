import axios from 'axios'
import Router from 'next/router'
import { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import { parseCookies, setCookie } from 'nookies'
import { apiLogin } from '../services/apiLogin'
import jwt_decode from 'jwt-decode'
import toast from 'react-hot-toast'
import { set, useLocalStorage } from '../services/UseLocalAuth'

type SignInCredentials = {
    email: string
    password: string
}

type User = {
    type: number
    id: number
    nome: string
    photo: string
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>
    user: User
    isAuthenticated: boolean
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user] = useLocalStorage('@BuyPhone:User', '')
    const [onTrue, setOnTrue] = useState(false)
    const isAuthenticated = onTrue

    setTimeout(() => {
        if (user) {
            setOnTrue(true)
        } else {
            return false
        }
    }, 1000)

    async function signIn({ email, password }: SignInCredentials) {
        //acima faz verificação se existe um token e se ele é válido se não for chama abaixo
        try {
            const response = await axios.post(
                'https://loja.buyphone.com.br/api/login',
                {
                    email,
                    password,
                }
            )
            const { type, name, id, profile_photo_url } = response.data.user

            const User = {
                nome: name,
                ident: id,
                tipo: type,
                photo: profile_photo_url,
            }

            set('@BuyPhone:User', User)

            const token = response.data.authorization.token

            setCookie(undefined, '@BuyPhone_Token', token, {
                maxAge: 60 * 60 * 24 * 30, // 30 dias
                path: '/',
            })

            Router.push('/')
        } catch (error) {
            toast.error('Não foi possível fazer o login')
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}
