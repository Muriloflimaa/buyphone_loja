import { faBars, faHeart, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import GosteiImg from '../../assets/images/gostei.svg'
import OuterImg from '../../assets/images/outer.svg'

import { useCart } from '../../context/UseCartContext'
import { IProduct } from '../../types'
import { moneyMask } from '../../utils/masks'
import { verificationPrice } from '../../utils/verificationPrice'
import CountDownComponent from '../CountDownComponent'

interface CardMatchProps {
  next: () => void
  data: IProduct
}

const CardMatch = ({ next, data }: CardMatchProps) => {
  const [changeText, setChangeText] = useState(false)
  const [failMatch, setFailMatch] = useState(false)
  const [successMatch, setSuccessMatch] = useState(false)
  const { addProduct } = useCart()
  const handleOpenModalItsMatch = () => {
    return document
      .getElementById('modal-open-match')
      ?.classList.add('modal-open')
  }

  const { '@BuyPhone:User': user } = parseCookies(undefined) //pega dados do usuário logado
  const [isUser, setIsUser] = useState(false) //state para previnir erro de renderização no usuario logado

  useEffect(() => {
    if (user) {
      setIsUser(true)
    }
  }, [user])

  async function noMatch() {
    setFailMatch(false)
  }

  setTimeout(() => {
    setChangeText(!changeText)
  }, 1400)

  async function Math() {
    setSuccessMatch(false)
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
      setSuccessMatch(true)
      await new Promise((resolve) => setTimeout(resolve, 500))

      Math()
      await new Promise((resolve) => setTimeout(resolve, 200))
      next()

      setTimeout(() => {
        handleOpenModalItsMatch()
      }, 10000)
      return
    }
  }

  function handleAddProduct(id: number, condition?: string) {
    addProduct(id)
    wrapperFunction(condition)
  }

  const returnPrice = verificationPrice(data, user, isUser)
  const link = `/products/apple/iphones/${data.category_slug}/${data.slug}`
  const resultDiscount = returnPrice.averagePrice - returnPrice.ourPrice
  const resultDiscountPercent = (
    (resultDiscount / returnPrice.averagePrice) *
    100
  ).toFixed(1)

  return (
    <>
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
              'absolute -top-4 left-16 ' +
              (successMatch === false ? 'opacity-0' : 'opacity-100')
            }
          >
            <Image src={GosteiImg} />
          </div>
          <div
            className={
              'absolute -top-4 md:right-0 ' +
              (failMatch === false ? 'opacity-0' : 'opacity-100')
            }
          >
            <Image src={OuterImg} />
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center md:text-start col-span-1  md:items-start">
          {process.env.NEXT_PUBLIC_BLACK_FRIDAY &&
            !!JSON.parse(process.env.NEXT_PUBLIC_BLACK_FRIDAY) &&
            data.blackfriday == 1 && <CountDownComponent width={'w-2/3'} />}

          <span className="badge badge-success w-2/3 bg-primary text-white uppercase text-xs font-semibold">
            {`${
              changeText
                ? resultDiscountPercent.replace('.0', '') + '% de desconto'
                : 'parcelamento em ate 12x'
            }`}
          </span>
          <span className="badge badge-success w-2/3 bg-[#D5FDC7] text-[#004907] uppercase text-xs font-semibold">
            {changeText ? (
              <span className="flex gap-1">
                <span className="text-[#1F7501]/50">Economia de </span>

                <span className="text-[#004907]">
                  R${' '}
                  {moneyMask(
                    (returnPrice.averagePrice - returnPrice.ourPrice).toString()
                  )}
                </span>
              </span>
            ) : (
              <span className="flex gap-1">
                <span className="text-[#004907]">Entrada no PIX + </span>
                <span className="text-[#1F7501]/50">parcelas</span>
              </span>
            )}
          </span>

          <h1 className="font-normal text-xl md:text-2xl">{data.name}</h1>
          <div>
            <h1 className="md:text-xl md:text-start">Especificações</h1>
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
              {returnPrice.averagePrice <= 0
                ? 'Esgotado'
                : `R$ ${moneyMask(returnPrice.averagePrice.toString())}`}
            </h1>
            <h2 className="text-2xl font-medium">
              {returnPrice.ourPrice <= 0
                ? 'Esgotado'
                : `R$ ${moneyMask(returnPrice.ourPrice.toString())}`}
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
            {returnPrice.ourPrice <= 0 ? (
              <button
                onClick={() => handleAddProduct(data.id, 'success')}
                className="btn btn-circle btn-disabled text-success hover:bg-success hover:text-white border-success rounded-full"
              >
                <FontAwesomeIcon icon={faHeart} className="w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={() => handleAddProduct(data.id, 'success')}
                className="btn btn-circle bg-transparent text-success hover:bg-success hover:text-white border-success rounded-full"
              >
                <FontAwesomeIcon icon={faHeart} className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CardMatch
