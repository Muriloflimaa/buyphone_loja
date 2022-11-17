import Image from 'next/image'
import Link from 'next/link'
import ImageInstagram from '../../../assets/images/image-modal-instagram.svg'

export default function AccessInstagram() {
    const handleCloseModalInfoDiscount = () => {
        return document.getElementById('modal-access-instagram')?.classList.remove('modal-open')
    }
    return (
        <>
            <div className='modal modal-bottom sm:modal-middle' id="modal-access-instagram">
                <div className='h-screen w-screen relative flex items-center justify-center'>
                    <div className='h-[448px] w-[700px] bg-white grid grid-cols-12 gap-4 relative'>
                        <label onClick={handleCloseModalInfoDiscount} className="btn border-transparent text-xl text-[#CCCCCC] bg-inherit btn-circle absolute right-3 top-3">✕</label>
                        <div className="relative col-span-5">
                            <Image src={ImageInstagram} layout="fixed" width={400} />
                        </div>
                        <div className="flex items-center justify-center flex-col col-span-7 mx-8">
                            <h1 className="text-black font-bold text-2xl">Antes de ir, nos siga no <span className="text-[#FF316A] text-6xl">Instagram</span></h1>
                            <h2 className="text-[#808080] text-2xl text-center">Para ter acesso a cupons e sorteios exclusivos</h2>
                            <span className="text-[#808080]">@buyphone.match</span>
                            <Link href={'https://instagram.com/buyphone.match'}>
                                <a
                                    target="_blank"
                                    className="btn btn-circle bg-[#FF316A] w-44 h-9 mt-12 text-center border-0 text-white"
                                >
                                    Seguir
                                </a>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}