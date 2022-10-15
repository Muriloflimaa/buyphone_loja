import { createContext, ReactNode, useState } from 'react'
import { IProduct } from '../types'

type SearchContextData = {
  changeState: Function
  search: Function
}

type SearchProviderProps = {
  children: ReactNode
}

export const SearchContext = createContext({} as SearchContextData)

export function SearchProvider({ children }: SearchProviderProps) {
  const [changeInput, setChangeInput] = useState('')

  function changeState(props: string) {
    setChangeInput(props)
  }

  const searchParam = ['name', 'memory', 'color']

  function search(items: Array<{}>) {
    return items.filter((item: IProduct | any) => {
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
