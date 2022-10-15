import Image from "next/image";
import { useRouter } from "next/router";
import DollarPack from '../../../assets/images/dollar-pack.svg';
import LeftDollar from '../../../assets/images/left-dollar.svg';
import Present from '../../../assets/images/present.svg';
import RightDollar from '../../../assets/images/right-dollar.svg';
import NewsletterSubscribe from "./MailchimpSubscribe";

export default function RegisterMimo() {
    const router = useRouter();

    return (
        <>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className={`modal glass bg-opacity-30 modal-bottom sm:modal-middle ${router.query.utm_source && router.query.utm_medium && router.query.utm_campaign && "modal-open"}`}>
                <div className="modal-box max-w-lg flex flex-col items-center overflow-hidden m-5 sm:m-0">
                    <div className="flex justify-center items-center relative">
                        <Image
                            src={DollarPack}
                            className="absolute left-7"
                            width={200}
                            height={180}
                            layout="fixed"
                            alt="Imagem pacote de dinheiro"
                        />
                        <h1 className="text-6xl absolute bottom-6">+</h1>
                        <Image
                            src={Present}
                            className="absolute left-5"
                            width={200}
                            height={180}
                            layout="fixed"
                            alt="Imagem pacote de dinheiro"
                        />
                    </div>
                    <div className="mx-6">
                        <h3 className="text-2xl text-center text-default">Desbloqueie <span className="font-medium">R$300,00</span> de desconto + uma surpresa
                            <span className="text-slate-400"> na compra de qualquer iPhone!</span></h3>
                    </div>
                    <NewsletterSubscribe />
                    <div className="absolute w-[36rem] -left-8 bottom-0 flex justify-between -z-10">
                        <Image
                            src={LeftDollar}
                            width={200}
                            height={160}
                            layout="fixed"
                            alt="Imagem pacote de dinheiro"
                        />
                        <Image
                            src={RightDollar}
                            width={200}
                            height={160}
                            layout="fixed"
                            alt="Imagem pacote de dinheiro"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}