import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import { useState } from 'react'
import Card from '../../../../components/Card/index'
import { TotalPayment } from '../../../../components/TotalPayment'
import { Address } from '../../../../types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '../../../../components/InputElement'
import {
  maskCpfCnpjInput,
  maskCreditCard,
  maskExpirationDate,
  maskMustNumber,
  masktel,
} from '../../../../utils/masks'
import { GetUseType } from '../../../../utils/getUserType'
import { useRouter } from 'next/router'
import { setCookies } from '../../../../utils/useCookies'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-regular-svg-icons'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'

export default function credit({ address }: Address) {
  const [name, setName] = useState('')
  const [card, setCard] = useState('')
  const [expiration_date, setExpiration_date] = useState('')
  const [code, setCode] = useState('')
  const [flag, setFlag] = useState('')
  const [focus, setFocus] = useState(false)
  const router = useRouter()
  const user = GetUseType()

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
    card_holder_name: yup.string().required('Campo nome é obrigatório'),
    card_number: yup
      .number()
      .typeError('Digite um número de cartão válido')
      .required('Campo número do cartão é obrigatório'),
    expiration_date: yup
      .string()
      .required('Campo Data de validade é obrigatório'),
    card_cvv: yup
      .number()
      .typeError('Digite um código de segurança válido')
      .required('Campo código de segurança é obrigatório'),
    document: yup.string().required('O campo CPF é obrigatório'),
    card_holder_phone: yup.string().required('O campo Telefone é obrigatório'),
    card_holder_birthdate: yup
      .string()
      .required('O campo data de nascimento é obrigatório'),
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(creditSchema),
  })

  const handleSubmitCredit: SubmitHandler<any> = async (value, event) => {
    event?.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const data = {
      ...value,
      user_id: user.id,
      address_id: address.id,
      shippingPrice: 0,
    }

    setCookies('@BuyPhone:CreditCardInfo', data, 180 * 50)
    router.push('/shipping/payment/credit/match-installments')
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
              <FontAwesomeIcon
                icon={faExclamation}
                className="h-6 w-6 fill-current"
              />
            </div>
            <div className="divider">Informações de Pagamento</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  {...register('card_holder_name')}
                  type="text"
                  name="card_holder_name"
                  label="Nome impresso no cartão"
                  error={errors.card_holder_name}
                  onChange={(event) => setName(event.target.value)}
                />

                <Input
                  {...register('card_number')}
                  type="tel"
                  name="card_number"
                  label="Número do Cartão"
                  maxLength={19}
                  error={errors.card_number}
                  onChange={(event) => (
                    setCard(event.target.value), checksFlag(event.target.value)
                  )}
                  onKeyUp={(e) => maskCreditCard(e)}
                />
                <div className="flex flex-col md:flex-row gap-2 w-full">
                  <Input
                    {...register('expiration_date')}
                    type="text"
                    name="expiration_date"
                    label="MM/AA"
                    error={errors.expiration_date}
                    onKeyUp={(e) => maskExpirationDate(e)}
                    maxLength={5}
                    onChange={(event) => setExpiration_date(event.target.value)}
                  />
                  <Input
                    {...register('card_cvv')}
                    type="tel"
                    name="card_cvv"
                    label="Código de Segurança"
                    maxLength={4}
                    error={errors.card_cvv}
                    onChange={(event) => (
                      setCode(event.target.value), maskMustNumber(event)
                    )}
                    onFocus={() => setFocus(!focus)}
                  />
                </div>
                <Input
                  {...register('card_holder_phone')}
                  type="text"
                  label="Telefone para contato"
                  error={errors.card_holder_phone}
                  onChange={(e) => masktel(e)}
                  maxLength={15}
                />
                <Input
                  {...register('card_holder_birthdate')}
                  type="date"
                  label="Data de nascimento do titular"
                  error={errors.card_holder_birthdate}
                  maxLength={18}
                />
                <Input
                  {...register('document')}
                  type="text"
                  label="CPF ou CNPJ do titular do cartão"
                  error={errors.document}
                  onChange={(e) => maskCpfCnpjInput(e)}
                  maxLength={18}
                />
              </div>
              <div className="flex flex-col">
                <Link href={'/shipping/payment/pix'} passHref>
                  <a className="alert border-2 border-warning my-2 md:mt-5 md:flex flex-row justify-start hidden">
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      className="w-6 h-6 text-warning"
                    />
                    <div className="flex flex-col items-start text-xs text-warning">
                      <strong>Economize no valor final da compra!</strong>
                      <span>
                        Clique aqui para realizar o pagamento de forma
                        personalizada, com um pix de entrada, diminuindo o valor
                        final do parcelamento!
                      </span>
                    </div>
                  </a>
                </Link>
                <div onClick={() => setFocus(!focus)}>
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
            </div>
            {formState.isSubmitting ? (
              <button className="btn loading btn-info mt-8 mb-0">
                Carregando
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-info text-white mt-8 mb-0"
              >
                Avançar
              </button>
            )}
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
