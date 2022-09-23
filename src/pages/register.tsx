import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ReactInputMask from 'react-input-mask'
import { WithSSRGuest } from '../utils/WithSSRGuest'
import ErrorImg from '../assets/images/error.webp'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { api } from '../services/apiClient'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '../components/InputElement'

type SignUpFormData = {
  email: string
  password: string
  mobile_phone: string
  birthdate: string
  document: string
}

export default function register() {
  // const [show, setShow] = useState(true)

  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [document, setDocument] = useState('')
  // const [mobile_phone, setMobilePhone] = useState('')
  // const [birthdate, setBirthDate] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmPass, setConfirmPass] = useState('')
  // const [acceptTerms, setAcceptTerms] = useState(false)
  const router = useRouter()

  // const Register = async () => {
  //   if (
  //     name &&
  //     email &&
  //     document &&
  //     mobile_phone &&
  //     birthdate &&
  //     password &&
  //     confirmPass
  //   ) {
  //     if (acceptTerms) {
  //       if (password != confirmPass) {
  //         toast.error('senhas não conferem')
  //         return
  //       } else {
  //         try {
  //           await api.post('/user/register', {
  //             email,
  //             document,
  //             name,
  //             mobile_phone,
  //             birthdate,
  //             password,
  //             type: 0,
  //           })
  //           router.push('/login')
  //           return
  //         } catch (error: any) {
  //           if (error.response.data.errors) {
  //             const resposta = error.response.data.errors

  //             var MessageErrorArray = Object.keys(resposta)?.map(function (
  //               key
  //             ) {
  //               return [resposta[key]]
  //             })
  //             toast.custom(
  //               (t) => (
  //                 <div
  //                   className={`${
  //                     t.visible ? 'animate-enter' : 'animate-leave'
  //                   } w-full lg:w-1/4 bg-[#FECACA] text-[#484752] h-auto items-center shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  //                 >
  //                   <div className="flex-1 w-0 p-4">
  //                     <div className="flex items-center">
  //                       <div className="flex-shrink-0 pt-0.5">
  //                         <Image
  //                           src={ErrorImg}
  //                           layout="fixed"
  //                           width={40}
  //                           height={50}
  //                         ></Image>
  //                       </div>
  //                       <div className="ml-3 flex-1">
  //                         <p className="text-xs font-medium text-gray-900">
  //                           Verifique o alerta abaixo e corrija:
  //                         </p>
  //                         <p className="mt-1 text-[11px] text-gray-900 opacity-70">
  //                           {MessageErrorArray}
  //                         </p>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               ),
  //               {
  //                 duration: 8000,
  //               }
  //             )
  //             return
  //           }
  //           toast.error(
  //             'Ocorreu um erro no servidor, entre em contato com o suporte.'
  //           )
  //         }
  //       }
  //     } else {
  //       toast.error('você precisa aceitar os termos')
  //     }
  //     return
  //   } else {
  //     toast.error('preencha todos os campos')
  //   }
  //   return
  // }

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
      .min(6, 'Minímo 6 digitos'),
    confirm_password: yup
      .string()
      .required('Campo obrigatório')
      .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpFormSchema),
  })

  const { errors } = formState

  const handleSignUp: SubmitHandler<SignUpFormData | any> = async (
    values,
    event
  ) => {
    event?.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      //precisa formatar os dados antes de enviar

      const response = await api.post('/user/register', {
        //enviar dados por aqui
      })
      // router.push('/login')
      console.log(response)
      return
    } catch (error: any) {
      if (error.response.data.errors) {
        const resposta = error.response.data.errors

        var MessageErrorArray = Object.keys(resposta)?.map(function (key) {
          return [resposta[key]]
        })

        console.log(MessageErrorArray)
      }
      console.log(error)
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
        />
        <Input
          {...register('email')}
          type="text"
          label="email"
          error={errors.email}
        />
        <Input
          {...register('document')}
          type="text"
          label="CPF"
          error={errors.document}
          mask="cpf"
          max={14}
        />
        <Input
          {...register('mobile_phone')}
          type="tel"
          label="Telefone Celular"
          error={errors.mobile_phone}
          mask="telefone"
          max={15}
        />
        <Input
          {...register('birthdate')}
          type="date"
          label="Data de nascimento"
          error={errors.birthdate}
        />

        <Input
          {...register('password')}
          label="Senha"
          type="password"
          error={errors.password}
        />
        <Input
          {...register('confirm_password')}
          type="password"
          label="Confirmar senha"
          error={errors.confirm_password}
        />
        <label
          className="block font-semibold text-[10px] text-gray-500"
          htmlFor="terms"
        >
          <div className="flex items-center">
            <div className="ml-2 text-xs">
              Eu li e concordo com os{' '}
              <Link href={'/terms'} passHref>
                <a className="underline text-gray-600 hover:text-gray-900">
                  Termos de Serviço
                </a>
              </Link>{' '}
              e{' '}
              <Link href={'/politics'} passHref>
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
          <button className="btn loading normal-case py-4 text-PrimaryText flex justify-center w-full bg-buyphone shadow-md border-0">
            Carregando
          </button>
        ) : (
          <button
            className="btn normal-case py-4 text-PrimaryText flex justify-center w-full bg-buyphone shadow-md border-0"
            type="submit"
          >
            Registrar
          </button>
        )}
        <div className="text-center text-sm">
          Já é registrado?{' '}
          <Link href={'/login'} passHref>
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
