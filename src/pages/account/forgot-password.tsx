import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { Input } from '../../components/InputElement'
import { apiStore } from '../../services/api'
import { ToastCustom } from '../../utils/toastCustom'

type ForgoutFormData = {
  email: string
}

export default function ForgotPassword() {
  const router = useRouter()
  const ForgoutFormSchema = yup.object().shape({
    email: yup
      .string()
      .required('Campo email é obrigatório')
      .email('Esse campo precisa ser um e-mail'),
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
      await apiStore.post('forgot-password', values)
      ToastCustom(
        4000,
        'Enviamos um link para recuperação de senha no seu e-mail.',
        'success'
      )
      router.push('/account/login')
    } catch (error: any) {
      if (error.response.data.message === 'The selected email is invalid.') {
        ToastCustom(
          4000,
          'E-mail não cadastrado em nossa base de dados.',
          'error'
        )
        return
      }
      ToastCustom(
        4000,
        'Ocorreu algum erro na recuperação de senha, tente mais tarde ou contate o suporte.',
        'error'
      )
    }
  }

  return (
    <div className="grid gap-3 pt-3">
      <h1 className="text-[#201942]">
        Esqueceu sua senha? Sem problemas. Apenas informe seu endereço de e-mail
        que enviaremos um link que permitirá definir uma nova senha.
      </h1>
      <form
        onSubmit={handleSubmit(handleForgoutPassword)}
        className="form-control gap-2 w-full"
      >
        <Input
          {...register('email')}
          type="text"
          label="Email"
          error={errors.email}
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
