import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { apiLojaBeta } from '../services/apiBetaConfigs'
import { GetUseType } from '../utils/getUserType'
import ListProducts from '../components/ListProducts'

function MyShopping() {
    const userData = GetUseType()
    const [data, setData] = useState<any>()

    useEffect(() => {
        async function Teste() {
            const cookies = parseCookies(undefined)
            const USER = JSON.parse(cookies['@BuyPhone:User'])
            const data = await apiLojaBeta(`orders/customer/${USER?.id}`)
            setData(data)
        }
        console.log(data)
        Teste()
    }, [])

    return (
        <div className="max-w-7xl mx-auto my-8">
            <h1 className="text-2xl md:text-3xl text-center font-medium my-6">
                Minhas Compras
            </h1>

            {data?.data.length > 0 ? (
                data?.data.map((pedido: any) => {
                    return (
                        <ListProducts
                            key={pedido.id}
                            created={pedido.created_at}
                            statuspayment={pedido.invoice.status}
                            number={pedido.id}
                            value={pedido.total}
                            method={pedido.method}
                            address={pedido.address.address}
                            city={pedido.address.city}
                            numberAddress={pedido.address.number}
                            district={pedido.address.neighborhood}
                            state={pedido.address.uf}
                            zipCode={pedido.address.postal_code}
                            linkPayment={pedido.invoice.link}
                            CodImgPix={pedido.invoice.invoice_id}
                            brCode={pedido.invoice.brcode}
                            pdf={pedido.invoice.pdf}
                        />
                    )
                })
            ) : (
                <span className="flex justify-center">Nenhuma compra.</span>
            )}
        </div>
    )
}

export default MyShopping
