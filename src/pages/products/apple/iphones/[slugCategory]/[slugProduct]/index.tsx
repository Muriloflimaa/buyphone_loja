import {
  faFacebook,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import {
  faChevronLeft,
  faCircleExclamation,
  faEnvelope,
  faLocationDot,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { yupResolver } from '@hookform/resolvers/yup'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Input } from '../../../../../../components/InputElement'
import { useCart } from '../../../../../../context/UseCartContext'
import { apiStore } from '../../../../../../services/api'
import { IProduct } from '../../../../../../types'
import { mascaraCep, moneyMask } from '../../../../../../utils/masks'
import { refact } from '../../../../../../utils/RefctDescript'
import { ToastCustom } from '../../../../../../utils/toastCustom'
import InnerImageZoom from 'react-inner-image-zoom'
import { verificationPrice } from '../../../../../../utils/verificationPrice'

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
  const [showMore, setShowMore] = useState(false)
  const [onShare, setOnShare] = useState(false)
  const returnPrice = verificationPrice(data)
  const [description, setDescrition] = useState('')
  const [address, setAddress] = useState<addressTypes>()
  const [shippingOn, setShippingOn] = useState<shippingOnTypes>()
  const [url, setUrl] = useState('')
  const resultDiscount = returnPrice.averagePrice - returnPrice.ourPrice
  const resultDiscountPercent = (
    (resultDiscount / returnPrice.averagePrice) *
    100
  ).toFixed(1)

  useEffect(() => {
    geturl()
    // setColor(verificationColor(data.color))
    if (data.description) {
      setDescrition(data.description)
    }
  }, [])

  const { addProduct } = useCart()

  function handleAddProduct(id: number) {
    addProduct(id)
  }

  function geturl() {
    setUrl(window.location.href.toString())
  }

  const getCepSchema = yup.object().shape({
    cep: yup
      .string()
      .required('Campo CEP é obrigatório')
      .min(9, 'CEP precisa ter 8 caracteres'),
  })

  const { register, handleSubmit, formState } = useForm<GetCepTypes>({
    resolver: yupResolver(getCepSchema),
  })

  const { errors } = formState

  const handleCepStorage: SubmitHandler<GetCepTypes> = async (value, event) => {
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
        <meta
          property="og:image"
          content={data.media && data.media[0].original_url}
        />
        <meta property="og:image:type" content="image/png"></meta>
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:url" content={url}></meta>
        <meta property="og:locale" content="pt_BR"></meta>
        <meta
          property="og:description"
          content="Na BuyPhone você encontra iPhones pelo melhor preço, com entrega rápida e frete grátis!"
        ></meta>
        <meta
          property="og:title"
          content={`BuyPhone - ${
            data.name + ' Apple ' + data.memory + ' ' + data.color
          }`}
        ></meta>
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
            {data.media &&
              data.media.map((res) => {
                return <Image src={res.original_url} width={60} height={75} />
              })}

            <ChevronDownIcon className="w-5 h-5 text-info-content" />
          </div>

          <div className="w-full h-full flex justify-center md:justify-start col-span-2 relative">
            <div className="hidden md:block">
              {data.media && (
                <InnerImageZoom
                  src={data.media[0].original_url}
                  zoomSrc={data.media[0].original_url}
                  width={300}
                  height={350}
                  hideHint
                  zoomPreload
                  zoomType="hover"
                />
              )}
            </div>
            <div className="md:hidden">
              {data.media && (
                <Image
                  src={data.media[0].original_url}
                  layout="fixed"
                  width="240"
                  height="300"
                  priority={true}
                />
              )}
            </div>
            <div className="absolute right-0 md:right-4 -top-10">
              <div className="flex flex-col">
                <div
                  onClick={() => setOnShare(!onShare)}
                  className="btn hover:bg-transparent btn-ghost md:hover:rotate-[360deg] transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    />
                  </svg>
                </div>

                <div
                  className={
                    'transition-all duration-300 flex-col ' +
                    (!onShare ? 'opacity-0 hidden' : 'flex opacity-100')
                  }
                >
                  <a
                    href={`https://api.whatsapp.com/send?text=${url}`}
                    target={'_blank'}
                  >
                    <div className="btn hover:bg-transparent btn-ghost md:hover:rotate-[360deg] transition-all duration-300">
                      <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6" />
                    </div>
                  </a>
                  <a href={`mailto:?subject=${url}`} target={'_blank'}>
                    <div className="btn hover:bg-transparent btn-ghost md:hover:rotate-[360deg] transition-all duration-300">
                      <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
                    </div>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer.php?u=${url}`}
                    target={'_blank'}
                  >
                    <div className="btn hover:bg-transparent btn-ghost md:hover:rotate-[360deg] transition-all duration-300">
                      <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
                    </div>
                  </a>
                  <a
                    href={`https://twitter.com/share?url=${url}`}
                    target={'_blank'}
                  >
                    <div className="btn hover:bg-transparent btn-ghost md:hover:rotate-[360deg] transition-all duration-300">
                      <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 text-info-content w-full col-span-2">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl font-medium">
                  {data.name} Apple {data.color} {data.memory}
                </h1>

                <span className="badge bg-[#F8F5BD] border-transparent rounded-xl text-xs font-medium p-3 mt-2 uppercase text-[#E1BF70]">
                  PARCELAMENTO EM&nbsp;
                  <span className="text-[#CF9836]">ATÉ 12X</span>
                </span>

                {/* <div className="flex items-center  mt-2 text-xs">
                  <StarIcon className="w-5 h-5 text-yellow-500"></StarIcon>
                  <p>4.9 (1234) comentários</p>
                </div> */}
              </div>

              <div>
                <h1 className="text-xl">Especificações</h1>
                <div className="flex gap-4 mt-2">
                  <span className="badge p-4 rounded-xl bg-transparent border border-info-content text-info-content">
                    {data.memory}
                  </span>
                  <span className="badge p-4 rounded-xl bg-transparent border border-info-content text-info-content">
                    {data.color}
                  </span>
                </div>
              </div>

              <div>
                {returnPrice.averagePrice > 0 && (
                  <>
                    <h1 className="opacity-80 line-through decoration-red-600">
                      {moneyMask(returnPrice.averagePrice.toString())}
                    </h1>
                    <div className="flex items-center gap-2">
                      <h2 className="text-3xl font-bold">
                        {moneyMask(returnPrice.ourPrice.toString())}
                      </h2>
                      <span className="badge py-3 px-[7px] border-transparent bg-[#D5FDC7] rounded-xl badge-warning text-[#8DC679] font-medium">
                        -{resultDiscountPercent.replace('.0', '')}%
                      </span>
                    </div>
                  </>
                )}
              </div>
              {returnPrice.averagePrice > 0 && (
                <div className="badge border-transparent bg-[#D5FDC7] rounded-xl text-xs font-semibold p-3 uppercase">
                  <span className="text-[#8DC679]">
                    economia de{' '}
                    <span className="text-[#327434]">
                      R$ {moneyMask(resultDiscount.toString())}
                    </span>
                  </span>
                </div>
              )}
              {returnPrice.averagePrice > 0 && (
                <button
                  className="btn border-transparent bg-success w-full text-white"
                  data-testid="add-product-button"
                  onClick={() => handleAddProduct(data.id)}
                >
                  Adicionar ao carrinho
                </button>
              )}

              {returnPrice.averagePrice <= 0 && (
                <div className="alert items-start w-full flex flex-col border-[1px] border-[#00000014] bg-accent text-info-content">
                  <div className="flex flex-col text-start items-start gap-3 my-3">
                    <div className="flex gap-2 text-start items-center bg-info/30 rounded-lg p-2">
                      <FontAwesomeIcon
                        icon={faCircleExclamation}
                        className="w-5 h-5"
                      />

                      <span className="text-xs">
                        Infelizmente não temos esse produto em estoque no
                        momento.
                      </span>
                    </div>
                    <p className="font-semibold text-2xl">Seja notificado!</p>
                    <p className="text-info-content/50 text-sm">
                      Assim que o produto estiver disponível em nosso site,
                      iremos encaminhar um email para você! Fique atento.
                    </p>

                    <div className="flex gap-3 w-full items-end">
                      <div className="flex flex-col gap-2 w-full">
                        <input
                          className="input input-bordered w-full"
                          placeholder="Nome"
                        />
                        <input
                          className="input input-bordered w-full"
                          placeholder="E-mail"
                        />
                      </div>

                      <label className="btn btn-info text-white">Enviar</label>
                    </div>
                  </div>
                </div>
              )}

              <div className="alert items-start w-full flex flex-col border-[1px] border-[#00000014] bg-accent text-info-content">
                <h1 className="text-base font-semibold">
                  Calcule o frete e prazo de entrega
                </h1>
                <form
                  className="flex flex-col md:flex-row items-start gap-2"
                  onSubmit={handleSubmit(handleCepStorage)}
                >
                  <Input
                    {...register('cep')}
                    type="text"
                    maxLength={9}
                    placeholder="00000-000"
                    onKeyUp={(e) => mascaraCep(e.target, '#####-####')}
                    error={errors.cep}
                  />
                  {formState.isSubmitting ? (
                    <button
                      type="submit"
                      className="btn loading normal-case text-white"
                    >
                      Carregando
                    </button>
                  ) : (
                    <button
                      className="btn btn-info text-white upper-case text-xs md:text-md py-0"
                      type="submit"
                    >
                      Consultar
                    </button>
                  )}
                </form>
                <div className="flex flex-col items-start md:text-xs">
                  {address && (
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="w-4 h-4"
                      />
                      <p>
                        {`${address?.Street && address?.Street + '-'} ${
                          address?.City
                        }, ${address?.UF}`}
                      </p>
                    </div>
                  )}

                  {shippingOn && (
                    <div className="flex justify-between items-start w-full text-success">
                      <p className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faTruckFast}
                          className="w-4 h-4"
                        />
                        {`Chegará grátis em até ${shippingOn?.days} dias úteis`}
                      </p>
                    </div>
                  )}
                </div>
              </div>

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
        {/* <div className="flex-col my-5 gap-3 text-info-content flex">
          <div className="alert bg-accent border-[1px] border-[#00000014] items-center justify-start gap-1 md:flex-col md:items-start md:flex">
            <h1 className="text-base font-medium">
              Avaliações de clientes
              <span className="text-[10px] pl-1 font-normal">
                (300 avaliações)
              </span>
            </h1>
          </div>
          <Rating />
        </div> */}
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
