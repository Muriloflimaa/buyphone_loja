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
    <div className="card py-5 my-8 mx-auto grid grid-cols-1 text-info-content bg-accent drop-shadow-xl rounded-lg md:px-36 md:py-14 md:gap-10 md:grid-cols-2 md:max-w-5xl">
      <div className="relative flex justify-center md:justify-end col-span-1">
        <div className="hidden md:block">
          <Image
            src={data.media[0].original_url}
            layout="fixed"
            width={250}
            height={300}
          />
        </div>
        <div className="md:hidden">
          <Image
            src={data.media[0].original_url}
            layout="fixed"
            width={150}
            height={200}
          />
        </div>
        <div
          className={
            'absolute top-0 left-16 ' +
            (successMatch === false ? 'opacity-0' : 'opacity-100')
          }
        >
          <Image src={GosteiImg} />
        </div>
        <div
          className={
            'absolute top-0 md:right-0 ' +
            (failMatch === false ? 'opacity-0' : 'opacity-100')
          }
        >
          <Image src={OuterImg} />
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center col-span-1 md:gap-5 md:items-start">
        <h1 className="font-normal text-xl md:text-2xl">{data.name}</h1>
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
        <div className="text-center md:text-start">
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
  )
}

export default CardMatch
