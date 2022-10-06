import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChevronDownIcon, StarIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Rating from '../../../../../../components/Rating'
import { useCart } from '../../../../../../context/UseCartContext'
import { apiPedidos } from '../../../../../../services/apiClient'
import { IProduct } from '../../../../../../types'
import { GetUseType } from '../../../../../../utils/getUserType'
import { moneyMask } from '../../../../../../utils/masks'
import { refact } from '../../../../../../utils/RefctDescript'
import { verificationColor } from '../../../../../../utils/verificationColors'
import { verificationPrice } from '../../../../../../utils/verificationPrice'

interface IParams {
  params: {
    slugCategory: string
    slugProduct: string
  }
}

interface DataProps {
  data: {
    data: IProduct
  }
}

export default function Products({ data }: DataProps) {
  const [color, setColor] = useState<string | undefined>()
  const [showMore, setShowMore] = useState(false)
  const user = GetUseType()
  const returnPrice = verificationPrice(data.data, user)
  const [description, setDescrition] = useState('')

  useEffect(() => {
    setColor(verificationColor(data.data.color))
    if (data.data.description) {
      setDescrition(data.data.description)
    }
  }, [])

  const { addProduct } = useCart()

  function handleAddProduct(id: number) {
    addProduct(id)
  }

  return (
    <>
      <Head>
        <title>
          BuyPhone -{' '}
          {data.data.name +
            ' Apple ' +
            data.data.memory +
            ' ' +
            data.data.color}
        </title>
      </Head>
      <div className="max-w-4xl mx-auto p-4 my-4 w-full">
        <h1 className="font-medium flex items-start gap-2">
          <Link href={'/'} passHref>
            <a className="flex items-center normal-case lg:gap-2 my-2">
              <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
              Detalhes
            </a>
          </Link>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-5">
          <div className="flex-col items-center gap-3 hidden md:flex col-span-1">
            <Image
              src={data.data.media[0].original_url}
              width={60}
              height={75}
            />
            <Image
              src={data.data.media[0].original_url}
              width={60}
              height={75}
            />
            <Image
              src={data.data.media[0].original_url}
              width={60}
              height={75}
            />

            <ChevronDownIcon className="w-5 h-5 text-info-content" />
          </div>

          <div className="w-full h-full flex justify-start col-span-2">
            <Image
              src={data.data.media[0].original_url}
              layout="fixed"
              width="260"
              height="350"
              priority={true}
            ></Image>
          </div>
          <div className="flex flex-col gap-5 text-info-content w-full col-span-2">
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="text-2xl">
                  {data.data.name} Apple {data.data.color} {data.data.memory}
                </h1>

                <div className="flex items-center  mt-2 text-xs">
                  <StarIcon className="w-5 h-5 text-yellow-500"></StarIcon>
                  <p>4.9 (1234) comentários</p>
                </div>
              </div>

              <div>
                <h1 className="text-2xl">Especificações</h1>
                <div className="flex gap-3 mt-2">
                  <span className="badge p-3 bg-transparent border border-info-content text-info-content">
                    {data.data.memory}
                  </span>
                  <span className="badge p-3 bg-transparent border border-info-content text-info-content">
                    {data.data.color}
                  </span>
                </div>
              </div>

              <div>
                <h1 className="opacity-80 line-through decoration-red-600">
                  R$ {moneyMask(returnPrice.averagePrice.toString())}
                </h1>
                <h2 className="text-2xl font-bold">
                  R$ {moneyMask(returnPrice.ourPrice.toString())}
                </h2>
              </div>

              <div className="hidden md:flex gap-3 items-center">
                <button
                  className="btn btn-primary text-white"
                  data-testid="add-product-button"
                  onClick={() => handleAddProduct(data.data.id)}
                >
                  Adicionar
                </button>
              </div>
              <div className="alert md:p-0 bg-accent border-[1px] border-[#00000014]  text-info-content flex items-start justify-start gap-4 flex-col md:flex-row  md:gap-2">
                <div className="alert items-start md:items-center bg-accent border-[1px] border-accent">
                  <span>
                    Frete: Grátis
                    <span className="text-xs"> (10 a 15 dias úteis)</span>
                  </span>
                </div>
                <div className="flex md:block gap-3 items-center">
                  <button
                    className="btn btn-info block md:hidden text-white"
                    data-testid="add-product-button"
                    onClick={() => handleAddProduct(data.data.id)}
                  >
                    Adicionar
                  </button>
                </div>

                <div className="alert items-start bg-accent w-full grid md:hidden">
                  <h1 className="text-xl font-light">Descrição</h1>

                  <div className="transition-all flex flex-col text-xs">
                    {showMore
                      ? refact(description)
                      : `${description.substring(0, 150)}` + '...'}
                  </div>

                  <div className="flex flex-col w-full justify-center">
                    <div className="divider w-full"></div>
                    <span
                      className="transition-all duration-500"
                      onClick={() => setShowMore(!showMore)}
                    >
                      {showMore ? 'Ver menos' : 'Ver tudo'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col my-5 gap-3 text-info-content hidden md:flex ">
          <div className="alert bg-accent border-[1px] border-[#00000014] hidden items-center justify-start gap-1 md:flex-col md:items-start md:flex">
            <h1 className="text-base font-medium">Descrição</h1>
          </div>
          <div className="text-sm px-4 text-info-content">
            {description ? refact(description) : 'Sem descrição'}
          </div>
        </div>
        <div className="flex-col my-5 gap-3 text-info-content flex">
          <div className="alert bg-accent border-[1px] border-[#00000014] items-center justify-start gap-1 md:flex-col md:items-start md:flex">
            <h1 className="text-base font-medium">
              Avaliações de clientes
              <span className="text-[10px] pl-1 font-normal">
                (300 avaliações)
              </span>
            </h1>
          </div>
          <Rating />
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({ params }: IParams) => {
  try {
    const data = await apiPedidos.get(
      `products/${params.slugCategory}/${params.slugProduct}`
    )
    return {
      props: {
        data: data.data,
      },
      revalidate: 60 * 30, //30 minutos, se omitir o valor de revalidate, a página nao atualizará,
    }
  } catch (error) {
    return { props: {} }
  }
}

export const getStaticPaths = async () => {
  try {
    const { data } = await apiPedidos.get(`products/`)
    const paths = data.data.map((product: IProduct) => ({
      params: {
        slugCategory: product.category_slug.replace('-3-geracao', ''),
        slugProduct: product.slug,
      },
    }))

    return {
      paths,
      fallback: false,
    }
  } catch (error) {
    return {}
  }
}
