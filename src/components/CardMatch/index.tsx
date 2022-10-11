import { faBars, faHeart, faI, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useState } from 'react'
import OuterImg from '../../assets/images/outer.svg'

interface CardMatchProps {
  next: () => void
}

const CardMatch = ({ next }: CardMatchProps) => {
  const [failMatch, setFailMatch] = useState(false)

  async function noMatch() {
    setFailMatch(false)
  }

  const wrapperFunction = async () => {
    setFailMatch(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    noMatch()
    next()
  }

  return (
    <div className="card md:px-36 md:py-14 flex md:flex-row flex-col justify-center items-center text-info-content bg-accent drop-shadow-xl rounded-lg md:max-w-5xl mx-auto my-10">
      <div className="w-[80%] mx-auto relative">
        <div
          className={
            'flex absolute w-full z-10 justify-end transition-all duration-300 ml-8 -mt-16 ' +
            (failMatch === false ? 'opacity-0' : 'opacity-100')
          }
        >
          <Image src={OuterImg} layout="fixed" />
        </div>

        <figure>
          <Image
            src="https://pedidos.buyphone.com.br/media/3004/11-PRETO.webp"
            width={250}
            height={300}
          />
        </figure>
      </div>

      <div className="card-body items-start w-full">
        <h1 className="font-normal text-2xl text-start">
          iPhone 12 Apple Branco 64Gb
        </h1>
        <div className="flex items-center mt-2 text-xs">
          <StarIcon className="w-5 h-5 text-yellow-500"></StarIcon>
          <p>4.9 (1234) comentários</p>
        </div>
        <div className="flex flex-col gap-5 items-start">
          <div>
            <h1 className="text-xl">Especificações</h1>
            <div className="flex gap-3 mt-2 text-xs">
              <span className="badge p-3 bg-transparent border border-info-content text-info-content">
                64Gb
              </span>
              <span className="badge p-3 bg-transparent border border-info-content text-info-content">
                Branco
              </span>
            </div>
          </div>
          <div className="text-start">
            <h1 className="opacity-80 text-base font-medium line-through decoration-red-600">
              R$ 5000
            </h1>
            <h2 className="text-2xl font-medium">R$ 6000</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={wrapperFunction}
              className="btn btn-circle bg-transparent text-error hover:bg-error hover:text-white border-error rounded-full"
            >
              <FontAwesomeIcon icon={faX} className="w-6 h-6" />
            </button>

            <button className="btn btn-circle bg-transparent border-slate-600 rounded-full">
              <FontAwesomeIcon
                icon={faBars}
                className="w-4 h-4 text-slate-600"
              />
            </button>

            <button className="btn btn-circle bg-transparent text-success hover:bg-success hover:text-white border-success rounded-full">
              <FontAwesomeIcon icon={faHeart} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardMatch
