import {
  faAngleRight,
  faArrowRight,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { apiStore } from '../../services/api'
import { setCookies } from '../../utils/useCookies'
import { TotalPayment } from '../../components/TotalPayment'
import { faMap } from '@fortawesome/free-regular-svg-icons'
import { PersistentLogin } from '../../utils/PersistentLogin'
import { Input } from '../../components/InputElement'
import { mascaraCep } from '../../utils/masks'

type GetCepTypes = {
  cep: string
}

type userJsonTypes = {
  userJson: {
    name: string
    id: number
    type: number
  }
}

export interface Address {
  address: string
  city: string
  complement: string | null
  created_at: string
  id: number
  neighborhood: string
  number: number
  postal_code: string
  uf: string
  updated_at: string
  user_id: number
}

export default function Shipping({ userJson }: userJsonTypes) {
  const [Address, setAddress] = useState<Address[]>([])

  async function handleRemoveAddress(id: number) {
    try {
      setAddress((oldState) => oldState.filter((Address) => Address.id !== id))
      await apiStore.delete(`addresses/${id}`)
    } catch (error) {
      return
    }
  }

  useEffect(() => {
    getAddress()
  }, [])

  const getAddress = async () => {
    const userAddress = await apiStore.get(`addresses/user/${userJson.id}`)
    setAddress(userAddress.data)
  }

  const router = useRouter()
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
      const response = await apiStore.get(`addresses/cep/${cep}`)
      if (response.data.Message === 'CEP NAO ENCONTRADO') {
        toast.error('CEP não foi encontrado')
        return
      }
      setCookies('@BuyPhone:GetCep', response.data, 60 * 60)
      router.push('/shipping/address')
    } catch (error) {
      toast.error('Erro no servidor, entre em contato com o suporte')
    }
  }

  const handleAddressDefault = async (props: any) => {
    setCookies('@BuyPhone:GetCep', props, 60 * 60)
    router.push('/shipping/payment')
  }

  return (
    <>
      <div className="max-w-7xl mx-auto grid gap-3 px-4">
        <TotalPayment />

        <div>
          <h2 className="text-2xl md:text-3xl text-center font-medium my-6">
            Informações para a entrega
          </h2>
          <div className="flex flex-col items-center sm:items-start gap-4 my-6">
            <form
              onSubmit={handleSubmit(handleCepStorage)}
              className="flex flex-col justify-center items-center gap-4 w-full sm:w-6/12 mx-auto"
            >
              <h3 className="font-medium">
                Insira o CEP para ver as opções de entrega
              </h3>
              <Input
                {...register('cep')}
                type="text"
                label="CEP"
                maxLength={9}
                onKeyUp={(e) => mascaraCep(e.target, '#####-####')}
                error={errors.cep}
              />
              {formState.isSubmitting ? (
                <button
                  type="submit"
                  className="btn btn-info loading text-white self-end"
                >
                  Carregando{' '}
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-info text-white self-end"
                >
                  Avançar{' '}
                  <FontAwesomeIcon icon={faAngleRight} className="w-4 h-4" />
                </button>
              )}
            </form>

            <div className="mx-auto flex flex-col w-full items-center gap-4 sm:w-6/12">
              {Address.length >= 1 && (
                <h3 className="font-medium">Ou selecione um endereço abaixo</h3>
              )}
              {Address.map((ad) => {
                return (
                  <div key={ad.id} className="flex gap-2 w-full items-center">
                    <div className="w-full cursor-pointer">
                      <div
                        onClick={() =>
                          handleAddressDefault({
                            ...ad,
                          })
                        }
                        className="normal-case btn btn-sm text-info-content bg-transparent border-[1px] h-full leading-4 max-h-20 py-3 w-full gap-4 justify-between relative"
                      >
                        <div className="flex items-center gap-3 md:gap-8">
                          <FontAwesomeIcon
                            icon={faMap}
                            className="w-8 h-8"
                          ></FontAwesomeIcon>
                          <div className="flex flex-col items-start text-start text-xs font-medium">
                            <span className="font-bold">{`${ad.address}, ${ad.number}`}</span>
                            <span>{ad.neighborhood}</span>
                            <span>{`${ad.city} ${ad.uf}`}</span>
                          </div>
                        </div>
                        <FontAwesomeIcon
                          icon={faAngleRight}
                          className="w-4 h-4 hidden md:block"
                        ></FontAwesomeIcon>
                      </div>
                    </div>
                    <FontAwesomeIcon
                      onClick={() => handleRemoveAddress(ad.id)}
                      icon={faTrash}
                      className="w-5 h-5 cursor-pointer text-red-600"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = PersistentLogin(async (ctx) => {
  const { '@BuyPhone:cart': cartCookies } = parseCookies(ctx)
  const { '@BuyPhone:User': userCookies } = parseCookies(ctx)

  if (cartCookies === '[]') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  if (userCookies) {
    const userJson = JSON.parse(userCookies)
    return {
      props: { userJson },
    }
  }

  return {
    props: {},
  }
}, '/shipping')
