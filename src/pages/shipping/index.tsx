import { faMapLocation, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { Input } from '../../components/InputElement'
import { apiStoreBeta } from '../../services/apiBetaConfigs'
import { setCookies } from '../../utils/useCookies'
import jwt_decode from 'jwt-decode'
import { TotalPayment } from '../../components/TotalPayment'

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
      await apiStoreBeta.delete(`addresses/${id}`)
    } catch (error) {
      toast.error('Ocorreu um erro no servidor, contate o suporte')
    }
  }

  useEffect(() => {
    const getAddress = async () => {
      const userAddress = await apiStoreBeta.get(
        `addresses/user/${userJson.id}`
      )
      setAddress(userAddress.data)
    }
    getAddress()
  }, [])

  const router = useRouter()
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
      const response = await apiStoreBeta.get(`addresses/cep/${cep}`)
      if (response.data.Message === 'CEP NAO ENCONTRADO') {
        toast.error('CEP não foi encontrado')
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
        <div className="divider"></div>

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
                max="9"
                mask="cep"
                error={errors.cep}
              />
              <button type="submit" className="link self-end text-info">
                Avançar <i className="fa fa-angle-right"></i>
              </button>
            </form>

            <div className="mx-auto flex flex-col w-full items-center gap-4 sm:w-6/12">
              {Address.length >= 1 && (
                <h3 className="font-medium">Ou selecione um endereço abaixo</h3>
              )}
              {Address.map((ad) => {
                console.log(ad)
                return (
                  <div key={ad.id} className="w-full cursor-pointer">
                    <div className="btn-primary p-4 flex text-sm items-center h-full max-h-20 py-3 w-full gap-4 justify-between rounded-md relative">
                      <div
                        onClick={() =>
                          handleAddressDefault({
                            ...ad,
                          })
                        }
                        className="w-5/6 h-full absolute"
                      ></div>
                      <FontAwesomeIcon
                        icon={faMapLocation}
                        className="w-8 h-8"
                      ></FontAwesomeIcon>
                      <div className="flex flex-col text-xs">
                        <span>{`${ad.address}, ${ad.number}`}</span>
                        <span>{ad.neighborhood}</span>
                        <span>{`${ad.city} ${ad.uf}`}</span>
                      </div>

                      <div className="dropdown drop-shadow-left dropdown-end">
                        <label tabIndex={ad.id} className="m-1 z-50 btn">
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="w-4 h-4"
                          ></FontAwesomeIcon>
                        </label>
                        <div
                          tabIndex={ad.id}
                          className="dropdown-content card card-compact p-2 shadow bg-primary text-primary-content"
                        >
                          <div className="card-body">
                            <h3 className="card-title">
                              Deseja excluir o endereço?
                            </h3>
                            <p
                              tabIndex={ad.id}
                              className="btn btn-primary"
                              onClick={() => handleRemoveAddress(ad.id)}
                            >
                              Sim
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const cookies = parseCookies(ctx)

  //se existe um token entrar aqui!
  if (cookies['@BuyPhone:Token']) {
    const decodedToken = jwt_decode<any>(cookies['@BuyPhone:Token']) //decodifica o token

    //se existir um token e estiver expirado, mandar para o login
    if (Date.now() >= decodedToken.exp * 1000) {
      setCookie(ctx, '@BuyPhone:Router', '/user/profile', {
        maxAge: 60 * 60 * 24, // 24h
        path: '/',
      })
      destroyCookie(ctx, '@BuyPhone:User')
      destroyCookie(ctx, '@BuyPhone:Token')
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
  }

  //verifica se não existe um token, se nao existir voltar para a home
  if (!cookies['@BuyPhone:Token']) {
    setCookie(ctx, '@BuyPhone:Router', '/shipping', {
      maxAge: 60 * 60 * 24, // 24h
      path: '/',
    })
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  if (cookies['@BuyPhone:cart'] === '[]') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const user = cookies['@BuyPhone:User']
  if (user) {
    const userJson = JSON.parse(user)
    return {
      props: { userJson },
    }
  }
}
