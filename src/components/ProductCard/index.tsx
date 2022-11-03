import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCart } from '../../context/UseCartContext'
import { moneyMask } from '../../utils/masks'
import { verificationColor } from '../../utils/verificationColors'

interface ProductCardProps {
  id: number
  name: string
  colorPhone: string
  averagePrice: number
  price: number
  memory: string
  image: string
  idCategory: number
  slug: string
  slugCategory: string
  changeText: boolean
}

const ProductCard = ({
  id,
  name,
  colorPhone,
  averagePrice,
  price,
  image,
  slug,
  slugCategory,
  memory,
  changeText,
}: ProductCardProps) => {
  const [color, setColor] = useState<string | undefined>()
  const { addProduct } = useCart()
  const resultDiscount = averagePrice - price
  const resultDiscountPercent = ((resultDiscount / averagePrice) * 100).toFixed(
    1
  )

  const link = `/products/apple/iphones/${slugCategory}/${slug}`

  function handleAddProduct(id: number) {
    addProduct(id)
  }

  useEffect(() => {
    setColor(verificationColor(colorPhone))
  }, [])

  const router = useRouter()

  return (
    <div
      className="card card-compact cursor-pointer w-full h-full text-info-content bg-accent shadow-black md:hover:shadow-2xl md:hover:drop-shadow-lg md:hover:scale-105 transition-all duration-200 sm:card-normal max-w-xs relative overflow-visible rounded-lg"
      key={id}
    >
      <div className="card-body text-center ">
        <div onClick={() => router.push(link)} className="w-[80%] mx-auto">
          <figure className="mb-6">
            <Image src={image} width={350} height={450} />
          </figure>
        </div>

        <span className="badge badge-success py-5 md:py-0 w-full bg-[#F8F5BD] text-[#BF7300] uppercase text-xs font-semibold mx-auto">
          {`${
            changeText
              ? resultDiscountPercent.replace('.0', '') + '% de desconto'
              : 'parcelamento em ate 12x'
          }`}
        </span>
        <span className="badge badge-success w-full bg-[#D5FDC7] text-[#004907] uppercase text-xs py-5 md:py-0 font-semibold mx-auto">
          {changeText ? (
            <span>
              Economia de
              <span className="text-[#004907] ml-1">
                <br className="block md:hidden" />
                R$
                {moneyMask((averagePrice - price).toString())}
              </span>
            </span>
          ) : (
            <span className="text-[#004907]">
              Entrada no PIX +
              <span className="text-[#1F7501]/50 ml-1">pacercelas</span>
            </span>
          )}
        </span>
        <h2
          onClick={() => router.push(link)}
          className="card-title justify-center flex-col font-medium"
        >
          {name}
        </h2>
        <div
          onClick={() => router.push(link)}
          className="flex flex-wrap gap-2 justify-center"
        >
          <div className="badge badge-outline text-xs h-auto">
            <div
              className={`h-2 w-2 rounded-full mr-2 border border-black ${color}`}
            ></div>
            <span className="w-max">{colorPhone}</span>
          </div>
          <span className="badge badge-outline text-xs">{memory}</span>
        </div>
        {/* //para desktok */}
        <div
          onClick={() => router.push(link)}
          className="flex-col mb-3 text-left my-6 gap-2 hidden lg:flex"
        >
          <div className="flex justify-between items-center text-xs">
            <span>Preço comum:</span>
            <span className="opacity-80 line-through decoration-red-600">
              R$ {moneyMask(averagePrice.toString())}
            </span>
          </div>
          <div className="flex justify-between items-center text-base">
            <span className="text-xs">Nosso Preço:</span>
            <span className="text-success font-semibold">
              R${moneyMask(price.toString())}
            </span>
          </div>
        </div>
        {/* //para mobile */}
        <div
          onClick={() => router.push(link)}
          className="flex flex-col gap-1 lg:hidden"
        >
          <div className="flex flex-col">
            <span className="text-xs">Preço comum:</span>
            <span className="opacity-40 line-through decoration-red-600">
              {moneyMask(averagePrice.toString())}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs">Nosso preço: </span>
            <span className="text-success font-semibold text-base">
              R$ {moneyMask(price.toString())}
            </span>
          </div>
        </div>
        <div className="card-actions flex-col items-center">
          <button
            className="btn btn-info text-white w-full upper-case text-xs md:text-md py-0"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(id)}
          >
            Adicionar
          </button>
        </div>
        <Link href={link} passHref>
          <a className="text-xs link">Saiba mais</a>
        </Link>
      </div>
    </div>
  )
}
export default ProductCard
