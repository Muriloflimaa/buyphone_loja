import Image from 'next/image'
import ImageSeal from '../../../assets/images/image-seal-modal-info.svg'
import styles from './styles.module.scss'

export default function InfoDiscount() {
    return (
        <>
            <input type="checkbox" id="modal-info-discount" className="modal-toggle" />
            <div className='modal modal-bottom sm:modal-middle'>
                <div className='h-screen sm:h-auto relative'>
                    <div className={`sm:p-10 h-full max-h-full max-w-full sm:w-[650px] modal-box flex flex-col items-center bg-white ${styles.background}`}>
                        <label htmlFor="modal-info-discount" className="btn border-transparent text-xl text-[#CCCCCC] bg-inherit btn-circle absolute right-3 top-3">✕</label>
                        <h3 className="mt-24 sm:mt-auto font-semibold text-4xl sm:text-5xl underline text-primary">Meus Parabéns!</h3>
                        <p className="py-4 text-primary text-xl text-center font-medium">Você desbloqueou R$ 300,00 em compras + um brinde!</p>
                        <div className="bg-[#F9F9F9] text-[#8D899E] rounded-xl p-4 text-sm text-center">
                            <p>Info: O valor é dividido em 2 compras, totalizando em R$ 150,00 de desconto em cada compra que efetuar. O desconto será aplicado automaticamente na finalização da compra. Além disso você receberá um brinde que será enviado  juntamente com o seu aparelho.</p>
                        </div>
                        <div className="w-[250px] modal-action absolute bottom-0 mb-10 sm:mb-auto sm:static">
                            <label htmlFor="modal-info-discount" className="btn bg-info border-info text-white w-full">Entendi</label>
                        </div>
                    </div>
                    <div className="absolute -left-24 -bottom-24 hidden sm:block">
                        <Image src={ImageSeal} layout="fixed" width={200} height={200} />
                    </div>
                </div>
            </div>
        </>
    )
}