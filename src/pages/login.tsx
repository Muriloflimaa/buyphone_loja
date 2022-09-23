import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'
import { WithSSRGuest } from '../utils/WithSSRGuest'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../components/InputElement'

export default function login() {
  const [show, setShow] = useState(true)
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit() {
    if (!email) {
      toast.error('Campo email é obrigatório.')
      return
    }
    if (!password) {
      toast.error('Campo senha é obrigatório.')
      return
    }
    const data = {
      email,
      password,
    }
    await signIn(data)
  }

  const signInFormSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  })

  const { errors } = formState

  console.log(errors)

  const submit = async (values: any, event: any) => {
    event.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // console.log(values)
  }

  return (
    <>
      <h1 className="text-2xl flex justify-center pt-4 text-default font-medium">
        Faça login ou cadastre-se
      </h1>
      <div className="w-full">
        {/* começo login */}
        <form
          onSubmit={handleSubmit(submit)}
          className="form-control gap-2 w-full"
        >
          <Input {...register('text')} label="Email" error={errors.email} />
          <Input
            {...register('password')}
            label="Senha"
            error={errors.password}
          />
          {formState.isSubmitting ? (
            <button className="btn loading normal-case py-4 text-PrimaryText flex justify-center w-full bg-buyphone shadow-md border-0">
              Carregando
            </button>
          ) : (
            <button
              className="btn normal-case py-4 text-PrimaryText flex justify-center w-full bg-buyphone shadow-md border-0"
              type="submit"
            >
              Entrar
            </button>
          )}
        </form>
        <div className="form-control w-full">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <label className="input-group">
              <input
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="BuyPhone@gmail.com"
                required
                className="input input-bordered rounded-md !important w-full text-PrimaryText"
              />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Senha</span>
            </label>
            <label className="input-group">
              <input
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                type={show ? 'password' : 'text'}
                placeholder="●●●●●●●"
                required
                className="input input-bordered rounded-tl-md rounded-tb-md !important w-full text-PrimaryText"
              />
              <span onClick={() => setShow(!show)}>
                {show ? (
                  <EyeOffIcon className="w-4 h-4" />
                ) : (
                  <EyeIcon className="w-4 h-4" />
                )}
              </span>
            </label>
          </div>
        </div>
        {/* fim login */}
        <div className="flex justify-end w-full my-2">
          <Link href={'/forgot-password'} passHref>
            <a className="text-xs  text-blue-600 link cursor-pointer">
              Esqueceu sua senha?
            </a>
          </Link>
        </div>
        <button
          onClick={() => onSubmit()}
          className="btn normal-case py-4 text-PrimaryText flex justify-center w-full bg-buyphone shadow-md border-0"
        >
          Entrar
        </button>
        <div className="text-default mt-4 flex gap-1 justify-center">
          Deseja criar uma conta?
          <Link href={'/register'} passHref>
            <a className="link text-blue-600 cursor-pointer">Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = WithSSRGuest(async (ctx) => {
  return {
    props: {},
  }
})
