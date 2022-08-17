import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { apiPedidos } from '../services/apiClient'

const CategoryContext = createContext()

export function CategoryContextProvider({ children }) {
    const chamaApi = async () => {
        const { data } = await apiPedidos.get(`categories/`)

        return data
    }
    const [Data, setData] = useState()

    useEffect(() => {
        setData(chamaApi)
    }, [])

    return (
        <CategoryContext.Provider value={{ Data }}>
            {children}
        </CategoryContext.Provider>
    )
}

export function useCategory() {
    const context = useContext(CategoryContext)

    return context
}
