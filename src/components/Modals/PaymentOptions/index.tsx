interface IInstallmentsProduct {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
}

interface IModalPaymentOptions {
    isOpen: boolean;
    closeModal: (value: boolean) => void
    installmentsProduct: IInstallmentsProduct | undefined;
}

export default function ModalPaymentOptions({isOpen, closeModal, installmentsProduct}: IModalPaymentOptions) {
  const handleCloseModalItsMatch = () => {
    return closeModal(false)
  }
  return (
    <>
      <div className={`modal modal-middle ${isOpen && 'modal-open'}`} id="modal-open-match">
        <div className="modal-box bg-white text-black p-0">
            <div className='flex justify-between bg-primary p-5'>
                <h1 className='text-white'>Opções de pagamento</h1>
                <button onClick={() => handleCloseModalItsMatch()} className="btn border-transparent text-xl text-[#CCCCCC] bg-inherit btn-circle absolute right-3 top-3">✕</button>
            </div>
            <div className='p-4'>
            <span className='mb-4 block'>nome do produto</span>
            <div className='border-solid border-2 border-primary rounded px-4 py-2'>
                <h2 className='text-primary'>Cartão de crédito</h2>
                <ul className='my-4'>
                    {installmentsProduct && Object.values(installmentsProduct).map((installment, index) => {
                        console.log(index)
                        return (
                            <li className='flex justify-between'>
                                <span>{`${index} x sem juros`}</span>
                                <span>{installment}</span>
                            </li>
                        )
                    })}
                    
                </ul>
            </div>
            </div>
        </div>
      </div>
    </>
  )
}
