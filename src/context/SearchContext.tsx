import { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'react'

type SearchContextProps = {
    search: any
    setInput: any
}

type SearchContextProps2 = {
    children: ReactNode
}

export const SearchContext = createContext({} as SearchContextProps)

export function SearchProvider({ children }: SearchContextProps2) {
    const [input, setInput] = useState('')
    const searchParam = ['name', 'memory', 'color']

    function search(items: any) {
        return items.filter((item: any) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) > -1
                )
            })
        })
    }

    return (
        <SearchContext.Provider value={{ search, setInput }}>
            {children}
        </SearchContext.Provider>
    )
}
