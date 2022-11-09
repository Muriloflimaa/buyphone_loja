import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import toast from 'react-hot-toast'
import { apiStore } from '../../../../services/api'
import { moneyMask } from '../../../../utils/masks'
import { setCookies } from '../../../../utils/useCookies'

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

  const copyToClipBoard = async (copyMe: string) => {
    AttPayment()
    try {
      await navigator.clipboard.writeText(copyMe)
      toast.success('link copiado com sucesso')
    } catch (err) {
      toast.error('erro ao copiar o link')
    }
  }

  async function AttPayment() {
    try {
      const { data } = await apiStore.get(`invoices/${pix.id}`)
      if (data.status === 'paid') {
        setCookies('@BuyPhone:SuccessShipping', 'true', 180)
        router.push('/purchased')
      }
    } catch (error) {
      router.push('/user/myshopping')
    }
  }

  return (
    <>
      <div className="my-10 px-4">
        <div className="flex flex-col gap-4 max-w-5xl mx-auto">
          <div className="flex flex-col w-full md:flex-row justify-evenly">
            <div className="text-center w-full grid gap-3">
              <div className="card card-compact shadow w-fit mx-auto">
                <Image
                  src={pix.qrcode}
                  width={128}
                  height={128}
                  className="mx-auto"
                />
              </div>
              <h3 className="font-bold text-2xl">
                Valor: R$ {moneyMask(pix.amount?.toString())}
              </h3>
              <div className="grid gap-2">
                <a
                  onClick={() => copyToClipBoard(`${pix.brcode}`)}
                  className="btn btn-info text-white"
                >
                  Copiar QRCode
                </a>

                <Link href={pix?.pdf ?? ''}>
                  <a className="btn btn-info text-white">Baixar PDF</a>
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
              <a className="btn btn-info text-white" onClick={AttPayment}>
                Verificar Pagamento
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
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
