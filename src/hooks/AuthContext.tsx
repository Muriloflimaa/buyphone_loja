import axios from 'axios'
import Router from 'next/router'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useLocalStorage } from '../services/useLocalStorage'
import { parseCookies, setCookie } from 'nookies'

type SignInCredentials = {
    email: string
    password: string
}

type User = {
    email: string
    type: number
    birthdate: Date
    document: number
    name: string
    mobile_phone: string
    profile_pic: string
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
    const [user, setUser] = useState<User>()
    const isAuthenticated = !!user

    useEffect(() => {
        const { '@BuyPhone_Token': token } = parseCookies()

        if (token) {
            axios
                .post('https://loja.buyphone.com.br/api/refresh', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                })
                .then((response) => {
                    // If request is good...
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [])

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const response = await axios.post(
                'https://loja.buyphone.com.br/api/login',
                {
                    email,
                    password,
                }
            )

            const type = response.data.user.type
            const birthdate = response.data.user.birthdate
            const document = response.data.user.document
            const name = response.data.user.name
            const mobile_phone = response.data.user.mobile_phone
            const profile_pic = response.data.user.profile_photo_url

            setUser({
                email,
                type,
                birthdate,
                document,
                name,
                mobile_phone,
                profile_pic,
            })
            const token = response.data.authorization.token

            setCookie(undefined, '@BuyPhone_Token', token, {
                // maxAge: 60 * 60 * 24 * 30, // 30 dias
                path: '/',
            })

            // Router.push('/')
        } catch (error) {
            return console.log('Erro na chamada API', error)
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}
