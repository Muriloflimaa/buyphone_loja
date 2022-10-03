import Link from 'next/link'
import { TotalPayment } from '../../../components/TotalPayment'

export default function payment() {
  return (
    <>
      <div className="max-w-7xl mx-auto grid gap-3">
        <TotalPayment />
        <div className="flex flex-col justify-center items-center gap-4 max-w-sm mx-auto px-4">
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl text-center font-medium">
              Qual a forma de pagamento?
            </h2>
            <div className="flex flex-col justify-center items-center gap-4 mx-auto my-6">
              <h3 className="font-medium">Opções de pagamento</h3>
              <div className="grid gap-8">
                <div>
                  <Link href={'/shipping/payment/pix'}>
                    <a className="btn btn-outline w-full justify-between">
                      <span>Pix</span>
                      <svg
                        className="h-6 w-6 fill-current md:h-8 md:w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                      </svg>
                    </a>
                  </Link>
                  <span className="text-neutral/80 mt-2 block text-xs font-normal">
                    * Com o pix à vista você paga muito mais barato!
                  </span>
                </div>
                <div>
                  <a
                    href="https://loja.buyphone.com.br/payment/checkout/credit-card"
                    className="btn btn-outline w-full justify-between"
                  >
                    <span>Cartão de crédito</span>
                    <svg
                      className="h-6 w-6 fill-current md:h-8 md:w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                    </svg>
                  </a>
                  <span className="text-neutral/80 mt-2 block text-xs font-normal">
                    * Parcele em até 12x no cartão de crédito
                  </span>
                </div>
                <div>
                  <a
                    href="https://loja.buyphone.com.br/payment/custom"
                    target="_blank"
                    className="btn btn-outline w-full justify-between"
                  >
                    <span>Personalizado</span>
                    <svg
                      className="h-6 w-6 fill-current md:h-8 md:w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                    </svg>
                  </a>
                  <span className="text-neutral/80 mt-2 block text-xs font-normal">
                    * Nesta forma de pagamento você poderá dar uma entrada no
                    Pix e parcelar o restante. Assim você economiza no valor
                    final da compra!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
