import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TrashIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCart } from '../../context/UseCartContext'
import { mascaraCep, moneyMask } from '../../utils/masks'
import { Input } from '../InputElement'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { apiStore } from '../../services/api'
import { ToastCustom } from '../../utils/toastCustom'
import { faLocationDot, faTruckFast } from '@fortawesome/free-solid-svg-icons'
import CountDownComponent from '../CountDownComponent'
import BlurImage from '../BlurImage'

interface ProductProps {
  id: number
  amount: number
  name: string
  color: string
  price: number
  memory: string
  image: string
  blackfriday?: number | boolean
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
  error: string
}

const ProductCart = ({
  id,
  amount,
  name,
  color,
  price,
  memory,
  image,
  blackfriday,
}: ProductProps) => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const { removeProduct, updateProductAmount } = useCart()
  const [address, setAddress] = useState<addressTypes>()
  const [shippingOn, setShippingOn] = useState<shippingOnTypes>()

  useEffect(() => {
    if (
      router.asPath == '/shipping' ||
      router.asPath == '/shipping/payment/pix' ||
      router.asPath == '/shipping/address' ||
      router.asPath == '/shipping/payment' ||
      router.asPath == '/shipping/payment/custom' ||
      router.asPath == '/shipping/payment/credit' ||
      router.asPath == '/shipping/payment/credit-checkout' ||
      router.asPath == '/shipping/payment/match-installments' ||
      router.asPath == '/shipping/payment/credit-finally'
    ) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [router]) //verificação de rota para setar padding

  function handleProductIncrement(productId: number, productAmount: number) {
    updateProductAmount({
      productId: productId,
      amount: productAmount + 1,
    })
  } //incrementa 1 produto

  function handleProductDecrement(productId2: number, productAmount: number) {
    updateProductAmount({
      productId: productId2,
      amount: productAmount - 1,
    })
  } //remove 1 amount do produto

  function handleRemoveProduct(
    productId: number,
    name: string,
    color: string,
    memory: string
  ) {
    removeProduct(productId, name, color, memory)
  } //remove produto do carrinho

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
        total: price,
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
    <div className="grid grid-cols-1 md:grid-cols-3 justify-between w-full">
      <div className="grid col-span-2 gap-3 text-primary">
        <div className="flex items-center gap-2">
          <div className="w-[125px] h-full flex items-center">
            <BlurImage
              src={image}
              className="object-contain"
              width={120}
              height={150}
              layout="fixed"
              priority
              alt={name}
            />
          </div>

          <div className="flex flex-col items-start gap-6 h-full">
            <div className="flex flex-col text-info-content">
              {process.env.NEXT_PUBLIC_BLACK_FRIDAY &&
                !!JSON.parse(process.env.NEXT_PUBLIC_BLACK_FRIDAY) &&
                blackfriday == 1 && <CountDownComponent text=" text-xs " />}
              <span>Modelo</span>
              <strong className="text-xl">{`${name} (${color}, ${memory})`}</strong>
            </div>
            <div className="flex flex-col gap-1 md:flex-row-reverse md:items-center md:gap-3">
              {!show && (
                <button
                  className="flex text-info-content items-center text-xs"
                  onClick={() => handleRemoveProduct(id, name, color, memory)}
                >
                  <TrashIcon className="h-4 w-4 text-red-600" />
                </button>
              )}
              <div className="flex items-center gap-2 text-info-content">
                <span>Quantidade</span>

                {!show && (
                  <div className="btn-group max-h-8 shadow-sm shadow-black/20 rounded-lg">
                    <button
                      className="btn btn-accent min-h-0 bg-[#9A9A9A]/10 text-xs h-auto p-2"
                      type="button"
                      disabled={amount <= 1}
                      onClick={() => handleProductDecrement(id, amount)}
                    >
                      -
                    </button>
                    <button className="btn btn-accent min-h-0 font-normal text-xs h-auto p-2">
                      {amount}
                    </button>
                    <button
                      className="btn btn-accent min-h-0 bg-[#9A9A9A]/10 text-xs h-auto p-2"
                      type="button"
                      onClick={() => handleProductIncrement(id, amount)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center items-start md:items-end">
        <div>
          <div className="p-3 items-start w-full flex flex-col text-info-content">
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
            <div className="flex flex-col gap-2 mt-2 items-start md:text-xs">
              {address && (
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" />
                  <p>
                    {`${address?.Street && address?.Street + ' -'} ${
                      address?.City
                    }, ${address?.UF}`}
                  </p>
                </div>
              )}

              {shippingOn && !shippingOn.error && (
                <div className="flex justify-between items-start w-full text-success">
                  <p className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faTruckFast} className="w-4 h-4" />
                    {`Chegará grátis em até ${shippingOn?.days} dias úteis`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCart
