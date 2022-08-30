import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { IUser } from '../types'

export const GetUseType = () => {
    const [userJson, setUserJson] = useState<IUser | undefined>()
    const { '@BuyPhone:User': user } = parseCookies()

    useEffect(() => {
        if (!user) {
            return
        }
        setUserJson(JSON.parse(user))
    })
    return userJson
}
