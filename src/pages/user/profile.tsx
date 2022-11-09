import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { Input } from '../../components/InputElement'
import { apiStore, link } from '../../services/api'
import { UserData } from '../../types'
import { masktel } from '../../utils/masks'
import { ToastCustom } from '../../utils/toastCustom'

type SignInFormData = {
  nome: string
  email: string
  mobile_phone: string
  name: string
}

interface user {
  data: UserData
}

export default function profile({ data }: user) {
  const [password, setPassword] = useState<string | null>()
  const [changePassword, setChangePassword] = useState<string | null>()
  const [ConfirmCP, setConfirmCP] = useState<string | null>()
  const router = useRouter()

  const changeInfoFormSchema = yup.object().shape({
    name: yup
      .string()
      .required('Campo nome é obrigatório')
      .min(10, 'Minímo 6 digitos'),
    email: yup
      .string()
      .required('Campo email é obrigatório')
      .email('Campo precisa ser um e-mail'),
    mobile_phone: yup.string().required('Campo celular é obrigatório'),
  })

  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(changeInfoFormSchema),
  })

  const { errors } = formState

  const handleChangeInfoUser: SubmitHandler<SignInFormData> = async (
    values,
    event
  ) => {
    event?.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const value = {
      name: values.name,
      mobile_phone: '+55' + values.mobile_phone,
      email: values.email,
    }

    try {
      await apiStore.put(`/users/${data.id}`, value)
      ToastCustom(3000, 'Dados alterados com sucesso', 'success', 'Notificação')
    } catch (error: any) {
      if (error.response.data.errors.email) {
        ToastCustom(3000, error.response.data.errors.email, 'error')

        return
      }
      if (error.response.data.errors.mobile_phone) {
        ToastCustom(3000, error.response.data.errors.mobile_phone, 'error')

        return
      }
      if (error.response.data.errors.name) {
        ToastCustom(3000, error.response.data.errors.name, 'error')

        return
      }
      ToastCustom(
        3000,
        'Ocorreu algum problema na alteração de dados, tente novamente ou contate o suporte',
        'error'
      )
    }
  }

  const AlterPassword = async () => {
    if (!password) {
      toast.error('Digite sua senha atual.')
      return
    }
    if (!changePassword) {
      toast.error('Digite sua nova senha.')
      return
    }
    if (changePassword?.length <= 8) {
      toast.error('Nova senha precisa ter mais de 8 dígitos')
      return
    }
    if (!ConfirmCP) {
      toast.error('Digite a confirmação da sua nova senha.')
      return
    }
    if (changePassword == ConfirmCP) {
      const userPasswords = {
        password: password,
        new_password: changePassword,
      }

      try {
        const response = await apiStore.put(`/users/${data.id}`, userPasswords)

        ToastCustom(2000, 'Senha alterada com sucesso', 'success')
        await new Promise((resolve) => setTimeout(resolve, 2000))

        router.push('/user/profile')
      } catch (error: any) {
        ToastCustom(
          2000,
          'Ocorreu algum erro na alteração de senha, entre em contato com o suporte.',
          'success'
        )
      }
    } else {
      toast.error('Senhas não conferem')
      return
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <div className="md: grid md:grid-cols-3 md:gap-6 mb-10">
        <div className="md:col-span-1 flex justify-between">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium text-neutral-100">
              Informação do Perfil
            </h3>
            <p className="mt-1 text-sm text-neutral-200">
              Atualize as informações do perfil da sua conta e o endereço de
              e-mail.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit(handleChangeInfoUser)}>
            <div className="px-4 py-5 bg-base-200 sm:p-6 shadow sm:rounded-tl-md sm:rounded-tr-md">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-4">
                  <Input
                    {...register('name')}
                    type="text"
                    defaultValue={data.name}
                    label="Nome"
                    error={errors.name}
                  />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <Input
                    {...register('email')}
                    type="text"
                    defaultValue={data.email}
                    label="Email"
                    error={errors.email}
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label className="label">
                    <span className="label-text">CPF</span>
                  </label>

                  <label className="input-group">
                    <input
                      defaultValue={data.document}
                      disabled
                      className="input input-disabled bg-base-100 border-error rounded-md !important w-full text-info-content"
                    />
                  </label>
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <div className="col-span-6 sm:col-span-4">
                    <label className="label">
                      <span className="label-text">Nascimento</span>
                    </label>

                    <label className="input-group">
                      <input
                        defaultValue={data.birthdate}
                        disabled
                        className="input input-disabled bg-base-100 border-error rounded-md !important w-full text-info-content"
                      />
                    </label>
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <Input
                    {...register('mobile_phone')}
                    defaultValue={data.mobile_phone.replace('+55', '')}
                    type="text"
                    label="Celular"
                    onKeyUp={(e) => masktel(e)}
                    maxLength={15}
                    error={errors.mobile_phone}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end px-4 py-3 bg-base-200/50 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
              {formState.isSubmitting ? (
                <button className="btn btn-info text-white loading">
                  Carregando
                </button>
              ) : (
                <button type="submit" className="btn btn-info text-white">
                  Salvar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1 flex justify-between">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium text-neutral-100">
              Atualizar a senha
            </h3>
            <p className="mt-1 text-sm text-neutral-200">
              Certifique-se de que sua conta esteja usando uma senha longa e
              aleatória para permanecer segura.
            </p>
          </div>
          <div className="px-4 sm:px-0"></div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="px-4 py-5 bg-base-200 sm:p-6 shadow sm:rounded-tl-md sm:rounded-tr-md">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label
                  className="block font-semibold text-[10px] text-gray-500"
                  htmlFor="current_password"
                >
                  Senha Atual
                </label>
                <input
                  className="input bg-base-100 border-base-200/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                  id="current_password"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="col-span-6 sm:col-span-4">
                <label
                  className="block font-semibold text-[10px] text-gray-500"
                  htmlFor="password"
                >
                  Nova Senha
                </label>
                <input
                  className="input bg-base-100 border-base-200/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                  id="password"
                  type="password"
                  onChange={(event) => setChangePassword(event.target.value)}
                  aria-autocomplete="list"
                />
              </div>
              <div className="col-span-6 sm:col-span-4">
                <label
                  className="block font-semibold text-[10px] text-gray-500"
                  htmlFor="password_confirmation"
                >
                  Confirmação de senha
                </label>
                <input
                  className="input bg-base-100 border-base-200/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                  id="password_confirmation"
                  onChange={(event) => setConfirmCP(event.target.value)}
                  type="password"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end px-4 py-3 bg-base-200/50 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
            <button
              onClick={() => AlterPassword()}
              className="btn btn-info text-white"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
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
          destination: '/account/login',
          permanent: false,
        },
      }
    }
  }

  //verifica se não existe um token, se nao existir voltar para a home
  if (!cookies['@BuyPhone:Token']) {
    setCookie(ctx, '@BuyPhone:Router', '/user/profile', {
      maxAge: 60 * 60 * 24, // 24h
      path: '/',
    })
    return {
      redirect: {
        destination: '/account/login',
        permanent: false,
      },
    }
  }

  try {
    //pega o user no cookies
    const { '@BuyPhone:User': user } = parseCookies(ctx)

    //transforma em objeto json
    const userjson = JSON.parse(user)

    //chamada api com id do user obtido + bearer token do cookies
    const { data } = await axios.get(`${link}/store/users/${userjson.id}`, {
      headers: {
        Authorization: `Bearer ${cookies['@BuyPhone:Token']}`,
      },
    })

    //envia o data para a aplicacao com sucesso
    return {
      props: {
        data,
      },
    }

    //caso der erro retornar null
  } catch (error) {
    return {
      props: {
        data: null,
      },
    }
  }
}
