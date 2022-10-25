import Link from 'next/link'
import { parseCookies } from 'nookies'
import React, { useEffect, useState } from 'react'
import ListProducts from '../components/ListProducts'
import { apiStore } from '../services/api'
import { IInvoice } from '../types'
import { PersistentLogin } from '../utils/PersistentLogin'

interface DataProps {
  current_page: number
  data: Array<PedidosProps>
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Array<{
    active: boolean
    label: string
    url: string
  }>
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: null | number
  to: number
  total: number
}

interface PedidosProps {
  address: {
    address: string
    city: string
    complement: string | null
    created_at: string
    id: number
    neighborhood: string
    number: number
    postal_code: string | null
    uf: string
    updated_at: string
    user_id: number
  }
  address_id: number
  created_at: string
  id: number
  invoice: IInvoice
  invoice_id: number
  method: string
  total: number
  updated_at: string
  user_id: number
  utm_campaign: null
  utm_medium: null
  utm_source: null
}

function MyShopping() {
  const [data, setData] = useState<DataProps>()
  const cookies = parseCookies(undefined)

  async function GetInvoice() {
    if (cookies['@BuyPhone:User']) {
      const user = JSON.parse(cookies['@BuyPhone:User'])
      const { data } = await apiStore(`orders/user/${user?.id}`)
      console.log(data)
      setData(data)
    }
  }

  useEffect(() => {
    GetInvoice()
  }, [])

  async function handleChangePagination(page: string) {
    try {
      const user = JSON.parse(cookies['@BuyPhone:User'])
      const { data } = await apiStore(
        `orders/user/${user?.id}?page=${page
          .replace(
            `https://beta-api.buyphone.com.br/store/orders/user/${user.id}?page=`,
            ''
          )
          .replace(
            `https://api.buyphone.com.br/store/orders/user/${user.id}?page=`,
            ''
          )}`
      )
      setData(data)
    } catch (error) {}
  }

  return (
    <div className="max-w-5xl mx-auto my-8">
      <h1 className="text-2xl md:text-3xl text-center font-medium my-6">
        Minhas Compras
      </h1>
      <div className="grid border rounded-md border-b-0">
        {data && data?.data.length >= 0 ? (
          data?.data.map((pedido) => {
            return (
              <React.Fragment key={pedido.id}>
                <ListProducts
                  created={pedido.created_at}
                  statuspayment={pedido.invoice?.status}
                  number={pedido.id}
                  value={pedido.total}
                  method={pedido.method}
                  address={pedido.address?.address}
                  city={pedido.address?.city}
                  numberAddress={pedido.address?.number}
                  district={pedido.address?.neighborhood}
                  state={pedido.address?.uf}
                  zipCode={pedido.address?.postal_code}
                  linkPayment={pedido.invoice?.link}
                  CodImgPix={pedido.invoice?.invoice_id}
                  brCode={pedido.invoice?.brcode}
                  pdf={pedido.invoice?.pdf}
                  expired={pedido.invoice?.status}
                />
              </React.Fragment>
            )
          })
        ) : data && data.data.length <= 0 ? (
          <div className="flex flex-col text-center md:text-left md:flex-row justify-center items-center gap-8 h-[500px]">
            <img
              src="https://loja.buyphone.com.br/img/empty.webp"
              className="max-h-72"
              alt="carrinho vazio"
            />
            <div className="">
              <h3 className="font-bold text-2xl">Sorria para a foto!</h3>
              <p className="opacity-50">Seu carrinho está vazio</p>
              <Link href={'/'}>
                <a className="btn btn-primary mt-6">Comprar agora</a>
              </Link>
            </div>
          </div>
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
        <div className="btn-group mx-auto md:mx-0 border border-t-0 border-x-0 border-gray-300 rounded-b-md">
          {data?.links.map((link) => (
            <button
              onClick={() => {
                handleChangePagination(
                  link.label
                    .replace('&laquo; Previous', link.url)
                    .replace('Next &raquo;', link.url)
                )
                window.scrollTo(0, 0)
              }}
              className={`btn btn-xs font-thin normal-case md:btn-sm btn-ghost ${
                link.active === true ? 'btn-disabled' : ''
              }`}
            >
              {link.label
                .replace('&laquo; Previous', 'Anterior')
                .replace('Next &raquo;', 'Próximo')}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = PersistentLogin(async (ctx) => {
  return {
    props: {},
  }
}, '/myshopping')

export default MyShopping
