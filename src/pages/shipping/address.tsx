import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'
import { Input } from '../../components/InputElement'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { apiStoreBeta } from '../../services/apiBetaConfigs'
import { GetUseType } from '../../utils/getUserType'
import toast from 'react-hot-toast'
import { TotalPayment } from '../../components/TotalPayment'
import { setCookies } from '../../utils/useCookies'

interface CepJsonProps {
  cepJson: {
    CEP: string
    City: string
    District: string
    Message: string
    Street: string
    UF: string
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
      const { data } = await apiStoreBeta.post(`addresses`, {
        ...values,
        user_id: user.id,
        postal_code: cepJson.CEP,
      })

      setCookies('@BuyPhone:GetCep', data, 60 * 60)
      router.push('/shipping/payment')
    } catch (error) {
      toast.error('Erro no servidor, entre em contato com o suporte')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 grid">
      <TotalPayment />
      <div className="divider" />
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
                defaultValue={cepJson?.Street}
                error={errors.address}
              />
              <Input
                {...register('neighborhood')}
                type="text"
                label="Bairro"
                defaultValue={cepJson?.District}
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
                defaultValue={cepJson?.City}
                error={errors.city}
              />
              <Input
                {...register('uf')}
                type="text"
                label="Estado"
                defaultValue={cepJson?.UF}
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
          <div className="card card-compact bg-base-100 shadow w-full h-fit lg:mt-16">
            <div className="card-body">
              <div className="flex justify-between">
                <span className="text-lg uppercase">Meu Carrinho</span>
                <span className="font-thin text-xs">1 itens</span>
              </div>
            </div>
            <div className="card-body">
              <div className="h-16 flex justify-between w-full">
                <div className="flex gap-2">
                  <img
                    src="https://pedidos.buyphone.com.br/media/2528/11-BRANCO.webp"
                    className="h-full"
                    alt=""
                  />
                  <div className="flex flex-col justify-between opacity-60 text-2xs leading-4 h-full">
                    <div className="flex flex-col">
                      <span>iPhone 11</span>
                      <span>Branco / 64Gb</span>
                    </div>
                    <span>
                      Quantidade: <strong>1</strong>
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-between text-right">
                  <span className="text-md">R$3.207,57</span>
                  <form
                    action="https://loja.buyphone.com.br/cart/remove/b067b9de3f4248e60bd1ab934df2adf2"
                    method="POST"
                  >
                    <input
                      type="hidden"
                      name="_token"
                      value="mWfdz2XhPzyRPhrITj3Y6Qb2RQ3mof26SPWW8cYk"
                    />

                    <span className="fa fa-trash"></span>
                  </form>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className="divisor-buyphone"></div>
              </div>
            </div>
            <div className="card-body bg-base-200">
              <div className="flex justify-between py-4">
                <span className="text-gray-500 text-lg">Valor Total:</span>
                <span className="font-semibold text-lg">R$ 3.207,57</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = parseCookies(ctx)

  if (cookies['@BuyPhone:cart'] === '[]') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const cep = cookies['@BuyPhone:GetCep']
  if (cep) {
    const cepJson = JSON.parse(cep)
    return {
      props: { cepJson },
    }
  }
  return { props: {} }
}
