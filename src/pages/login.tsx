import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Input } from '../components/InputElement'
import { AuthContext } from '../context/AuthContext'
import { WithSSRGuest } from '../utils/WithSSRGuest'

type SignInFormData = {
  email: string
  password: string
}

export default function login() {
  const { signIn } = useContext(AuthContext)

  const signInFormSchema = yup.object().shape({
    email: yup
      .string()
      .required('Campo email é obrigatório')
      .email('Esse campo precisa ser um e-mail'),
    password: yup
      .string()
      .required('Campo senha é obrigatório')
      .min(6, 'Minímo 6 digitos'),
  })

  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    event?.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    await signIn(values)
  }


  return (
    <>
      <div className="text-2xl flex md:gap-1 flex-col md:flex-row text-center justify-center pt-4 text-default font-medium">
        <span>Faça login ou </span> <span>cadastre-se</span>
      </div>
      <div className="w-full">
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="form-control gap-2 w-full"
        >
          <Input
            {...register('email')}
            type="text"
            label="Email"
            error={errors.password}
          />

          <Input
            {...register('password')}
            type="password"
            label="Senha"
            error={errors.password}
          />
          <div className="flex justify-end w-full">
            <Link href={'/forgot-password'} passHref>
              <a className="text-xs  text-blue-600 link cursor-pointer">
                Esqueceu sua senha?
              </a>
            </Link>
          </div>
          <div className="mt-4">
            {formState.isSubmitting ? (
              <button className="btn loading upper-case py-4 text-PrimaryText flex justify-center w-full btn-info shadow-md border-0">
                Carregando
              </button>
            ) : (
              <button
                className="btn upper-case py-4 text-PrimaryText flex justify-center w-full btn-info shadow-md border-0"
                type="submit"
              >
                Entrar
              </button>
            )}
          </div>
          <div className="text-default flex flex-col items-center gap-1 justify-center">
            Deseja criar uma conta?
            <Link href={'/register'} passHref>
              <a className="link text-blue-600 cursor-pointer">Cadastre-se</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export const getServerSideProps = WithSSRGuest(async (ctx) => {
  return {
    props: {},
  }
})
