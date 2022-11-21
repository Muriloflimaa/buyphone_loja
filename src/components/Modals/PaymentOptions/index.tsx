import { moneyMask } from '../../../utils/masks'

interface IInstallmentsProduct {
  1: string
  2: string
  3: string
  4: string
  5: string
  6: string
  7: string
  8: string
  9: string
  10: string
  11: string
  12: string
}

interface IModalPaymentOptions {
  isOpen: boolean
  closeModal: (value: boolean) => void
  installmentsProduct: IInstallmentsProduct | undefined
  nameProduct: string
  memoryProduct: string
  colorProduct: string
}

export default function ModalPaymentOptions({
  isOpen,
  closeModal,
  installmentsProduct,
  nameProduct,
  memoryProduct,
  colorProduct,
}: IModalPaymentOptions) {
  const handleCloseModalItsMatch = () => {
    return closeModal(false)
  }
  return (
    <>
      <div
        className={`modal sm:modal-middle modal-bottom ${
          isOpen && 'modal-open'
        }`}
      >
        <div className="modal-box bg-white text-black p-0">
          <div className="flex justify-between p-5">
            <h1 className="text-black text-xl px-4 font-medium">
              {nameProduct} {memoryProduct} {colorProduct}
            </h1>
            <button
              onClick={() => handleCloseModalItsMatch()}
              className="btn border-transparent text-xl text-[#CCCCCC] bg-inherit btn-circle absolute right-3 top-3"
            >
              ✕
            </button>
          </div>
          <div className="px-4">
            <div className="overflow-x-auto" data-theme="light">
              <table className="table w-full mb-16">
                <thead>
                  <tr>
                    <th className="font-medium text-lg normal-case">
                      Parcelas
                    </th>
                    <th className="font-medium text-lg normal-case text-right">
                      Valor Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {installmentsProduct &&
                    Object.values(installmentsProduct).map(
                      (installment, index) => {
                        const formatNumber = parseFloat(
                          installment.replace(/[^\d]+/g, '')
                        ).toFixed(2)
                        return (
                          <tr key={installment}>
                            <td>
                              <span className="font-semibold">{`${
                                index + 1
                              } x`}</span>
                              {` de ${installment}`}
                            </td>
                            <td className="text-right">
                              <span className="badge badge-ghost">{`R$ ${moneyMask(
                                (Number(formatNumber) * (index + 1)).toString()
                              )}`}</span>
                            </td>
                          </tr>
                        )
                      }
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
