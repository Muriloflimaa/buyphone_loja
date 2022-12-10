import Image from 'next/image'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import Logo from '../../assets/images/LogoPurple.webp'
import { apiStore } from '../../services/api'
import { IInvoice } from '../../types'
import { cpfMask, maskCep, maskNewCep, moneyMask } from '../../utils/masks'

interface IParams {
  params: {
    index: string
  }
}

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

export default function BillOfSale({ data }) {
  const [order, setOrder] = useState<DataProps>(data)
  console.log(data)
  const handleDownload = () => {
    window.print()
  }
  return (
    <div className="h-screen bg-white text-black artboard">
      <div className="px-14 py-12">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center border-r-2 px-2">
            <Image
              src={Logo}
              layout="fixed"
              quality={100}
              width={190}
              height={80}
              className="object-contain"
              alt="Logo BuyPhone"
            />
          </div>
          <div className="border-r-2 px-2">
            <span className="font-semibold">
              Buyphone Programas de vantagens e tecnologia
            </span>
            <p className="mt-5 text-sm">
              CNPJ: 45.679.637/0001-94
              <br /> Avenida Brasilia, 2121, Sala 12, 16.018-000
              <br />
              Jardim Nova Yorque, Araçatuba - SP, Brasil
            </p>
          </div>
          <div className="px-2">
            <div className="rounded-md border p-2 text-xs">
              <span className="block">CHAVE DE ACESSO</span>
              <span>
                3322 0933 0412 6004 8604 5500 0010 3744 2011 2185 0055
              </span>
            </div>
            <p className="text-xs p-2">
              Consulta de autenticidade no portal nacional da NF-e
              <br />
              www.nfe.fazenda.gov/portal
              <br />
              ou no site da Sefas autorizada
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="btn py-4 text-white w-56 m-auto mt-5 bg-info shadow-md border-0"
            onClick={() => handleDownload()}
          >
            baixar
          </button>
        </div>
      </div>
      <div className="divider m-0 before:bg-[#BCB0C4] after:bg-[#BCB0C4]"></div>
      <div className="px-14 py-4">
        <h1 className="font-semibold">DESTINATÁRIO/REMETENTE</h1>
        <div className="overflow-x-auto mt-5" data-theme="light">
          <table className="table w-full border p-2 bg-white">
            <tbody>
              <tr>
                <td>
                  <span className="font-semibold">DESTINATÁRIO:</span>{' '}
                  {data.user.name}
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-semibold">CPF/CNPJ:</span>{' '}
                  {cpfMask(data.user.document)}
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-semibold">ENDEREÇO:</span>{' '}
                  {data.address.address}, {data.address.number},{' '}
                  {maskNewCep(data.address.postal_code)},{' '}
                  {data.address.neighborhood}
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-semibold">CIDADE:</span>{' '}
                  {data.address.city}-{data.address.uf}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="table w-full border p-2 bg-white mt-5">
            <tbody>
              <tr>
                <td>
                  <span className="font-semibold">REMETENTE::</span> Buyp
                  Programas de vantagens e tecnologia LTDA
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-semibold">CPF/CNPJ:</span>{' '}
                  45.679.637/0001-94
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-semibold">ENDEREÇO:</span> Avenida
                  Brasilia, 2121, Sala 12, 16.018-000, Jardim Nova Yorque
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-semibold">CIDADE:</span> Araçatuba-SP
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="divider before:bg-[#BCB0C4] after:bg-[#BCB0C4]"></div>
        <div className="overflow-x-auto" data-theme="light">
          <table className="table w-full">
            <thead>
              <tr>
                <th>FORMA DE PAGAMENTO</th>
                <th>PARCELAS</th>
                <th>VLR COMPRA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {data.method === 'PIX' && 'PIX'}
                  {data.method === 'CREDIT' && 'Crédito'}
                  {data.method === 'CUSTOM' && 'Personalizado'}
                </td>
                <td>1</td>
                <td>{moneyMask(data.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="divider before:bg-[#BCB0C4] after:bg-[#BCB0C4]"></div>
        <div className="overflow-x-auto" data-theme="light">
          <table className="table w-full">
            <thead>
              <tr>
                <th>TRANSPORTADOR</th>
                <th>FRETE POR CONTA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {' '}
                  Empresa Brasileira de Correios e Telegrafos,
                  <br />
                  CNPJ 34.028.316/0001-03
                </td>
                <td>Remetente</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="divider before:bg-[#BCB0C4] after:bg-[#BCB0C4]"></div>
        <div className="mt-5">
          <h1 className="font-semibold mb-2">DADOS DOS PRODUTOS</h1>
          <div className="overflow-x-auto" data-theme="light">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Descrição do produto</th>
                  <th>QTD</th>
                  <th>VLR UNIT</th>
                  <th>VLR TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>iPhone 11 (64Gb - Branco)</td>
                  <td>01</td>
                  <td>3.000,00</td>
                  <td>3.000,00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-5">
          <h1 className="font-semibold mb-2">DADOS ADICIONAIS</h1>
          <div className="rounded-md border p-2">
            <p>
              N.PEDIDO: #C131O118I104 Venda realizada pela Internet (Comercio
              Eletronico) no site https://buyphone.com.br/O IMEI DESTE
              EQUIPAMENTO E:(358688605338383)
            </p>
          </div>
        </div>
        <div className="mt-5">
          <h1 className="font-semibold mb-2">TERMOS DE USO</h1>
          <p className="text-xs">
            A BuyPhone conecta através de uma plataforma online, pedidos de
            compra de aparelhos eletrônicos da marca Apple, com pessoas
            cadastradas em nossa plataforma, que tem o interesse de acelerar os
            pontos gerados em seus cartões de crédito com a compra de produtos.
            Essas pessoas compram os produtos nas maiores lojas do Brasil e, com
            a nossa ajuda, enviam para os compradores.
            <br />
            <br />
            Declaro que não me enquadro no conceito de contribuinte previsto no
            art. 4º da Lei Complementar nº 87/1996, uma vez que não realizo, com
            habitualidade ou em volume que caracterize intuito comercial,
            operações de circulação de mercadoria, ainda que se iniciem no
            exterior, ou estou dispensado da emissão da nota fiscal por força da
            legislação tributária vigente, responsabilizando-me, nos termos da
            lei e a quem de direito, por informações inverídicas.
          </p>
        </div>
      </div>
      <div className="divider before:bg-[#BCB0C4] after:bg-[#BCB0C4]"></div>
      <div className="grid grid-cols-2 px-14 mb-5">
        <div>
          <p className="text-sm text-[#6F6F84]">
            (18) 98136-7275 <br /> contato@buyphone.com.br <br />{' '}
            www.buyphone.com.br
          </p>
        </div>
        <div>
          <p className="text-sm text-right text-[#6F6F84]">
            Avenida Brasilia, 2121, sala 1116
            <br />
            Jardim Nova Yorque <br />
            16018-000
            <br />
            Araçatuba-SP
          </p>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }: IParams) => {
  const idOrder = params.index
  try {
    const { data } = await apiStore.get(`/orders/${idOrder}/`)
    return {
      props: {
        data,
      },
    }
  } catch (error) {
    return {
      props: { data: null },
    }
  }
}
