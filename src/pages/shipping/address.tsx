import { parseCookies } from 'nookies'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { apiStore } from '../../services/api'
import { GetUseType } from '../../utils/getUserType'
import toast from 'react-hot-toast'
import { TotalPayment } from '../../components/TotalPayment'
import { setCookies } from '../../utils/useCookies'
import { PersistentLogin } from '../../utils/PersistentLogin'
import ProductCart from '../../components/ProductCart'
import React, { useEffect, useState } from 'react'
import { useCart } from '../../context/UseCartContext'
import { moneyMask } from '../../utils/masks'
import { Input } from '../../components/InputElement'

interface CepJsonProps {
  cepJson: {
    CEP: string
    City: string
    District: string
    Message: string
    Street: string
    UF: string
    uf: string
    address: string
    neighborhood: string
    city: string
    postal_code: string
  }
}

type GetCepTypes = {
  street: string
  district: string
  CEP: string
  complement: string
  city: string
  state: string
}

export default function address({ cepJson }: CepJsonProps) {
  const router = useRouter()
  const user = GetUseType()
  const { values, somaTotal } = useCart()
  const [cartSize, setCartSize] = useState<number>()

  useEffect(() => {
    if (values) {
      setCartSize(values.length)
    }
  }, [values])

  const SaveAddressSchema = yup.object().shape({
    address: yup.string().required('Campo endereço é obrigatório'),
    neighborhood: yup.string().required('Campo bairro é obrigatório'),
    number: yup.string().required('Campo número é obrigatório'),
    complement: yup.string(),
    city: yup.string().required('Campo cidade é obrigatório'),
    uf: yup.string().required('Campo estado é obrigatório'),
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(SaveAddressSchema),
  })

  const { errors } = formState

  const handleAddress: SubmitHandler<GetCepTypes | any> = async (
    values,
    event
  ) => {
    event?.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const { data } = await apiStore.post(`addresses`, {
        ...values,
        user_id: user.id,
        postal_code: cepJson.CEP ?? cepJson.postal_code,
      })

      setCookies('@BuyPhone:GetCep', data, 60 * 60)
      router.push('/shipping/payment')
    } catch (error) {
      console.log(error)
      toast.error('Erro no servidor, entre em contato com o suporte')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 grid">
      <TotalPayment />
      <div>
        <h2 className="text-2xl md:text-3xl font-medium text-center my-6">
          Informações para a entrega
        </h2>
        <div className="flex flex-col-reverse lg:flex-row mx-auto my-12 gap-4">
          <div className="flex flex-col w-full">
            <h3 className="font-medium">Preencha os campos abaixo</h3>
            <form onSubmit={handleSubmit(handleAddress)} className="my-6">
              <Input
                {...register('address')}
                type="text"
                label="Endereço"
                defaultValue={cepJson?.Street ?? cepJson?.address}
                error={errors.address}
              />
              <Input
                {...register('neighborhood')}
                type="text"
                label="Bairro"
                defaultValue={cepJson?.District ?? cepJson?.neighborhood}
                error={errors.neighborhood}
              />
              <Input
                {...register('number')}
                type="text"
                label="Número"
                error={errors.number}
              />
              <Input
                {...register('complement')}
                type="text"
                label="Complemento"
                error={errors.complement}
              />
              <Input
                {...register('city')}
                type="text"
                label="Cidade"
                defaultValue={cepJson?.City ?? cepJson?.city}
                error={errors.city}
              />
              <Input
                {...register('uf')}
                type="text"
                label="Estado"
                defaultValue={cepJson?.UF ?? cepJson?.uf}
                error={errors.uf}
              />
              <div className="flex justify-end">
                <div className="form-control max-w-fit mt-4">
                  <button type="submit" className="btn btn-info font-medium">
                    Avançar
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="card card-compact bg-base-100 shadow w-full h-fit">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <span className="text-lg uppercase">Meu Carrinho</span>
                <span className="font-thin text-xs">
                  {cartSize && cartSize > 1
                    ? cartSize + ' itens'
                    : cartSize == 1
                    ? cartSize + ' item'
                    : 'Carrinho está vazio'}
                </span>
              </div>
            </div>
            <div className="card-body">
              {cartSize && cartSize > 0 ? (
                values.map(
                  (res) =>
                    res.id && (
                      <React.Fragment key={res.id}>
                        <ProductCart
                          id={res.id}
                          amount={res.amount}
                          name={res.product.name}
                          color={res.product.color}
                          price={res.subTotal}
                          memory={res.product.memory}
                          image={res.product.media[0].original_url}
                        />
                      </React.Fragment>
                    )
                )
              ) : (
                <div className="flex gap-3">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <h1>Carregando...</h1>
                </div>
              )}
            </div>
            <div className="card-body bg-base-200">
              <div className="flex justify-between py-4">
                <span className="text-gray-500 text-lg">Valor Total:</span>
                <span className="font-semibold text-lg">
                  R$ {moneyMask(somaTotal.toString())}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = PersistentLogin(async (ctx) => {
  const { '@BuyPhone:GetCep': cepCookies } = parseCookies(ctx)
  const { '@BuyPhone:cart': cartCookies } = parseCookies(ctx)

  if (cartCookies === '[]') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  if (cepCookies) {
    const cepJson = JSON.parse(cepCookies)
    return {
      props: { cepJson },
    }
  }

  return {
    props: {},
  }
}, '/shipping/address')
