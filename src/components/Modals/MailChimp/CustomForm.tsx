import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { ToastCustom } from '../../../utils/toastCustom'

interface IFormFields {
  EMAIL: string
  FNAME: string
  PRODUCT?: string
}

interface ICustomForm {
  status: string | null
  onValidated: (data: IFormFields) => void
  nameProduct?: string
}

export default function CustomForm({
  status,
  onValidated,
  nameProduct,
}: ICustomForm) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    if (status === 'success') {
      ToastCustom(3000, 'Cadastrado com sucesso!', 'success', 'Notificação')
      clearFields()

      window.location.href = '/'
      router.push('/')
    }
    if (status === 'error') {
      ToastCustom(3000, 'Erro ao cadastrar!', 'error', 'Que pena...')
    }
  }, [status])

  const clearFields = () => {
    setName('')
    setEmail('')
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    email &&
      name &&
      email.indexOf('@') > -1 &&
      onValidated({
        EMAIL: email,
        FNAME: name,
        PRODUCT: nameProduct,
      })
    return
  }

  return (
    <form
      className={
        'form-control gap-2 w-full flex flex-col items-center'
      }
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className={'grid gap-3 w-full'}>
        <input
          className="input input-bordered rounded-md w-full text-info-content"
          onChange={(e) => setName(e.target.value)}
          type="text"
          value={name}
          placeholder="Nome"
          required
        />

        <input
          className="input input-bordered rounded-md w-full text-info-content"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          value={email}
          placeholder="E-mail"
          required
        />
      </div>
      <button className="btn btn-info btn-block text-white" type="submit">
        {status === 'sending' ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  )
}
