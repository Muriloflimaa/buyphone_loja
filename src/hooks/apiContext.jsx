// import { apiPedidos } from '../services/apiClient'
// import { createContext } from 'react'

// export const ContextApi = createContext({})

// export const ContextProvider = ({ children }) => {
//     const hello = 'sasa'
//     return <ContextApi.Provider value={hello}>{children}</ContextApi.Provider>
// }

// export const getStaticProps = async () => {
//     const getVisitorData = async () => {
//         try {
//             const { dataa } = await apiPedidos.get(`categories/`)
//             return {
//                 props: {
//                     dataa,
//                 },
//                 revalidate: 60 * 60 * 6,
//             }
//         } catch (error) {
//             return {
//                 props: {
//                     dataa: null,
//                 },
//             }
//         }
//     }
//     return getVisitorData()
// }
