import { parseCookies, setCookie } from 'nookies'
import React, { useEffect, useState } from 'react'
import ListProducts from '../components/ListProducts'
import { PersistentLogin } from '../utils/PersistentLogin'
import { api } from '../services/apiClient'

function MyShopping() {
  const [data, setData] = useState<Array<{}> | undefined>()

  useEffect(() => {
    async function Teste() {
      const cookies = parseCookies(undefined)
      if (cookies['@BuyPhone:User']) {
        const USER = JSON.parse(cookies['@BuyPhone:User'])
        const { data } = await api(`orders/customer/${USER?.id}`)
        setData(data)
      }
    }
    Teste()
  }, [])

  return (
    <div className="max-w-7xl mx-auto my-8">
      <h1 className="text-2xl md:text-3xl text-center font-medium my-6">
        Minhas Compras
      </h1>

      {data && data.length > 0 ? (
        data.map((pedido: any) => (
          <React.Fragment key={pedido.id}>
            <ListProducts
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
              expired={pedido.invoice.status}
            />
          </React.Fragment>
        ))
      ) : (
        <div className="flex gap-3">
          <svg
            className="animate-spin h-5 w-5 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <h1>Carregando...</h1>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = PersistentLogin(async (ctx) => {
  const cookies = parseCookies(ctx)

  if (!cookies['@BuyPhone:Token']) {
    setCookie(ctx, '@BuyPhone:Router', '/myshopping', {
      maxAge: 60 * 60 * 24, // 24h
      path: '/',
    })
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
})

export default MyShopping
