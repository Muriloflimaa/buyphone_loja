import { ShoppingBagIcon, StarIcon } from '@heroicons/react/solid'
import Link from 'next/link'

export default function Avaliation() {
  return (
    <div className="max-w-7xl my-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-black text-center gap-4">
        <h1 className="text-4xl">Sucesso!</h1>
        <div className="h-[1px] bg-white my-2 w-full"></div>
        <h2 className="text-4xl">Obrigado pela sua compra!</h2>
        <span>
          O seu pedido foi aceito e está sendo processado. Você irá receber uma
          notificação com os detalhes do pedido no seu e-mail.
        </span>
        <Link href={'/'}>
          <a className="link">Volta para página inicial</a>
        </Link>
        <div className="flex flex-col items-center mt-10">
          <ShoppingBagIcon className="w-24 h-24" />
          <div className="flex gap-2">
            <StarIcon className="w-5 h-5" />
            <StarIcon className="w-5 h-5" />
            <StarIcon className="w-5 h-5" />
            <StarIcon className="w-5 h-5" />
            <StarIcon className="w-5 h-5" />
          </div>
          <span className="text-4xl my-1">Avalie este produto.</span>
        </div>
        <textarea
          className="textarea max-w-2xl mx-8 w-full"
          placeholder="Escreva um comentário"
        ></textarea>
        <div className="flex justify-end w-full max-w-2xl mx-8 mb-2">
          <button className="uppercase btn btn-primary">
            Enviar avaliação
          </button>
        </div>
      </div>
    </div>
  )
}
