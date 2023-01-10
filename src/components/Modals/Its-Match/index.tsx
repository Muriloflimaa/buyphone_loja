import Image from 'next/image'
import { useRouter } from 'next/router'
import BelaItsAMatch from '../../../assets/images/bela_its_a_match.webp'
import ImageItsMatch from '../../../assets/images/its-a-match.webp'
import { useCart } from '../../../context/UseCartContext'

export default function ItsModal() {
  const router = useRouter()
  const { values } = useCart()
  const handleCloseModalItsMatch = () => {
    return document
      .getElementById('modal-open-match')
      ?.classList.remove('modal-open')
  }
  const handleCheckout = () => {
    router.push('/cart')
  }
  return (
    <>
      <div className="modal modal-middle" id="modal-open-match">
        <div className="modal-box flex flex-col items-center mx-5 bg-white text-[#201942]">
          <Image src={ImageItsMatch} quality={100} width={300} height={80} />
          <h3 className="text-sm mt-3">Vocês foram feitos um para o outro!</h3>
          <div className="flex gap-2.5 my-8">
            <div className="rounded-full w-36 h-36 bg-[#212B36] relative overflow-hidden">
              <Image
                src={BelaItsAMatch}
                quality={100}
                layout="responsive"
                alt="Imagem personagem Belatriz"
              />
            </div>
            <div className="flex flex-col justify-center items-center rounded-full w-36 h-36 bg-[#212B36] relative overflow-hidden">
              {values.length > 0 && (
                <Image
                  src={
                    values[values.length - 1].product.media[0] &&
                    values[values.length - 1].product.media[0].original_url
                  }
                  layout="fixed"
                  width={60}
                  height={70}
                />
              )}
              <span className="text-xs text-white">
                {values[values.length - 1]?.product.name}
              </span>
              <div className="flex">
                <span className="text-xs text-white">
                  {values[values.length - 1]?.product.color}
                </span>
                &nbsp;
                <span className="text-xs text-white">
                  {values[values.length - 1]?.product.memory}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-y-1.5">
            <label
              onClick={handleCheckout}
              className="btn w-80 bg-success text-white border-none"
            >
              finalizar compra
            </label>
            <label
              onClick={handleCloseModalItsMatch}
              className="btn text-[#201942] w-80 bg-inherit"
            >
              continuar comprando
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
