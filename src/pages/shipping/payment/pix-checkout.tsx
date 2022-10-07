import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies } from 'nookies'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useCart } from '../../../context/UseCartContext'
import { GetUseType } from '../../../utils/getUserType'
import { moneyMask } from '../../../utils/masks'

interface PixPaymentProps {
  pix: {
    amount: number
    brcode: string
    created_at: string
    id: number
    invoice_id: string
    link: string
    order_id: number
    pdf: string
    qrcode: string
    status: string
    updated_at: string
  }
}

export default function PixCheckout({ pix }: PixPaymentProps) {
  const router = useRouter()
  const user = GetUseType()

  const copyToClipBoard = async (copyMe: string) => {
    try {
      await navigator.clipboard.writeText(copyMe)
      toast.success('link copiado com sucesso')
    } catch (err) {
      toast.error('erro ao copiar o link')
    }
  }

  return (
    <div className="my-10 px-4">
      <div className="flex flex-col gap-4 max-w-5xl mx-auto">
        <div className="flex flex-col w-full md:flex-row justify-evenly">
          <div className="text-center w-full grid gap-3">
            <div className="card card-compact shadow w-fit mx-auto">
              <img
                src={`https://loja.buyphone.com.br/img/qrcode/${pix.invoice_id}.png`}
                alt="QRCode"
                className="mx-auto h-32"
              />
            </div>
            <h3 className="font-bold text-2xl">
              Valor: R$ {moneyMask(pix.amount?.toString())}
            </h3>
            <div className="grid gap-2">
              <a
                onClick={() => copyToClipBoard(`${pix.brcode}`)}
                className={
                  'btn font-bold normal-case ' +
                  (user?.type === 1
                    ? 'btn-info bg-white text-black hover:opacity-80'
                    : 'btn-primary')
                }
              >
                Copiar QRCode
              </a>

              <Link href={pix?.pdf ?? ''}>
                <a
                  className={
                    'btn font-bold normal-case ' +
                    (user?.type === 1
                      ? 'btn-info bg-white text-black hover:opacity-80'
                      : 'btn-primary')
                  }
                >
                  Baixar PDF
                </a>
              </Link>
            </div>
          </div>
          <div className="divider md:divider-horizontal"></div>
          <div className="flex flex-col w-full justify-center gap-3">
            <div className="badge badge-lg badge-warning">
              Aguardando Pagamento
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-3xl">
                Enviar R$ {moneyMask(pix.amount.toString())} para:
              </h3>
              <div>
                <span className="font-bold">Nome:</span> Buyp Programas de
                Vantagens e Tecnologia Ltda
              </div>
              <div>
                <span className="font-bold">CNPJ:</span> 45.679.637/0001-94
              </div>
            </div>
            <a
              className={
                'btn font-bold normal-case ' +
                (user?.type === 1
                  ? 'btn-info bg-white text-black hover:opacity-80'
                  : 'btn-primary')
              }
              onClick={() => router.push('/myshopping')}
            >
              Verificar Pagamento
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { '@BuyPhone:Pix': pixCookies } = parseCookies(ctx)

  if (pixCookies) {
    const pix = JSON.parse(pixCookies)
    return { props: { pix } }
  }

  if (!pixCookies) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
