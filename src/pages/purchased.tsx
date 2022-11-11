import Image from 'next/image'
import Link from 'next/link'
import Confetti from 'react-confetti'
import { useWindowSize } from '../utils/useWindowSize'
import GifPng from '../assets/images/giphy.gif'
import { destroyCookie, parseCookies } from 'nookies'
import { GetServerSidePropsContext } from 'next'

export default function Purchased() {
  const size = useWindowSize()

  destroyCookie(null, '@BuyPhone:SuccessShipping')
  destroyCookie(undefined, '@BuyPhone:SuccessShipping')
  destroyCookie({}, '@BuyPhone:SuccessShipping')

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

          <Image className="rounded-lg" src={GifPng} />
        </div>
      </div>
    </>
  )
}

//descomente para iniciar validação nos cookies

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const { '@BuyPhone:SuccessShipping': success } = parseCookies(ctx)

//   if (success) {
//     return {
//       props: {},
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
