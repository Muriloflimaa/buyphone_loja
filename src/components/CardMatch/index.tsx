import { faBars, faHeart, faI, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import OuterImg from '../../assets/images/outer.svg'
import GosteiImg from '../../assets/images/gostei.svg'

import { useCart } from '../../context/UseCartContext'
import { IProduct } from '../../types'
import { moneyMask } from '../../utils/masks'
import { verificationPrice } from '../../utils/verificationPrice'

interface CardMatchProps {
  next: () => void
  data: IProduct
}

const CardMatch = ({ next, data }: CardMatchProps) => {
  const [failMatch, setFailMatch] = useState(false)
  const [successMatch, setSuccesMatch] = useState(false)
  const { addProduct } = useCart()

  async function noMatch() {
    setFailMatch(false)
  }

  async function Math() {
    setSuccesMatch(false)
  }

  const wrapperFunction = async (condition?: string) => {
    if (condition === 'error') {
      setFailMatch(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      noMatch()
      await new Promise((resolve) => setTimeout(resolve, 200))
      next()
      return
    } else {
      setSuccesMatch(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      Math()
      await new Promise((resolve) => setTimeout(resolve, 200))
      next()
      return
    }
  }

  function handleAddProduct(id: number, condition?: string) {
    addProduct(id)
    wrapperFunction(condition)
  }

  const returnPrice = verificationPrice(data)
  const link = `/products/apple/iphones/${data.category_slug}/${data.slug}`

  return (
    <div className="card md:px-36 md:py-14 py-5 flex md:flex-row flex-col justify-center items-center text-info-content bg-accent drop-shadow-xl rounded-lg md:max-w-5xl mx-auto my-10">
      <div className="w-[50%] md:w-[80%] mx-auto relative">
        <div
          className={
            'flex absolute w-full z-10 justify-end transition-all duration-300 md:ml-6 md:-mt-10 ' +
            (failMatch === false ? 'opacity-0' : 'opacity-100')
          }
        >
          <Image src={OuterImg} layout="fixed" />
        </div>
        <div
          className={
            'flex absolute w-full z-10 justify-start transition-all duration-300 md:-mt-10 ' +
            (successMatch === false ? 'opacity-0' : 'opacity-100')
          }
        >
          <Image src={GosteiImg} layout="fixed" />
        </div>
        <div className="w-[80%] mx-auto md:mx-0">
          <figure>
            <Image src={data.media[0].original_url} width={250} height={300} />
          </figure>
        </div>
      </div>

      <div className="card-body pt-4 md:items-start items-center w-full">
        <h1 className="font-normal text-xl md:text-2xl text-start">
          {data.name}
        </h1>
        <div className="flex flex-col gap-5 md:items-start items-center">
          <div>
            <h1 className="md:text-xl">Especificações</h1>
            <div className="flex gap-3 md:mt-2 text-xs">
              <span className="badge md:p-3 bg-transparent border border-info-content text-info-content">
                {data.memory}
              </span>
              <span className="badge md:p-3 bg-transparent border border-info-content text-info-content">
                {data.color}
              </span>
            </div>
          </div>
          <div className="text-start">
            <h1 className="opacity-80 text-base font-medium line-through decoration-red-600">
              R$ {moneyMask(returnPrice.averagePrice.toString())}
            </h1>
            <h2 className="text-2xl font-medium">
              R$ {moneyMask(returnPrice.ourPrice.toString())}
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => wrapperFunction('error')}
              className="btn btn-circle bg-transparent text-error hover:bg-error hover:text-white border-error rounded-full"
            >
              <FontAwesomeIcon icon={faX} className="w-6 h-6" />
            </button>
            <Link href={link}>
              <button className="btn btn-circle bg-transparent border-slate-600 rounded-full">
                <FontAwesomeIcon
                  icon={faBars}
                  className="w-4 h-4 text-slate-600"
                />
              </button>
            </Link>
            <button
              onClick={() => handleAddProduct(data.id, 'success')}
              className="btn btn-circle bg-transparent text-success hover:bg-success hover:text-white border-success rounded-full"
            >
              <FontAwesomeIcon icon={faHeart} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardMatch
