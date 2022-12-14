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
import Carousel from 'better-react-carousel'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import InnerImageZoom from 'react-inner-image-zoom'
import * as yup from 'yup'
import CountDownComponent from '../../../../../../components/CountDownComponent'
import { Input } from '../../../../../../components/InputElement'
import ModalPaymentOptions from '../../../../../../components/Modals/PaymentOptions'
import ProductUnavailable from '../../../../../../components/Modals/SendInBlue/Notices/ProductUnavailable'
import ProductRelationCard from '../../../../../../components/ProductRelationCard'
import { useCart } from '../../../../../../context/UseCartContext'
import { IProduct } from '../../../../../../types'
import { maskCep, moneyMask } from '../../../../../../utils/masks'
import { refact } from '../../../../../../utils/RefctDescript'
import { ToastCustom } from '../../../../../../utils/toastCustom'
import { verificationPrice } from '../../../../../../utils/verificationPrice'

import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import PreviewGraphImg from '../../../../../../assets/images/previewGraph.webp'
import BlurImage from '../../../../../../components/BlurImage'
import { setCookies } from '../../../../../../utils/useCookies'
import axios from 'axios'
import { setupAPIClient } from '../../../../../../services/newApi/api'
import { GetServerSidePropsContext } from 'next'
import { AuthContext } from '../../../../../../context/AuthContext'
import { apiStore } from '../../../../../../services/api'

interface IParams {
  params: {
    slugCategory: string
    slugProduct: string
  }
  ctx: GetServerSidePropsContext
}

interface DataProps {
  data: IProduct
  categoryData: Array<IProduct>
  productGraphPrice: Array<{
    name: string
    americanas: number
    pontofrio: number
    casasbahia: number
    magazineluiza: number
  }>
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

export default function Products({
  data,
  categoryData,
  productGraphPrice,
}: DataProps) {
  const [showMore, setShowMore] = useState(false)
  const [onShare, setOnShare] = useState(false)
  const router = useRouter()
  const [openModalPaymentOption, setOpenModalPaymentOption] = useState(false)
  const [newProductGraphPrice, setNewProductGraphPrice] = useState<any>()
  const [installments, setInstallments] = useState()
  const [address, setAddress] = useState<addressTypes>()
  const [shippingOn, setShippingOn] = useState<shippingOnTypes>()
  const [url, setUrl] = useState('')
  const [isUser, setIsUser] = useState(false) //state para verificar se existe user
  const { user } = useContext(AuthContext)
  const returnPrice = verificationPrice(data, user, isUser)
  const resultDiscount = returnPrice.averagePrice - returnPrice.ourPrice
  const resultDiscountPercent = (
    (resultDiscount / returnPrice.averagePrice) *
    100
  ).toFixed(1)

  useEffect(() => {
    geturl()
  }, [])

  useEffect(() => {
    const newProductGraphInitial = productGraphPrice.map((product) => {
      const data: any = {
        //definido como any pois nao tem as propriedades de IProduct
        magalu_price: product.magazineluiza,
        americanas_price: product.americanas,
        casasbahia_price: product.casasbahia,
        ponto_price: product.pontofrio,
      }

      const returnPrice = verificationPrice(data, user, user ? true : false)

      let properties = {
        name: product.name,
        americanas: product.americanas,
        pontofrio: product.pontofrio,
        casasbahia: product.casasbahia,
        magazineluiza: product.magazineluiza,
        buyphone: returnPrice.ourPrice,
      }

      return properties
    })
    setNewProductGraphPrice(newProductGraphInitial)
  }, [user, data])

  useEffect(() => {
    if (user) {
      setIsUser(true)
    }
  }, [user]) //atualiza o state para nao dar erro de renderizacao

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
      .required('Campo CEP ?? obrigat??rio')
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

      const { data } = await axios.get(`/api/api/store/addresses/cep/${cep}`)
      const shipping = await axios.post(
        `/api/api/store/shipping`,
        infoShippingSend
      )
      if (data.Message === 'CEP NAO ENCONTRADO') {
        ToastCustom(2000, 'CEP n??o foi encontrado', 'error')
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

  useEffect(() => {
    async function handleDataInstallments() {
      if (returnPrice.ourPrice > 0) {
        try {
          const data = {
            amount: returnPrice.ourPrice,
          }

          const response = await apiStore.get(`/checkout/installments`, {
            params: data,
          })
          setInstallments(response.data)
        } catch (error) {}
      }
    }
    handleDataInstallments()
  }, [data])

  const CustomToolTip = (props: any) => {
    const { payload, label } = props

    return (
      <div className="rounded-md bg-white/90 font-medium">
        <p className="text-black border-b-[1px] bg-[#eceff1] border-[#ddd] p-[6px] rounded-t-md">
          <span className="text-xs font-normal">{label}</span>
        </p>
        <div className="p-2 text-xs font-normal text-black grid gap-2">
          {payload &&
            payload.map(
              (
                item: { value: string; name: string; stroke: string },
                i: number
              ) => {
                return (
                  <div className="flex items-center gap-1" key={i}>
                    <span
                      className={`h-3 w-3 rounded-full ${
                        (item.name == 'Casas Bahia' && 'bg-[#0026AE]') ||
                        (item.name == 'Magazine Luiza' && 'bg-[#4595DE]') ||
                        (item.name == 'Ponto Frio' && 'bg-[#ED981A]') ||
                        (item.name == 'Americanas' && 'bg-[#D33131]') ||
                        (item.name == 'BuyPhone' && 'bg-[#201942]')
                      }  `}
                    ></span>

                    <p key={i}>
                      {item.name}: <strong>R$ {moneyMask(item.value)}</strong>
                    </p>
                  </div>
                )
              }
            )}
        </div>
      </div>
    )
  }

  const renderLegend = (props: any) => {
    const { payload }: any = props

    return (
      <div className="flex justify-end w-full md:justify-center">
        <ul className="grid grid-cols-2 text-md md:flex md:gap-3">
          {payload.map((entry: any, index: any) => (
            <li key={`item-${index}`} className="flex items-center gap-1">
              <span
                className={`h-3 w-3 rounded-full ${
                  (entry.value == 'Casas Bahia' && 'bg-[#0026AE]') ||
                  (entry.value == 'Magazine Luiza' && 'bg-[#4595DE]') ||
                  (entry.value == 'Ponto Frio' && 'bg-[#ED981A]') ||
                  (entry.value == 'Americanas' && 'bg-[#D33131]') ||
                  (entry.value == 'BuyPhone' && 'bg-[#201942]')
                }  `}
              ></span>

              <p>{entry.value}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>
          BuyPhone - {data.name + ' Apple ' + data.memory + ' ' + data.color}
        </title>
        <meta
          property="og:image"
          content={data.media && data.media[0]?.original_url}
        />
        <meta property="og:image:type" content="image/png"></meta>
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:url" content={url}></meta>
        <meta property="og:locale" content="pt_BR"></meta>
        <meta
          property="og:description"
          content="Na BuyPhone voc?? encontra iPhones pelo melhor pre??o, com entrega r??pida e frete gr??tis!"
        ></meta>
        <meta
          property="og:title"
          content={`BuyPhone - ${
            data.name + ' Apple ' + data.memory + ' ' + data.color
          }`}
        ></meta>
      </Head>
      <div className="max-w-4xl mx-auto p-4 mt-4 w-full">
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
                return (
                  <Image
                    key={res.id}
                    src={res?.original_url}
                    width={60}
                    height={75}
                  />
                )
              })}

            <ChevronDownIcon className="w-5 h-5 text-info-content" />
          </div>

          <div className="w-full h-full flex justify-center md:justify-start col-span-2 relative">
            <div className="hidden md:block">
              {data.media && (
                <InnerImageZoom
                  src={data.media[0]?.original_url}
                  zoomSrc={data.media[0]?.original_url}
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
                  src={data.media[0]?.original_url}
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
                <div className="flex justify-center md:justify-start my-4 md:mb-2 md:my-0">
                  {process.env.NEXT_PUBLIC_BLACK_FRIDAY &&
                    !!JSON.parse(process.env.NEXT_PUBLIC_BLACK_FRIDAY) &&
                    data.blackfriday == 1 && (
                      <CountDownComponent
                        width=" w-2/4 md:w-3/4 "
                        text=" text-xs "
                      />
                    )}
                </div>
                <h1 className="text-2xl font-medium">
                  {data.name} Apple {data.color} {data.memory}
                </h1>
                <div className="flex flex-col">
                  <span className="badge bg-[#F8F5BD] border-transparent rounded-xl text-xs font-medium p-3 mt-2 uppercase text-[#E1BF70]">
                    PARCELAMENTO EM&nbsp;
                    <span className="text-[#CF9836]">AT?? 12X</span>
                  </span>
                </div>

                {/* <div className="flex items-center  mt-2 text-xs">
                  <StarIcon className="w-5 h-5 text-yellow-500"></StarIcon>
                  <p>4.9 (1234) coment??rios</p>
                </div> */}
              </div>

              <div>
                <h1 className="text-xl">Especifica????es</h1>
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
                      R$ {moneyMask(returnPrice.averagePrice.toString())}
                    </h1>
                    <div className="flex items-center gap-2">
                      <h2 className="text-3xl font-bold">
                        R$ {moneyMask(returnPrice.ourPrice.toString())}
                      </h2>
                      <span className="badge py-3 px-[7px] border-transparent bg-[#D5FDC7] rounded-xl badge-warning text-[#8DC679] font-medium">
                        -{resultDiscountPercent.replace('.0', '')}%
                      </span>
                    </div>
                    <span>Desconto v??lido no pix</span>
                    <span className="flex flex-col">
                      ou at??{' '}
                      {installments && Object.values(installments).length}x de{' '}
                      {installments &&
                        Object.values(installments)[
                          Object.values(installments).length - 1
                        ]}{' '}
                      <a
                        className="cursor-pointer underline"
                        onClick={() => setOpenModalPaymentOption(true)}
                      >
                        ver parcelamento
                      </a>
                    </span>
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
                        Infelizmente n??o temos disponibilidade desse produto no
                        momento.
                      </span>
                    </div>
                    <p className="font-semibold text-2xl">Seja notificado!</p>
                    <p className="text-info-content/50 text-sm">
                      Assim que o produto estiver dispon??vel em nosso site,
                      iremos encaminhar um email para voc??! Fique atento.
                    </p>

                    <div className="flex gap-3 w-full items-end">
                      <ProductUnavailable
                        nameProduct={`${data.category_slug} ${data.slug}`}
                      />
                    </div>
                  </div>
                </div>
              )}
              {returnPrice.averagePrice > 0 && (
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
                      onKeyUp={(e) => maskCep(e.target, '#####-####')}
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
                          {`Chegar?? gr??tis em at?? ${shippingOn?.days} dias ??teis`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="alert md:p-0 bg-accent border-[1px] border-[#00000014] text-info-content flex items-start justify-start gap-4 flex-col md:flex-row  md:gap-2 md:hidden">
                <div className="items-start bg-accent w-full grid ">
                  <h1 className="text-base font-semibold">Descri????o</h1>

                  <div className="transition-all flex flex-col items-start text-xs">
                    {data.description &&
                      (showMore
                        ? refact(data.description)
                        : `${(data.description
                            ? data.description
                            : ''
                          ).substring(0, 150)}` + '...')}
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
            <h1 className="text-base font-medium">Descri????o</h1>
          </div>
          <div className="text-sm px-4 text-info-content">
            {data.description ? refact(data.description) : 'Sem descri????o'}
          </div>
        </div>

        <div className="alert bg-accent border-[1px] border-[#00000014] text-info-content flex items-start justify-start gap-4 flex-col md:gap-2 mt-4 md:mt-10">
          <div className="flex flex-col items-start md:flex-row justify-start gap-[2px] md:items-center bg-accent w-full">
            <span className="text-base font-semibold md:text-base md:font-medium">
              Acompanhamento de pre??o
            </span>
            <span className="text-xs font-light">(14 dias)</span>
          </div>
        </div>

        {isUser && user ? (
          isUser && (
            <div className="my-10" style={{ width: '100%', height: 350 }}>
              <ResponsiveContainer>
                <AreaChart
                  data={newProductGraphPrice}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="coloramericanas"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#D33131" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient
                      id="colorpontofrio"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#ED981A" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient
                      id="colorcasasbahia"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#0026AE" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient
                      id="colormagazineluiza"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#4595DE" stopOpacity={0.2} />
                    </linearGradient>
                    <linearGradient
                      id="colorbuyphone"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#201942" stopOpacity={0.2} />
                    </linearGradient>

                    {/* cor dos graficos acima */}
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis
                    tickFormatter={(value) =>
                      new Intl.NumberFormat('pt-BR', {
                        notation: 'compact',
                        compactDisplay: 'short',
                      }).format(value / 100)
                    }
                    type="number"
                    domain={[
                      (dataMin: number) => dataMin,
                      (dataMax: number) => dataMax + 100000,
                    ]}
                  />
                  <CartesianGrid vertical={false} strokeDasharray="0" />

                  <Tooltip
                    wrapperStyle={{
                      outline: 'none',
                    }}
                    content={<CustomToolTip />}
                  />

                  <Legend content={renderLegend} />

                  <Area
                    strokeWidth={4}
                    name="Ponto Frio"
                    type="monotone"
                    dataKey="pontofrio"
                    stroke="#ED981A"
                    fillOpacity={1}
                    fill="url(#colorpontofrio)"
                  />
                  <Area
                    strokeWidth={4}
                    name="Americanas"
                    type="monotone"
                    dataKey="americanas"
                    stroke="#D33131"
                    fillOpacity={1}
                    fill="url(#coloramericanas)"
                  />

                  <Area
                    strokeWidth={4}
                    name="Casas Bahia"
                    type="monotone"
                    dataKey="casasbahia"
                    stroke="#0026AE"
                    fillOpacity={1}
                    fill="url(#colorcasasbahia)"
                  />
                  <Area
                    strokeWidth={4}
                    name="Magazine Luiza"
                    type="monotone"
                    dataKey="magazineluiza"
                    stroke="#4595DE"
                    fillOpacity={1}
                    fill="url(#colormagazineluiza)"
                  />
                  <Area
                    strokeWidth={4}
                    name="BuyPhone"
                    type="monotone"
                    dataKey="buyphone"
                    stroke="#201942"
                    fillOpacity={1}
                    fill="url(#colorbuyphone)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )
        ) : (
          <div className="max-w-7xl mx-auto relative">
            <div className="w-[100%] blur mx-auto">
              <BlurImage
                src={PreviewGraphImg}
                layout="responsive"
                className="object-contain"
              />
            </div>
            <div className="absolute top-0 w-full h-full flex flex-col gap-8 justify-center text-center items-center">
              <h1 className="md:text-xl text-md font-medium text-info-content">
                Entre em sua conta para acompanhar os pre??os
              </h1>
              <Link href="/account/login">
                <button
                  onClick={() =>
                    setCookies('@BuyPhone:Router', router.asPath, 60 * 60)
                  }
                  className="btn btn-info text-white w-40"
                >
                  Entrar
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h1 className="md:text-4xl text-3xl font-medium text-center">
          Produtos relacionados
        </h1>

        <Carousel
          cols={categoryData.length >= 4 ? 4 : categoryData.length - 1}
          rows={1}
          gap={20}
          loop={true}
        >
          {categoryData.map((product) => {
            const returnPrice = verificationPrice(product, user, isUser)
            return (
              <Carousel.Item key={product.id}>
                <ProductRelationCard
                  id={product.id}
                  name={product.name}
                  colorPhone={product.color}
                  price={returnPrice.ourPrice}
                  averagePrice={returnPrice.averagePrice}
                  idCategory={product.id}
                  slug={product.slug}
                  slugCategory={data.category_slug}
                  image={product.media[0]?.original_url}
                  memory={product.memory}
                  blackfriday={product.blackfriday}
                />
              </Carousel.Item>
            )
          })}
        </Carousel>
      </div>
      {/* <div className="max-w-7xl mx-auto px-4 my-8">
        <div className="flex justify-center p-8 mb-10 bg-white rounded-lg">
          <div
            className="fb-comments"
            data-href="https://www.buyphone.com.br/"
            data-width="800"
            data-numposts="10"
          ></div>
        </div>
      </div>  */}
      <ModalPaymentOptions
        colorProduct={data.color}
        memoryProduct={data.memory}
        nameProduct={data.name}
        installmentsProduct={installments}
        isOpen={openModalPaymentOption}
        closeModal={(value) => setOpenModalPaymentOption(value)}
      />
    </>
  )
}

export const getStaticProps = async ({ params }: IParams) => {
  const api = setupAPIClient()
  try {
    const data = await api.get(
      `/store/products/${params.slugCategory}/${params.slugProduct}`
    )
    const categoryData = await api.get(
      `/store/categories/${params.slugCategory}?per_page=18`
    )

    const { data: productGraphPrice } = await api.get(
      `/report/prices/${data.data.id}`
    )

    return {
      props: {
        data: data.data,
        categoryData: categoryData.data.products,
        productGraphPrice: productGraphPrice,
      },
      revalidate: 60 * 30, //30 minutos, se omitir o valor de revalidate, a p??gina nao atualizar??,
    }
  } catch (error) {
    return { props: {} }
  }
}

export const getStaticPaths = async () => {
  const api = setupAPIClient()

  try {
    const { data } = await api.get(`/store/products?per_page=500`)

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
