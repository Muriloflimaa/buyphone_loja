import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { moneyMask } from '../../utils/masks'
import { verificationColor } from '../../utils/verificationColors'
import CountDownComponent from '../CountDownComponent'

interface ProductRelationProps {
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
  blackfriday?: number | boolean
}

const ProductRelationCard = ({
  id,
  name,
  colorPhone,
  averagePrice,
  price,
  image,
  slug,
  slugCategory,
  memory,
  blackfriday,
}: ProductRelationProps) => {
  const [color, setColor] = useState<string | undefined>()

  const link = `/products/apple/iphones/${slugCategory}/${slug}`

  useEffect(() => {
    setColor(verificationColor(colorPhone))
  }, [])

  const router = useRouter()

  return (
    <>
      <div
        className="card card-compact m-12 cursor-pointer w-full max-w-[300px] max-h-[430px] min-h-[430px] mx-auto text-info-content bg-accent shadow-black md:hover:shadow-2xl md:hover:drop-shadow-lg md:hover:scale-105 transition-all duration-200 relative overflow-visible rounded-lg"
        key={id}
      >
        <div
          onClick={() => router.push(link)}
          className="card-body text-center flex flex-col justify-between gap-5"
        >
          <div>
            {process.env.NEXT_PUBLIC_BLACK_FRIDAY &&
              !!JSON.parse(process.env.NEXT_PUBLIC_BLACK_FRIDAY) &&
              blackfriday == 1 && (
                <CountDownComponent
                  text=" text-xs "
                  width=" w-full max-w-[200px] mx-auto "
                />
              )}
            <div className="w-[50%] mx-auto">
              {image ? (
                <Image
                  src={image}
                  className="object-contain"
                  width={250}
                  height={350}
                />
              ) : null}
            </div>
            <div className="mb-2">
              <h2 className="card-title text-base justify-center flex-col font-medium">
                {name}
              </h2>
              <div className="flex flex-wrap gap-2 justify-center">
                <div className="badge badge-outline text-xs h-auto">
                  <div
                    className={`h-2 w-2 rounded-full mr-2 border border-black ${color}`}
                  ></div>
                  <span className="w-max">{colorPhone}</span>
                </div>
                <span className="badge badge-outline text-xs">{memory}</span>
              </div>
            </div>
          </div>

          {/* //para mobile */}
          {price > 0 && (
            <div className="flex flex-col gap-1">
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
          )}

          {price <= 0 && (
            <div className="flex flex-col gap-1">
              <div className="flex flex-col">
                <span className="text-xs">Preço comum:</span>
                <span className="opacity-40 line-through decoration-red-600">
                  Conferir Produto
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs">Nosso preço: </span>
                <span className="text-success font-semibold text-base">
                  Conferir Produto
                </span>
              </div>
            </div>
          )}

          <Link href={link} passHref>
            <a className="text-xs link">Saiba mais</a>
          </Link>
        </div>
      </div>
    </>
  )
}
export default ProductRelationCard
