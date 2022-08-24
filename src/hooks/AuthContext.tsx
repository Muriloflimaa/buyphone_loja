import axios from 'axios'
import Router from 'next/router'
import { createContext, ReactNode, useState } from 'react'

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

    function HandleSetUsers(data: any) {
        setUser(data)
    }

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

            HandleSetUsers({
                email,
                type,
                birthdate,
                document,
                name,
                mobile_phone,
                profile_pic,
            })
            Router.push('/')
        } catch (error) {
            return console.log('Erro na chamada API')
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    )
}
