import {
  faChevronLeft,
  faLocationDot,
  faTruckFast,
  faClock,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChevronDownIcon, StarIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Input } from '../../../../../../components/InputElement'
import Rating from '../../../../../../components/Rating'
import { useCart } from '../../../../../../context/UseCartContext'
import { apiStore } from '../../../../../../services/api'
import { IProduct } from '../../../../../../types'
import { GetUseType } from '../../../../../../utils/getUserType'
import { mascaraCep, moneyMask } from '../../../../../../utils/masks'
import { refact } from '../../../../../../utils/RefctDescript'
import { verificationPrice } from '../../../../../../utils/verificationPrice'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ToastCustom } from '../../../../../../utils/toastCustom'

interface IParams {
  params: {
    slugCategory: string
    slugProduct: string
  }
}

interface DataProps {
  data: IProduct
}

type GetCepTypes = {
  cep: string
}

type addressTypes = {
  CEP: string
  City: string
  District: string
  Street: string
  UF: string
}

type shippingOnTypes = {
  delivered_by: string
  days: string
}

export default function Products({ data }: DataProps) {
  // const [color, setColor] = useState<string | undefined>()
  const [showMore, setShowMore] = useState(false)
  const user = GetUseType()
  const returnPrice = verificationPrice(data, user)
  const [description, setDescrition] = useState('')
  const [address, setAddress] = useState<addressTypes>()
  const [shippingOn, setShippingOn] = useState<shippingOnTypes>()

  useEffect(() => {
    // setColor(verificationColor(data.color))
    if (data.description) {
      setDescrition(data.description)
    }
  }, [])

  const { addProduct } = useCart()

  function handleAddProduct(id: number) {
    addProduct(id)
  }

  const getCepSchema = yup.object().shape({
    cep: yup
      .string()
      .required('Campo CEP é obrigatório')
      .min(9, 'CEP precisa ter 8 caracteres'),
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(getCepSchema),
  })

  const { errors } = formState

  const handleCepStorage: SubmitHandler<GetCepTypes | any> = async (
    value,
    event
  ) => {
    event?.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const cep = value.cep.replace('-', '')
    try {
      const infoShippingSend = {
        cep: cep,
        total: returnPrice.averagePrice,
        qtd_items: 1,
      }

      const { data } = await apiStore.get(`addresses/cep/${cep}`)
      const shipping = await apiStore.post(`shipping`, infoShippingSend)
      if (data.Message === 'CEP NAO ENCONTRADO') {
        ToastCustom(2000, 'CEP não foi encontrado', 'error')
        return
      }
      setShippingOn(shipping.data)
      setAddress(data)
    } catch (error) {
      ToastCustom(
        2000,
        'Erro no servidor, entre em contato com o suporte',
        'error'
      )
    }
  }

  return (
    <>
      <Head>
        <title>
          BuyPhone - {data.name + ' Apple ' + data.memory + ' ' + data.color}
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
              src={'https://pedidos.buyphone.com.br/media/3004/11-PRETO.webp'}
              width={60}
              height={75}
            />
            <Image
              src={'https://pedidos.buyphone.com.br/media/3004/11-PRETO.webp'}
              width={60}
              height={75}
            />
            <Image
              src={'https://pedidos.buyphone.com.br/media/3004/11-PRETO.webp'}
              width={60}
              height={75}
            />

            <ChevronDownIcon className="w-5 h-5 text-info-content" />
          </div>

          <div className="w-full h-full flex justify-center col-span-2">
            <Image
              src={'https://pedidos.buyphone.com.br/media/3004/11-PRETO.webp'}
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
                  {data.name} Apple {data.color} {data.memory}
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
                    {data.memory}
                  </span>
                  <span className="badge p-3 bg-transparent border border-info-content text-info-content">
                    {data.color}
                  </span>
                </div>
              </div>

              <div>
                <h1 className="opacity-80 line-through decoration-red-600">
                  {returnPrice.ourPrice <= 0
                    ? 'Sem estoque'
                    : 'R$' + moneyMask(returnPrice.averagePrice.toString())}
                </h1>
                <h2 className="text-2xl font-bold">
                  {returnPrice.ourPrice <= 0
                    ? 'Sem estoque'
                    : 'R$' + moneyMask(returnPrice.ourPrice.toString())}
                </h2>
              </div>

              <div>
                {returnPrice.ourPrice <= 0 ? (
                  <button className="btn btn-disabled text-white">
                    Sem estoque
                  </button>
                ) : (
                  <button
                    className="btn btn-primary text-white"
                    data-testid="add-product-button"
                    onClick={() => handleAddProduct(data.id)}
                  >
                    Adicionar
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit(handleCepStorage)}>
                <div className="alert items-start w-full bg-accent flex flex-col border-[1px] border-[#00000014] text-info-content">
                  <h1 className="text-base font-semibold">
                    Calcule o frete e prazo de entrega
                  </h1>
                  <div className="flex flex-col md:flex-row items-start gap-2">
                    <Input
                      {...register('cep')}
                      type="text"
                      maxLength={9}
                      placeholder="00000-000"
                      onChange={(e) => mascaraCep(e.target, '#####-####')}
                      error={errors.cep}
                    />
                    {formState.isSubmitting ? (
                      <button className="btn loading normal-case text-white">
                        Carregando
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary text-white normal-case"
                        type="submit"
                      >
                        Consultar
                      </button>
                    )}
                  </div>
                  {address && (
                    <div className="flex gap-2">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="w-5 h-5"
                      />
                      <p>
                        {`${address?.Street} - ${address?.City}, ${address?.UF}`}
                      </p>
                    </div>
                  )}

                  {shippingOn && (
                    <div className="flex justify-between items-start w-full">
                      <p className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faTruckFast}
                          className="w-4 h-4"
                        />
                        {shippingOn?.delivered_by}
                      </p>
                      <div className="text-end">
                        <p className="font-semibold flex items-center gap-2">
                          <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                          {`em até ${shippingOn?.days} dias úteis`}
                        </p>
                        <p className="text-success font-semibold">Grátis</p>
                      </div>
                    </div>
                  )}
                </div>
              </form>

              <div className="alert md:p-0 bg-accent border-[1px] border-[#00000014] text-info-content flex items-start justify-start gap-4 flex-col md:flex-row  md:gap-2 md:hidden">
                <div className="alert items-start bg-accent w-full grid ">
                  <h1 className="text-xl font-light">Descrição</h1>

                  <div className="transition-all flex flex-col items-start text-xs">
                    {showMore
                      ? refact(description)
                      : `${description.substring(0, 150)}` + '...'}
                  </div>

                  <div className="flex flex-col w-full justify-center ">
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
    const data = await apiStore.get(
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
    const { data } = await apiStore.get(`products/?per_page=200&page=1`)

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
