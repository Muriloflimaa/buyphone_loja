import Link from 'next/link'
import Script from 'next/script'
import Confetti from 'react-confetti'
import { useWindowSize } from '../utils/useWindowSize'
import GifPng from '../assets/images/giphy.gif'
import { destroyCookie, parseCookies } from 'nookies'
import { GetServerSidePropsContext } from 'next'
import BlurImage from '../components/BlurImage'
import Head from 'next/head'

export default function Purchased({ orderId, valueOrder }: any) {
  const size = useWindowSize()

  destroyCookie(null, '@BuyPhone:SuccessShipping')
  destroyCookie(undefined, '@BuyPhone:SuccessShipping')
  destroyCookie({}, '@BuyPhone:SuccessShipping')
  destroyCookie(null, '@BuyPhone:@BuyPhone:OrderId')
  destroyCookie(undefined, '@BuyPhone:@BuyPhone:OrderId')
  destroyCookie({}, '@BuyPhone:@BuyPhone:OrderId')
  destroyCookie(null, '@BuyPhone:@BuyPhone:ValueOrder')
  destroyCookie(undefined, '@BuyPhone:@BuyPhone:ValueOrder')
  destroyCookie({}, '@BuyPhone:@BuyPhone:ValueOrder')

  return (
    <>
      <Confetti
        recycle={false}
        gravity={0.08}
        numberOfPieces={800}
        width={size.width && size.width - 30}
        height={1000}
      />
      <div className="w-full flex flex-col max-w-md mx-auto text-center">
        <div className="max-w-7xl w-full my-10 flex flex-col gap-4 items-center text-center px-4">
          <h1 className="text-4xl">Obrigado pela sua compra!</h1>
          <span>
            O seu pedido foi aceito e está sendo processado. Você irá receber
            uma notificação com os detalhes do pedido no seu e-mail.
          </span>
          <Link href={'/user/myshopping'}>
            <a className="link">Ir para minhas compras</a>
          </Link>

          <BlurImage className="rounded-lg" src={GifPng} />
        </div>
      </div>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              gtag('event', 'conversion', {
                'send_to': 'AW-11020041991/5bbNCLWv0oEYEIf-4YYp',
                'value': 100000,
                'currency': 'BRL',
                'transaction_id': 400
            })`,
          }}
        />
      </Head>
    </>
  )
}

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const { '@BuyPhone:SuccessShipping': success } = parseCookies(ctx)
//   const { '@BuyPhone:OrderId': orderId } = parseCookies(ctx)
//   const { '@BuyPhone:ValueOrder': valueOrder } = parseCookies(ctx)

//   if (success) {
//     return {
//       props: {
//         orderId: orderId,
//         valueOrder: valueOrder,
//       },
//     }
//   } else {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }
// }
