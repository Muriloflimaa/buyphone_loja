import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import { useState } from 'react'
import Card from '../../../components/Card/index'
import { TotalPayment } from '../../../components/TotalPayment'
import { Address } from '../../../types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '../../../components/InputTeste'
import { mascaraCep } from '../../../utils/masks'

export default function credit({ address }: Address) {
  const [name, setName] = useState('')
  const [card, setCard] = useState('')
  const [expiration_date, setExpiration_date] = useState('')
  const [code, setCode] = useState('')
  const [flag, setFlag] = useState('')
  const [focus, setFocus] = useState(false)

  const checksFlag = (card: string) => {
    const cardnumber = card.replace(/[^0-9]+/g, '')
    const visa = /^4[0-9]{12}(?:[0-9]{3})/
    const mastercard = /^5[1-5][0-9]{14}/
    const amex = /^3[47][0-9]{13}/
    const elo =
      /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/

    const cards = [visa, mastercard, amex, elo]
    for (let flag in cards) {
      if (cards[flag].test(cardnumber)) {
        setFlag(flag)
      }
    }
  }

  const creditSchema = yup.object().shape({
    name: yup.string().required(),
    number_card: yup.string().required(),
    validate: yup.string().required(),
    // code: yup.string().required(),
    cpf: yup.string().required(),
    installments: yup.number().required(),
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(creditSchema),
  })

  const handleSubmitCredit: SubmitHandler<any> = async (values, event) => {
    event?.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(values)
  }

  const { errors } = formState

  return (
    <>
      <div className="max-w-7xl mx-auto grid gap-3">
        <TotalPayment />
        <div className="flex flex-col gap-4 max-w-4xl mx-auto px-4">
          <h3 className="font-medium flex items-center gap-2">
            <Link href={'/shipping/payment'} passHref>
              <a className="flex items-center gap-2 normal-case lg:gap-3 my-2">
                <svg
                  className="h-6 w-6 fill-current md:h-8 md:w-8 rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                </svg>
                Opções de pagamento
              </a>
            </Link>
          </h3>
          <form
            onSubmit={handleSubmit(handleSubmitCredit)}
            className="form-control gap-2 w-full"
          >
            <div className="w-full btn btn-disabled bg-base-200 btn-md gap-2 normal-case lg:gap-3 justify-between my-2">
              <div className="flex flex-col text-left">
                <span>Cartão de Crédito</span>
                <span className="text-neutral-100/30 text-xs font-normal">
                  Parcele em até 12x no cartão de crédito
                </span>
              </div>
              <svg
                className="h-6 w-6 fill-current md:h-8 md:w-8"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
              </svg>
            </div>
            <div className="divider">Informações de Pagamento</div>
            <Link href={'/shipping/payment/pix'} passHref>
              <a className="alert border-2 my-2 md:mt-5 md:flex flex-row justify-start">
                <i className="fa fa-lightbulb mr-2"></i>
                <div className="flex flex-col items-start text-xs">
                  <strong>Economize no valor final da compra!</strong>
                  <span>
                    Clique aqui para realizar o pagamento de forma
                    personalizada, com um pix de entrada, diminuindo o valor
                    final do parcelamento!
                  </span>
                </div>
              </a>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  {...register('name')}
                  type="text"
                  name="name"
                  label="Nome impresso no cartão"
                  error={errors.name}
                  onChange={(event) => setName(event.target.value)}
                />

                <Input
                  {...register('number_card')}
                  type="tel"
                  name="number_card"
                  label="Número do Cartão"
                  maxLength={19}
                  error={errors.number_card}
                  onChange={(event) => (
                    setCard(event.target.value), checksFlag(event.target.value)
                  )}
                  onKeyUp={(e) => mascaraCep(e.target, '#### #### #### ####')}
                />
                <div className="flex gap-2 w-full">
                  <Input
                    {...register('validate')}
                    type="text"
                    name="validate"
                    label="MM/AA"
                    error={errors.validate}
                    onKeyUp={(e) => mascaraCep(e.target, '##/##')}
                    onChange={(event) => setExpiration_date(event.target.value)}
                  />
                  <Input
                    {...register('code')}
                    type="text"
                    name="code"
                    label="Código de Segurança"
                    maxLength={4}
                    error={errors.code}
                    onChange={(event) => setCode(event.target.value)}
                    onFocus={() => setFocus(!focus)}
                    onBlur={() => setFocus(!focus)}
                  />
                </div>
                <Input
                  {...register('cpf')}
                  type="text"
                  label="CPF / CNPJ"
                  error={errors.cpf}
                  onKeyUp={(e) => mascaraCep(e.target, '###.###.###-##')}
                  maxLength={14}
                />
                <div className="field-container">
                  <label htmlFor="installments" className="label">
                    Opções de Parcelamento
                  </label>
                  <select
                    id="installments"
                    className="select select-bordered w-full"
                    defaultValue={2}
                    {...register('installments')}
                  >
                    <option value={1}>1x de R$0,00 (sem juros)</option>
                    <option value={2}>2x de R$0,50 (com juros)</option>
                    <option value={3}>3x de R$0,33 (com juros)</option>
                    <option value={4}>4x de R$0,25 (com juros)</option>
                    <option value={5}>5x de R$0,20 (com juros)</option>
                    <option value={6}>6x de R$0,17 (com juros)</option>
                    <option value={7}>7x de R$0,14 (com juros)</option>
                    <option value={8}>8x de R$0,12 (com juros)</option>
                    <option value={9}>9x de R$0,11 (com juros)</option>
                    <option value={10}>10x de R$0,10 (com juros)</option>
                    <option value={11}>11x de R$0,09 (com juros)</option>
                    <option value={12}>12x de R$0,08 (com juros)</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <Link href={'/shipping/payment/pix'} passHref>
                  <a className="alert border-2 my-2 md:mt-5 md:flex flex-row justify-start hidden">
                    <i className="fa fa-lightbulb mr-2"></i>
                    <div className="flex flex-col items-start text-xs">
                      <strong>Economize no valor final da compra!</strong>
                      <span>
                        Clique aqui para realizar o pagamento de forma
                        personalizada, com um pix de entrada, diminuindo o valor
                        final do parcelamento!
                      </span>
                    </div>
                  </a>
                </Link>
                <Card
                  name={name}
                  card={card}
                  expiration_date={expiration_date}
                  foc={focus}
                  code={code}
                  flags={flag}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-info mt-8 mb-0"
              id="refresh"
            >
              Pagar
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { '@BuyPhone:GetCep': getDataUser } = parseCookies(ctx)
  const { '@BuyPhone:cart': cart } = parseCookies(ctx)

  if (getDataUser && cart !== '[]') {
    const address = JSON.parse(getDataUser)
    return {
      props: { address },
    }
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
