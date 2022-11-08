import Link from 'next/link'
import ShippingCard from '../../../../components/ShippingCard.tsx'

export default function custom() {
  return (
    <>
      <div className="max-w-7xl mx-auto grid gap-3 my-10">
        <ShippingCard />
        <div className="flex flex-col gap-4 max-w-3xl mx-auto w-full my-6">
          <h1 className="font-medium flex items-center gap-2">
            <Link href={'/shipping/payment'} passHref>
              <a className="flex items-center justify-start gap-2 normal-case lg:gap-3 my-2">
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
          </h1>
          <h2 className="text-white">Simulação de pagamento personalizado</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="form-control w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Valor de entrada:</span>
                </label>
                <input
                  type="text"
                  placeholder="0, 00"
                  className="input input-bordered w-full max-w-lg"
                />
                <label className="label flex justify-end">
                  <span className="label-text-alt">Total restante: xx</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <div className="form-control w-full max-w-lg">
                <label className="label">
                  <span className="label-text">
                    Parcelamento no cartão de crédito
                  </span>
                </label>
                <select defaultValue={2} className="select select-bordered">
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
                <label className="label flex justify-end">
                  <span className="label-text-alt">
                    Valor final da compra: XXX
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="btn btn-primary">Avançar</button>
          </div>
        </div>
      </div>
    </>
  )
}
