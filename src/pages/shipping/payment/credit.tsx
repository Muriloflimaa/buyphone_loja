import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import { useState } from 'react'
import Card from '../../../components/Card/index'
import { TotalPayment } from '../../../components/TotalPayment'
import { Address, ArrayProduct, ProductPayment } from '../../../types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '../../../components/InputTeste'
import {
  maskCpfInput,
  maskCreditCard,
  maskExpirationDate,
  maskMustNumber,
} from '../../../utils/masks'
import { apiStoreBeta } from '../../../services/apiBetaConfigs'
import { useRouter } from 'next/router'
import { useCart } from '../../../context/UseCartContext'
import { ToastCustom } from '../../../utils/toastCustom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons'

export default function credit({ address }: Address) {
  const [name, setName] = useState('')
  const [card, setCard] = useState('')
  const [expiration_date, setExpiration_date] = useState('')
  const [code, setCode] = useState('')
  const [flag, setFlag] = useState('')
  const [focus, setFocus] = useState(false)
  const [stateModalSuccess, setStateModalSuccess] = useState(false)
  const [stateModalError, setStateModalError] = useState(false)
  const router = useRouter()
  const { values, somaTotal, CleanCart } = useCart()

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
    installments: yup
      .number()
      .typeError('Amount must be a number')
      .required('O campo de parcelas é obrigatório'),
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(creditSchema),
  })

  const handleSubmitCredit: SubmitHandler<any> = async (value, event) => {
    event?.preventDefault()
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const setDat: ProductPayment[] = []
      values.map(async (item: ArrayProduct) => {
        const response = {
          product_id: item.id,
          price: item.priceFormated,
          qty: item.amount,
        }
        setDat.push(response)
      })

      const { data } = await apiStoreBeta.post(`checkout/credit-card`, {
        ...value,
        user_id: address.user_id,
        address_id: address.id,
        shippingPrice: 0,
        items: setDat,
        amount: somaTotal,
      })

      if (data.original.status === 'paid') {
        setStateModalSuccess(true)
      } else {
        setStateModalError(true)
      }
    } catch (error: any) {
      if (error.response.data.errors?.document) {
        ToastCustom(3000, 'Por favor verifique o seu número de CPF', 'error')
        return
      }

      setStateModalError(true)
    }
  }

  const { errors } = formState

  return (
    <>
      <div className="max-w-7xl mx-auto grid gap-3">
        <TotalPayment />
        {stateModalSuccess == true && (
          <div className="modal pointer-events-auto visible opacity-100 modal-bottom sm:modal-middle">
            <div className="flex flex-col gap-2 items-center text-center rounded-2xl p-10 bg-white relative z-50 max-w-md">
              <div className="bg-success shadow-sm shadow-success w-full h-fit absolute text-white -mt-10 py-10 z-10 rounded-t-2xl">
                <FontAwesomeIcon icon={faCircleCheck} className="h-20 w-h-20" />
                <h3 className="font-bold text-2xl">Sucesso!</h3>
              </div>

              <div className="divider m-0 mt-36"></div>
              <p className="font-bold text-lg text-success">
                Obrigado pela sua compra!
              </p>
              <span className="mb-6 text-success">
                O seu pedido foi aceito. <br />
                Você irá receber uma notificação com os detalhes do pedido no
                seu e-mail.
              </span>

              <Link href={'/myshopping'} passHref>
                <button className="btn btn-success max-w-xs text-white w-full rounded-full shadow-md shadow-success/60">
                  Ok
                </button>
              </Link>
              <Link href={'/'} passHref>
                <a className="link  md:mb-0 text-success">
                  Ir para página inicial
                </a>
              </Link>
            </div>
          </div>
        )}

        {stateModalError == true && (
          <div className="modal pointer-events-auto visible opacity-100 modal-bottom sm:modal-middle">
            <div className="flex flex-col gap-2 items-center text-center rounded-2xl p-10 bg-white relative z-50 max-w-md">
              <div className="bg-error shadow-sm shadow-error w-full h-fit absolute text-white -mt-10 py-10 z-10 rounded-t-2xl">
                <FontAwesomeIcon icon={faCircleXmark} className="h-20 w-h-20" />
                <h3 className="font-bold text-2xl">Falha!</h3>
              </div>

              <div className="divider m-0 mt-36"></div>
              <p className="font-bold text-lg text-error">
                Ops, ocorreu alguma falha no pagamento!
              </p>
              <span className="mb-6 text-error">
                Tente novamente ou contate o nosso suporte.
              </span>

              <button
                onClick={() => setStateModalError(false)}
                className="btn btn-error max-w-xs text-white w-full rounded-full shadow-md shadow-error/60"
              >
                Tentar novamente
              </button>

              <a
                target={'_blank'}
                href="#link-para-suporte"
                className="link  md:mb-0 text-error"
              >
                Contatar o suporte
              </a>
            </div>
          </div>
        )}

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
                    // onBlur={() => setFocus(!focus)}
                  />
                </div>
                <Input
                  {...register('document')}
                  type="text"
                  label="document / CNPJ"
                  error={errors.document}
                  onKeyUp={(e) => maskCpfInput(e)}
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
              <button type="submit" className="btn btn-info mt-8 mb-0">
                Pagar
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
