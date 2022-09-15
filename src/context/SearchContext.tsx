import { createContext, ReactNode, useState } from 'react'

type AuthContextData = {
  changeState: any
  search: any
}

type AuthProviderProps = {
  children: ReactNode
}

export const SearchContext = createContext({} as AuthContextData)

export function SearchProvider({ children }: AuthProviderProps) {
  const [changeInput, setChangeInput] = useState('')

  function changeState(props: string) {
    setChangeInput(props)
  }

  const searchParam = ['name', 'memory', 'color']

  function search(items: any) {
    return items.filter((item: any) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .replace(/ /g, '')
            .indexOf(changeInput.toLowerCase().replace(/ /g, '')) > -1
        )
      })
    })
  }

  return (
    <SearchContext.Provider value={{ changeState, search }}>
      {children}
    </SearchContext.Provider>
  )
}
