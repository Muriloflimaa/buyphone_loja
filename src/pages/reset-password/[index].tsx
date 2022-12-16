import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { Input } from '../../components/InputElement'
import { ToastCustom } from '../../utils/toastCustom'
import axios from 'axios'

type ForgoutFormData = {
  password: string
  password_confirmation: string
}

export default function ResetPassword() {
  const router = useRouter()

  const ForgoutFormSchema = yup.object().shape({
    password: yup
      .string()
      .required('Campo obrigatório')
      .min(6, 'Minímo 6 digitos'),
    password_confirmation: yup
      .string()
      .required('Campo obrigatório')
      .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais'),
  })
  const { register, handleSubmit, formState } = useForm<ForgoutFormData>({
    resolver: yupResolver(ForgoutFormSchema),
  })
  const { errors } = formState

  const handleForgoutPassword: SubmitHandler<ForgoutFormData> = async (
    values,
    event
  ) => {
    event?.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    try {
      const { data } = await axios.post('/api/api/store/reset-password', {
        email: router.query.email,
        token: router.query.index,
        ...values,
      })

      if (data.email[0] == 'This password reset token is invalid.') {
        ToastCustom(1500, 'Token inválido', 'error')
        router.push('/account/forgot-password')
        return
      }

      if (data.status == 'Your password has been reset!') {
        ToastCustom(1500, 'Senha alterada com sucesso', 'success')
        router.push('/account/login')
        return
      }

      if (data.email[0]) {
        ToastCustom(1500, 'E-mail não encontrado', 'error')
        return
      }
    } catch (error: any) {
      ToastCustom(1500, 'Senha alterada com sucesso', 'success')
      router.push('/account/login')
      return
    }
  }

  return (
    <div className="grid gap-3 pt-3 text-center text-[#201942]">
      <h1>Registre sua nova senha</h1>
      <form
        onSubmit={handleSubmit(handleForgoutPassword)}
        className="form-control gap-2 w-full"
      >
        <Input
          {...register('password')}
          type="password"
          placeholder="**********"
          label="Nova senha"
          error={errors.password}
        />
        <Input
          {...register('password_confirmation')}
          type="password"
          placeholder="**********"
          label="Confirmação de nova senha"
          error={errors.password_confirmation}
        />

        {formState.isSubmitting ? (
          <button className="btn btn-info text-white loading normal-case py-4 flex justify-center w-full shadow-md border-0">
            Carregando
          </button>
        ) : (
          <button
            className="btn btn-info text-white normal-case py-4 flex justify-center w-full shadow-md border-0"
            type="submit"
          >
            Redefinir senha
          </button>
        )}
      </form>
    </div>
  )
}
