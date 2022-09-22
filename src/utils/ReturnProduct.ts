import { apiPedidos } from '../services/apiClient'

async function ReturnProduct(id: number) {
    try {
        const dat = await apiPedidos.get(`products/${id}`)

        return dat.data.data
    } catch (error) {
        console.log(error)
        return undefined
    }
}

export default ReturnProduct
