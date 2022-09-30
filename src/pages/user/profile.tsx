import axios from 'axios'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ReactInputMask from 'react-input-mask'
import { apiLogin } from '../../services/apiLogin'
import { UserData } from '../../types'
import jwt_decode from 'jwt-decode'
import { GetServerSidePropsContext } from 'next'
import { apiStoreBeta } from '../../services/apiBetaConfigs'

export default function profile({ data }: UserData) {
  const [name, setName] = useState<string | null>(data.name)
  const [email, setEmail] = useState<string | null>(data.email)
  const [mobilePhone, setMobilePhone] = useState<string | null>(
    data.mobile_phone
  )
  const [password, setPassword] = useState<string | null>()
  const [changePassword, setChangePassword] = useState<string | null>()
  const [ConfirmCP, setConfirmCP] = useState<string | null>()

  const AlterDataUser = async () => {
    if (!name) {
      toast.error('Campo nome obrigatório')
      return
    }
    if (!email) {
      toast.error('Campo email obrigatório')
      return
    }
    if (!mobilePhone) {
      toast.error('Campo telefone obrigatório')
      return
    }

    const userInfo = {
      name: name,
      email: email,
      mobile_phone: mobilePhone,
    }
    try {
      await apiLogin.put(`/user/${data.id}`, userInfo)
      toast.success('Dados alterados com sucesso.')
    } catch (error) {
      toast.error(
        'Houve um problema para alterar os dados, consulte o suporte.'
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
        const response = await apiLogin.put(
          `/password/${data.id}`,
          userPasswords
        )
        if (response.data.success) {
          toast.success('Senha alterada com sucesso.')
          return
        }
        if (response.data.error) {
          toast.error(
            response.data.error.replace(
              'Password does not match',
              'Senha atual não confere.'
            )
          )
          return
        }

        console.log(response)
      } catch (error: any) {
        toast.error(
          error.response.data.message.replace('new password', 'nova senha')
        )
      }
    } else {
      toast.error('Senhas não conferem')
      return
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <div className="md: grid md:grid-cols-3 md:gap-6">
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
          <div>
            <div className="px-4 py-5 bg-base-200 sm:p-6 shadow sm:rounded-tl-md sm:rounded-tr-md">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-4">
                  <label
                    className="block font-semibold text-[10px] text-gray-500"
                    htmlFor="name"
                  >
                    Nome
                  </label>
                  <input
                    className="input bg-base-100 border-base-200/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                    id="name"
                    type="text"
                    defaultValue={data.name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label
                    className="block font-semibold text-[10px] text-gray-500"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="input bg-base-100 border-base-200/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                    id="email"
                    type="email"
                    defaultValue={data.email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label
                    className="block font-semibold text-[10px] text-gray-500"
                    htmlFor="document"
                  >
                    CPF
                  </label>
                  <input
                    disabled
                    className="input bg-base-100 border-base-200/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                    id="document"
                    defaultValue={data.document}
                    type="tel"
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label
                    className="block font-semibold text-[10px] text-gray-500"
                    htmlFor="birthdate"
                  >
                    Nascimento
                  </label>
                  <input
                    disabled
                    className="input bg-base-100 border-base-200/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                    id="birthdate"
                    defaultValue={data.birthdate}
                    type="date"
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label
                    className="block font-semibold text-[10px] text-gray-500"
                    htmlFor="mobile_phone"
                  >
                    Celular
                  </label>
                  <ReactInputMask
                    mask="+55 (99) 99999-9999"
                    id="mobile_phone"
                    name="phone"
                    onChange={(event) => setMobilePhone(event.target.value)}
                    type="tel"
                    defaultValue={data.mobile_phone}
                    className="input bg-base-100 border-base-200/30 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end px-4 py-3 bg-base-200/50 text-right sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
              <button
                onClick={() => AlterDataUser()}
                className="btn normal-case"
              >
                Salvar
              </button>
            </div>
          </div>
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
            <button onClick={() => AlterPassword()} className="btn normal-case">
              Salvar
            </button>
          </div>
        </div>
      </div>
      {/* <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1 flex justify-between">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium text-neutral-100">
              Sessões do navegador
            </h3>
            <p className="mt-1 text-sm text-neutral-200">
              Gerencie e saia de suas sessões ativas em outros navegadores e
              dispositivos.
            </p>
          </div>
          <div className="px-4 sm:px-0"></div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="px-4 py-5 sm:p-6 bg-base-200 shadow sm:rounded-lg">
            <div className="max-w-xl text-sm text-neutral-100">
              Se necessário, você pode sair de todas as outras sessões do
              navegador em todos os seus dispositivos. Algumas de suas sessões
              recentes estão listadas abaixo; no entanto, esta lista pode não
              ser exaustiva. Se você acha que sua conta foi comprometida, você
              também deve atualizar sua senha.
            </div>

            <div className="flex items-center mt-5">
              <button type="submit" className="btn normal-case">
                Sair de outras sessões do navegador
              </button>
              <div className="text-sm text-gray-600 ml-3">Feito.</div>
            </div>
          </div>
        </div>
      </div> */}
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
          destination: '/login',
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
        destination: '/login',
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
    const { data } = await axios.get(
      `https://beta-api.buyphone.com.br/store/users/${userjson.id}`,
      {
        headers: {
          Authorization: `Bearer ${cookies['@BuyPhone:Token']}`,
        },
      }
    )

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
