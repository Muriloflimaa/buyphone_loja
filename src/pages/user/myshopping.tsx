import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import BelaSad from '../../assets/images/bela_sad.webp'
import ListProducts from '../../components/ListProducts'
import { setupAPIClient } from '../../services/newApi/api'
import { IInvoice } from '../../types'
import { PersistentLogin } from '../../utils/PersistentLogin'
import { ToastCustom } from '../../utils/toastCustom'

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

export default function MyShopping({ data }: { data: DataProps }) {
  const [dataOrders, setDataOrders] = useState<DataProps>(data)

  async function handleChangePagination(page: string) {
    try {
      const { data } = await axios.get(page)

      setDataOrders(data)
    } catch (error) {
      ToastCustom(
        2000,
        'Não foi possível chamar a próxima página, tente mais tarde.',
        'error'
      )
    }
  }

  return (
    <div className="max-w-5xl mx-auto my-10">
      <h1 className="text-2xl md:text-3xl text-center font-medium my-6">
        Minhas Compras
      </h1>
      <div className="grid border rounded-md border-b-0">
        {dataOrders && dataOrders?.data.length >= 0 ? (
          dataOrders?.data.map((pedido) => {
            return (
              <React.Fragment key={pedido.id}>
                <ListProducts
                  created={pedido.created_at}
                  statuspayment={pedido.invoice?.status.toLowerCase()}
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
        ) : (
          <div className="flex flex-col text-center md:text-left md:flex-row justify-center items-center gap-8 h-[500px]">
            <Image
              src={BelaSad}
              layout="fixed"
              width={220}
              height={250}
              quality={100}
              alt="Imagem personagem Belatriz"
            />
            <div>
              <h3 className="font-bold text-2xl">Sorria para a foto!</h3>
              <p className="opacity-50">Seu carrinho está vazio</p>
              <Link href={'/'}>
                <a className="btn btn-primary mt-6">Comprar agora</a>
              </Link>
            </div>
          </div>
        )}
        <div className="btn-group mx-auto md:mx-0 border border-t-0 border-x-0 border-gray-300 rounded-b-md">
          {dataOrders?.links.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                handleChangePagination(link.url)
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
  const api = setupAPIClient(ctx)
  try {
    const { data: user } = await api.get('/store/me')
    if (user) {
      const { data } = await api.get(`/store/orders/user/${user?.id}`)
      return {
        props: {
          data: data,
        },
      }
    }
  } catch (error) {
    return {
      props: {
        data: null,
      },
    }
  }
  return {
    props: {},
  }
}, '/user/myshopping')
