import { ReactNode, useState } from 'react'
import { createContext } from 'vm'
import { apiPedidos } from '../services/apiClient'

type SearchContextProps = {
    Api: any
}

type SearchContextProps2 = {
    children: ReactNode
}

export const SearchContext = createContext({} as SearchContextProps)

export function AuthProvider({ children }: SearchContextProps2) {
    const [items, setItems] = useState([])
    const [inputSearch, setInputSearch] = useState('')
    const [searchParam] = useState(['name'])

    async function Api() {
        try {
            const { data } = await apiPedidos.get(`categories/`)

            setItems(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    Api()

    return (
        <SearchContext.Provider value={{ items }}>
            {children}
        </SearchContext.Provider>
    )
}
