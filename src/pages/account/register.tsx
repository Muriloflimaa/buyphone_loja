import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Input } from '../../components/InputElement'
import { maskCpfInput, masktel } from '../../utils/masks'
import { ToastCustom } from '../../utils/toastCustom'
import { WithSSRGuest } from '../../utils/WithSSRGuest'

type SignUpFormData = {
  email: string
  password: string
  mobile_phone: string
  birthdate: string
  document: string
  name: string
  confirm_password: string
}

export default function register() {
  const router = useRouter()

  const signUpFormSchema = yup.object().shape({
    email: yup
      .string()
      .required('Campo obrigatório')
      .email('Esse campo precisa ser um e-mail'),
    document: yup.string().required('Campo obrigatório'),
    name: yup
      .string()
      .required('Campo obrigatório')
      .min(10, 'Minímo de 10 digitos'),
    mobile_phone: yup
      .string()
      .required('Campo obrigatório')
      .min(14, 'Digite número de telefone completo'),
    birthdate: yup.string().required('Campo obrigatório'),
    password: yup
      .string()
      .required('Campo obrigatório')
      .min(9, 'Minímo 9 digitos'),
    confirm_password: yup
      .string()
      .required('Campo obrigatório')
      .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
  })

  const { register, handleSubmit, formState } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpFormSchema),
  })

  const { errors } = formState

  const handleSignUp: SubmitHandler<SignUpFormData> = async (values, event) => {
    event?.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const cookies = parseCookies(undefined)
    const utms = cookies.UTM && JSON.parse(cookies.UTM)
    const lead = cookies.LEAD && JSON.parse(cookies.LEAD)

    const dataUTM = {
      email: values.email,
      document: values.document,
      name: values.name,
      mobile_phone: '+55' + values.mobile_phone,
      birthdate: values.birthdate,
      password: values.password,
      type: 0,
      utm_source: utms?.utm_source,
      utm_medium: utms?.utm_medium,
      utm_campaign: utms?.utm_campaign,
      lead: lead,
    }

    const data = {
      email: values.email,
      document: values.document,
      name: values.name,
      mobile_phone: '+55' + values.mobile_phone,
      birthdate: values.birthdate,
      password: values.password,
      type: 0,
    }

    try {
      //precisa formatar os dados antes de enviar
      await axios.post('/api/store/users', dataUTM)
      ToastCustom(8000, 'Cadastro realizado com sucesso!', 'success')
      router.push('/account/login')
    } catch (error: any) {
      if (
        (error.response.status == 422 &&
          !!error.response.data.errors.utm_campaign) ||
        !!error.response.data.errors.utm_source ||
        !!error.response.data.errors.utm_medium
      ) {
        try {
          await axios.post('/api/store/users', data)
          ToastCustom(8000, 'Cadastro realizado com sucesso!', 'success')
          router.push('/account/login')
        } catch (newError: any) {
          if (newError.response.data.errors) {
            const resposta = newError.response.data.errors
            var MessageErrorArray = Object.keys(resposta)?.map(function (key) {
              return [resposta[key]]
            })
            ToastCustom(8000, MessageErrorArray, 'error')
            return
          }
        }
      }
      if (error.response.data.errors) {
        const resposta = error.response.data.errors
        var MessageErrorArray = Object.keys(resposta)?.map(function (key) {
          return [resposta[key]]
        })

        ToastCustom(8000, MessageErrorArray, 'error', 'Atenção')
        return
      }
      ToastCustom(8000, 'Erro no servidor, contate o suporte.', 'error')
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="form-control gap-2 w-full"
      >
        <Input
          {...register('name')}
          type="text"
          label="Nome"
          error={errors.name}
          classNameLabel="text-[#201942]"
        />
        <Input
          {...register('email')}
          type="text"
          label="Email"
          error={errors.email}
          classNameLabel="text-[#201942]"
        />
        <Input
          {...register('document')}
          type="text"
          label="CPF"
          error={errors.document}
          onKeyUp={(e) => maskCpfInput(e)}
          maxLength={14}
          classNameLabel="text-[#201942]"
        />
        <Input
          {...register('mobile_phone')}
          type="tel"
          label="Telefone celular"
          error={errors.mobile_phone}
          onKeyUp={(e) => masktel(e)}
          maxLength={15}
          classNameLabel="text-[#201942]"
        />
        <Input
          {...register('birthdate')}
          type="date"
          label="Data de nascimento"
          error={errors.birthdate}
          classNameLabel="text-[#201942]"
        />

        <Input
          {...register('password')}
          label="Senha"
          type="password"
          error={errors.password}
          classNameLabel="text-[#201942]"
        />
        <Input
          {...register('confirm_password')}
          type="password"
          label="Confirmar senha"
          error={errors.confirm_password}
          classNameLabel="text-[#201942]"
        />
        <label
          className="block font-semibold text-[10px] text-gray-500"
          htmlFor="terms"
        >
          <div className="flex items-center">
            <div className="ml-2 text-xs">
              Eu li e concordo com os{' '}
              <Link href={'/account/terms'} passHref>
                <a className="underline text-gray-600 hover:text-gray-900">
                  Termos de Serviço
                </a>
              </Link>{' '}
              e{' '}
              <Link href={'/account/politics'} passHref>
                <a
                  href="https://pedidos.buyphone.com.br/privacy-policy"
                  className="underline text-gray-600 hover:text-gray-900"
                >
                  Política de Privacidade
                </a>
              </Link>
            </div>
          </div>
        </label>
        {formState.isSubmitting ? (
          <button className="btn btn-info loading normal-case py-4 text-white flex justify-center w-full bg-buyphone shadow-md border-0">
            Carregando
          </button>
        ) : (
          <button
            className="btn btn-info normal-case py-4 text-white flex justify-center w-full shadow-md border-0"
            type="submit"
          >
            Registrar
          </button>
        )}
        <div className="text-center text-sm text-[#201942]">
          Já é registrado?{' '}
          <Link href={'/account/login'} passHref>
            <a className="font-semibold text-blue-700 hover:text-blue-600">
              Entrar
            </a>
          </Link>
        </div>
      </form>
    </>
  )
}

export const getServerSideProps = WithSSRGuest(async (ctx) => {
  return {
    props: {},
  }
})
