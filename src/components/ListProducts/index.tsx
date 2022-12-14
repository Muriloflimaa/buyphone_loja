import { faTruckFast, faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../../context/AuthContext'
import { date, moneyMask } from '../../utils/masks'

interface ListProductsProps {
  created: string
  statuspayment: string
  number: number | string | null
  value: number
  method: string
  address: string
  city: string
  numberAddress: string | null | number
  district: string
  state: string
  zipCode: number | null | string
  linkPayment: string
  CodImgPix: string
  brCode: string
  pdf: string
  expired: string
}

type shippingOnTypes = {
  delivered_by: string
  days: string
}

const ListProducts = ({
  created,
  statuspayment,
  number,
  value,
  method,
  address,
  city,
  numberAddress,
  district,
  state,
  zipCode,
  linkPayment,
  CodImgPix,
  brCode,
  pdf,
  expired,
}: ListProductsProps) => {
  const router = useRouter()
  const { user } = useContext(AuthContext)
  const [shippingDays, setShippingDays] = useState<shippingOnTypes>()
  const [image, setImage] = useState()

  const copyToClipBoard = async (copyMe: string) => {
    try {
      await navigator.clipboard.writeText(copyMe)
      toast.success('link copiado com sucesso')
    } catch (err) {
      toast.error('erro ao copiar o link')
    }
  }

  useEffect(() => {
    getShippingDays()
    handleChangePagination()
  }, [])

  async function getShippingDays() {
    try {
      const infoShippingSend = {
        cep: zipCode?.toString().replace('-', ''),
        total: value,
        qtd_items: 1,
      }

      const { data } = await axios.post(`/api/api/store/shipping`, infoShippingSend)
      setShippingDays(data)
    } catch (error) {
      setShippingDays(undefined)
    }
  }

  async function handleChangePagination() {
    if (method === 'PIX') {
      try {
        const { data } = await axios.get(
          `/api/api/store/checkout/qrcode/${CodImgPix}`
        )
        setImage(data.qrcode)
      } catch (error) {}
    }
  }

  return (
    <div className="collapse collapse-arrow card rounded-none border-b border-gray-300">
      <input type="checkbox" className="peer" />
      <div className="collapse-title flex justify-between items-center">
        <div className="flex flex-col">
          <span className="font-bold">Pedido #{number}</span>
          <span className="hidden badge badge-xs badge-ghost sm:block">
            {date(created)}
          </span>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex flex-col gap-3 items-center md:flex-row">
            {(method === 'PIX' &&
              statuspayment !== 'paid' &&
              expired !== 'expired') ??
            'manual_paid' ??
            'captured' ? (
              <>
                <div className="justify-end flex-col items-center cursor-pointer z-10">
                  <label
                    htmlFor={CodImgPix}
                    className={
                      'btn btn-sm btn-success cursor-pointer normal-case font-normal ' +
                      (user?.type === 1 ? 'btn-info' : '')
                    }
                  >
                    Pagar
                    <FontAwesomeIcon
                      icon={faWallet}
                      className="w-4 h-4 text-white ml-2"
                    />
                  </label>
                </div>

                <input
                  type="checkbox"
                  id={CodImgPix}
                  className="modal-toggle"
                />
                <label
                  htmlFor={CodImgPix}
                  className="modal cursor-pointer z-50"
                >
                  <label className="modal-box relative max-w-5xl">
                    <div className="my-10">
                      <div className="flex flex-col gap-4 max-w-5xl mx-auto">
                        <div className="flex flex-col w-full md:flex-row justify-evenly">
                          <div className="text-center w-full grid gap-3">
                            <div className="card card-compact shadow w-fit mx-auto">
                              {image && (
                                <Image
                                  src={image}
                                  className="mx-auto"
                                  height={128}
                                  width={128}
                                />
                              )}
                            </div>
                            <h3 className="font-bold text-2xl">
                              Valor: R$ {moneyMask(value.toString())}
                            </h3>
                            <div className="grid gap-2">
                              <a
                                onClick={() => copyToClipBoard(`${brCode}`)}
                                className="btn btn-info text-white"
                              >
                                Copiar QRCode
                              </a>
                              {pdf && (
                                <Link href={pdf}>
                                  <a className="btn btn-info text-white">
                                    Baixar PDF
                                  </a>
                                </Link>
                              )}
                            </div>
                          </div>
                          <div className="divider md:divider-horizontal"></div>
                          <div className="flex flex-col w-full justify-center gap-3">
                            <div className="badge badge-sm badge-warning">
                              Aguardando Pagamento
                            </div>
                            <div className="flex flex-col gap-3">
                              <h3 className="font-bold text-3xl">
                                Enviar R$ {moneyMask(value.toString())} para:
                              </h3>
                              <div>
                                <span className="font-bold">Nome:</span> Buyp
                                Programas de Vantagens e Tecnologia Ltda
                              </div>
                              <div>
                                <span className="font-bold">CNPJ:</span>{' '}
                                45.679.637/0001-94
                              </div>
                            </div>
                            <a
                              className="btn btn-info text-white"
                              onClick={() => router.push('/user/myshopping')}
                            >
                              Verificar Pagamento
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </label>
              </>
            ) : expired === 'expired' ? (
              <span className="badge badge-error h-auto text-center ml-12">
                Pedido expirado
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className="collapse-content">
        <div className="py-2"></div>
        <ul className="steps mx-auto w-full">
          <li
            className={
              'step ' +
              (expired === 'paid' ?? 'manual_paid' ?? 'captured'
                ? 'step-success'
                : 'step-accent')
            }
          >
            <span
              className={
                expired !== 'paid' ?? 'manual_paid' ?? 'captured'
                  ? 'opacity-50'
                  : ''
              }
            >
              Processando
              <br />
              pedido
            </span>
          </li>
          <li
            className={
              'step ' + (expired === 'packed' ? 'step-success' : 'step-accent')
            }
          >
            <span className={expired !== 'packed' ? 'opacity-50' : ''}>
              Produto conferido
              <br />
              aguardando coleta
            </span>
          </li>
          <li className="step step-accent">
            <span className="opacity-50">Produto enviado</span>
          </li>
        </ul>
        <div className="mb-6">
          <div className="flex justify-center gap-2 my-8">
            <div className="card p-4 bg-base-200">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="flex flex-col">
                  <span className="font-bold"></span>
                  <span className="text-xs font-medium">
                    R$ {moneyMask(value.toString())}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div className="md:w-1/3">
              <h3 className="text-xl mb-2 font-bold text-center">
                Prazo de entrega
              </h3>
              <div className="flex justify-between text-center w-full text-success">
                <p>
                  <FontAwesomeIcon
                    icon={faTruckFast}
                    className="w-4 h-4 mr-2"
                  />
                  {`Chegar?? gr??tis em at?? ${
                    shippingDays?.days ? shippingDays?.days : '10 ?? 15 '
                  } dias ??teis`}
                </p>
              </div>
            </div>
            <div className="divider md:divider-horizontal">????</div>
            <div className="md:w-1/3">
              <h3 className="text-xl mb-2 font-bold text-center">
                Meio de Pagamento
              </h3>
              <div className="text-center mb-2">
                {statuspayment == 'canceled' ?? 'voided' ? (
                  <span className="badge h-auto text-center">
                    Cobran??a cancelada
                  </span>
                ) : statuspayment == 'processing' ??
                  'waiting_capture' ??
                  'partial_captured' ??
                  'failed' ? (
                  <span className="badge badge-warning badge-sm h-auto text-center">
                    Processando pagamento
                  </span>
                ) : statuspayment == 'registered' ? (
                  <span className="badge badge-warning badge-sm h-auto text-center">
                    Registrado
                  </span>
                ) : statuspayment == 'paid' ??
                  'manual_paid' ??
                  'captured' ??
                  'approved' ??
                  'authorized' ??
                  'confirmed' ? (
                  <span className="badge badge-success badge-sm h-auto text-center">
                    Pagamento aprovado
                  </span>
                ) : statuspayment == 'manual_failed' ? (
                  <span className="badge badge-error badge-sm h-auto text-center">
                    Falha ao efetuar pagamento
                  </span>
                ) : statuspayment == 'not_authorized' ?? 'denied' ? (
                  <span className="badge badge-error badge-sm h-auto text-center">
                    N??o autorizada
                  </span>
                ) : statuspayment == 'with_error' ? (
                  <span className="badge badge-error badge-sm h-auto text-center">
                    Com erro
                  </span>
                ) : statuspayment == 'created' ? (
                  <span className="badge badge-warning badge-sm h-auto text-center">
                    Aguardando Pagamento
                  </span>
                ) : (
                  <span className="badge badge-warning badge-sm h-auto text-center">
                    Aguardando Pagamento
                  </span>
                )}
              </div>
              <p className="text-center">
                {method === 'PIX' && 'PIX'}
                {method === 'CREDIT' && 'Cr??dito'}
                {method === 'CUSTOM' && 'Personalizado'}
              </p>
              <span className="font-bold text-success text-lg mt-2 block text-center">
                Total: R$ {moneyMask(value.toString())}
              </span>
            </div>
            <div className="divider md:divider-horizontal">????</div>
            <div className="md:w-1/3">
              <h3 className="text-xl mb-2 font-bold text-center">
                Endere??o de entrega
              </h3>
              <span className="font-normal text-base mt-2 block text-center">
                {`${address}, ${numberAddress} ${district}, ${city} - ${state}`}
                <br />
                {zipCode}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <a target={'_blank'} href={`/bill-of-sale/${number}`}>
            <button className="btn py-4 text-white w-56 m-auto mt-5 bg-info shadow-md border-0">
              Ver detalhes
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
export default ListProducts
