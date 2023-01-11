import Image from 'next/image'
import { setCookie } from 'nookies'
import Logo from '../../assets/images/LogoPurple.webp'
import { setupAPIClient } from '../../services/newApi/api'
import { cpfMask, maskNewCep, moneyMask } from '../../utils/masks'

interface IProduct {
  name: string
  color: string
  memory: string
}

interface IOrder {
  qty: number
  price: number
  created_at: string
  updated_at: string
  shipping_status: null
  tracking_code: null
  tracking_url: null
  product: Array<IProduct>
  code: string
  imei: string
  nf_key: string
  order: {
    id: number
    user_id: number
    address_id: number
    invoice_id: number
    total: number
    method: string
    created_at: string
    updated_at: string
    utm_source: null
    utm_medium: null
    utm_campaign: null
    no_interest_price: number | null
    installments: number
    address: {
      id: number
      user_id: number
      postal_code: string
      address: string
      number: number
      complement: null
      neighborhood: string
      city: string
      uf: string
      created_at: string
      updated_at: string
      deleted_at: null
    }
    user: {
      id: number
      name: string
      email: string
      email_verified_at: null
      two_factor_secret: null
      two_factor_recovery_codes: null
      current_team_id: null
      profile_photo_path: null
      created_at: string
      updated_at: string
      document: string
      external_id: string
      birthdate: null
      mobile_phone: null
      code: null
      type: 0
      utm_source: null
      utm_medium: null
      utm_campaign: null
      lead: 0
    }
  }
}
// --
interface DataProps {
  data: Array<IOrder>
}

export default function BillOfSale({ data }: DataProps) {
  const handleDownload = () => {
    window.print()
  }
  return (
    <div className="h-screen bg-white text-black artboard">
      <div className="md:px-14 px-8 py-12">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          id="media-print-style"
        >
          <div className="flex items-center md:border-r-2 px-2">
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
          <div className="md:border-r-2 px-2">
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
              <span>{data[0].nf_key}</span>
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
      <div className="md:px-14 px-8 py-4">
        <h1 className="font-semibold">DESTINATÁRIO/REMETENTE</h1>
        <div className="overflow-x-auto mt-5" data-theme="light">
          <table className="overflow-hidden sm:table sm:border sm:p-2 bg-white mt-5 table-auto w-full flex flex-row flex-no-wrap">
            <tbody>
              <tr className="border">
                <td className="p-3">
                  <span className="font-semibold">DESTINATÁRIO:</span>{' '}
                  {data[0].order.user.name}
                </td>
              </tr>
              <tr className="border">
                <td className="p-3">
                  <span className="font-semibold">CPF/CNPJ:</span>{' '}
                  {cpfMask(data[0].order.user.document)}
                </td>
              </tr>
              <tr className="border">
                <td className="p-3">
                  <span className="font-semibold">ENDEREÇO:</span>{' '}
                  {data[0].order.address.address},{' '}
                  {data[0].order.address.number},{' '}
                  {maskNewCep(data[0].order.address.postal_code)},{' '}
                  {data[0].order.address.neighborhood}
                </td>
              </tr>
              <tr className="border">
                <td className="p-3">
                  <span className="font-semibold">CIDADE:</span>{' '}
                  {data[0].order.address.city}-{data[0].order.address.uf}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="overflow-hidden sm:table sm:border sm:p-2 bg-white mt-5 table-auto w-full flex flex-row flex-no-wrap">
            <tbody>
              <tr className="border">
                <td className="p-3">
                  <span className="font-semibold">REMETENTE:</span> Buyp
                  Programas de vantagens e tecnologia LTDA
                </td>
              </tr>
              <tr className="border">
                <td className="p-3">
                  <span className="font-semibold">CPF/CNPJ:</span>{' '}
                  45.679.637/0001-94
                </td>
              </tr>
              <tr className="border">
                <td className="p-3">
                  <span className="font-semibold">ENDEREÇO:</span> Avenida
                  Brasilia, 2121, Sala 12, 16.018-000, Jardim Nova Yorque
                </td>
              </tr>
              <tr className="border">
                <td className="p-3">
                  <span className="font-semibold">CIDADE:</span> Araçatuba-SP
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="divider before:bg-[#BCB0C4] after:bg-[#BCB0C4]"></div>
        <div className="mt-5">
          <h1 className="font-semibold mb-2">DADOS DOS PRODUTOS</h1>
          <div className="overflow-x-auto" data-theme="light">
            <table className="overflow-hidden sm:table sm:border sm:p-2 bg-white mt-5 table-auto w-full flex flex-row flex-no-wrap">
              <thead>
                <tr className="bg-[#f2f2f2] border-grey-light border flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none h-full gap-2">
                  {data.map((_: any, index: number) => {
                    return (
                      <>
                        <th
                          className={`p-4 text-left text-sm ${
                            index === 1 && 'sm:hidden'
                          }`}
                        >
                          Descrição do produto
                        </th>
                        <th
                          className={`p-4 text-left sm:text-center text-sm ${
                            index === 1 && 'sm:hidden'
                          }`}
                        >
                          QTD
                        </th>
                        <th
                          className={`p-4 text-left sm:text-center text-sm ${
                            index === 1 && 'sm:hidden'
                          }`}
                        >
                          VLR UNIT
                        </th>
                      </>
                    )
                  })}
                </tr>
              </thead>
              <tbody className="flex-1 sm:flex-none">
                {data.map((product: IOrder) => {
                  return (
                    <tr className="flex flex-col flex-no wrap sm:table-row">
                      <td className="border-grey-light border p-4">
                        {product.product[0].name} ({product.product[0].memory} -{' '}
                        {product.product[0].color})
                      </td>
                      <td className="border-grey-light border hover:bg-gray-100 p-4 sm:text-center">
                        {product.qty}
                      </td>
                      <td className="border-grey-light border hover:bg-gray-100 p-4 sm:text-center">
                        {moneyMask(product.price.toString())}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="divider before:bg-[#BCB0C4] after:bg-[#BCB0C4]"></div>
        <div className="overflow-x-auto" data-theme="light">
          <table className="overflow-hidden sm:table sm:border sm:p-2 bg-white mt-5 table-auto w-full flex flex-row flex-no-wrap">
            <thead>
              <tr className="bg-[#f2f2f2] border-grey-light border flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none h-full">
                <th className="p-3 text-left text-sm">FORMA DE PAGAMENTO</th>
                <th className="p-3 text-left sm:text-center text-sm">
                  PARCELAS
                </th>
                <th className="p-3 text-left sm:text-center text-sm">
                  VLR COMPRA
                </th>
              </tr>
            </thead>
            <tbody className="flex-1 sm:flex-none">
              <tr className="flex flex-col flex-no wrap sm:table-row">
                <td className="border-grey-light border p-3">
                  {data[0].order.method === 'PIX' && 'PIX'}
                  {data[0].order.method === 'CREDIT' && 'Crédito'}
                  {data[0].order.method === 'CUSTOM' && 'Personalizado'}
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 sm:text-center">
                  {data[0].order.installments}
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3 sm:text-center">
                  {moneyMask(
                    data[0].order.no_interest_price
                      ? data[0].order.no_interest_price.toString()
                      : data[0].order.total.toString()
                  )}
                </td>
              </tr>
              <tr className="flex flex-col flex-no wrap sm:table-row">
                <td className="border-grey-light sm:border sm:p-3"></td>
                <td className="border-grey-lightsm:border border-r-2 hover:bg-gray-100 p-3 sm:text-right">
                  Taxas:
                </td>
                <td className="border-grey-light sm:border border-r-2 border-b-2  hover:bg-gray-100 p-3 sm:text-center">
                  {moneyMask(
                    data[0].order.no_interest_price
                      ? (
                          Number(data[0].order.total) -
                          Number(data[0].order.no_interest_price)
                        ).toString()
                      : '000'
                  )}
                </td>
              </tr>
              <tr className="flex flex-col flex-no wrap sm:table-row">
                <td className="border-grey-light sm:border sm:p-3"></td>
                <td className="border-grey-light sm:border border-r-2 hover:bg-gray-100 p-3 sm:text-right">
                  Total:
                </td>
                <td className="border-grey-light sm:border border-r-2 border-b-2 border-t-none hover:bg-gray-100 p-3 sm:text-center">
                  {moneyMask(data[0].order.total.toString())}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="divider before:bg-[#BCB0C4] after:bg-[#BCB0C4]"></div>
        <div className="overflow-x-auto" data-theme="light">
          <table className="overflow-hidden sm:table sm:border sm:p-2 bg-white mt-5 table-auto w-full flex flex-row flex-no-wrap">
            <thead>
              <tr className="bg-[#f2f2f2] border-grey-light border flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none h-full grid">
                <th className="p-3 text-left flex items-center sm:table-cell text-sm">
                  TRANSPORTADOR
                </th>
                <th className="p-3 text-left flex items-center sm:table-cell text-sm">
                  FRETE POR CONTA
                </th>
              </tr>
            </thead>
            <tbody className="flex-1 sm:flex-none">
              <tr className="flex flex-col flex-no wrap sm:table-row">
                <td className="border-grey-light border p-3">
                  {' '}
                  Empresa Brasileira de Correios e Telegrafos,
                  <br />
                  CNPJ 34.028.316/0001-03
                </td>
                <td className="border-grey-light border hover:bg-gray-100 p-3">
                  Remetente
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="divider before:bg-[#BCB0C4] after:bg-[#BCB0C4]"></div>
        <div className="mt-5">
          <h1 className="font-semibold mb-2">DADOS ADICIONAIS</h1>
          <div className="rounded-md border p-2">
            <p>
              N.PEDIDO: {data[0].code} Venda realizada pela Internet (Comercio
              Eletronico) no site https://buyphone.com.br/O IMEI DESTE
              EQUIPAMENTO É:({data[0].imei})
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
      <div className="grid grid-cols-2 md:px-14 px-8 mb-5">
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

export const getServerSideProps = async (ctx: any) => {
  const idOrder = ctx.params.index
  const api = setupAPIClient(ctx)

  try {
    const { data } = await api.get(`/store/orders/${idOrder}/`)

    const user = await api
      .get('/store/me')
      .then((response) => {
        return response
      })
      .catch(() => {
        return null
      })

    if (data[0].order.user.id !== user!.data.id) {
      setCookie(
        ctx,
        '@BuyPhone:Error-Bill-Of-Sale',
        `/bill-of-sale/${idOrder}`,
        {
          maxAge: 60, // 24h
          path: '/',
        }
      )

      return {
        redirect: {
          destination: '/account/login',
          permanent: false,
        },
      }
    } else {
      return {
        props: {
          data,
        },
      }
    }
  } catch (error) {
    console.log(error)
    setCookie(
      ctx,
      '@BuyPhone:Error',
      'Você precisa ser dono da nota fiscal para visualizá-la',
      {
        maxAge: 60, // 24h
        path: '/',
      }
    )
    return {
      redirect: {
        destination: '/account/login',
        permanent: false,
      },
    }
  }
}
