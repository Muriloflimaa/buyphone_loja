import Image from "next/image";
import { useRouter } from "next/router";
import DollarPack from '../../../assets/images/dollar-pack.svg';
import LeftDollar from '../../../assets/images/left-dollar.svg';
import Present from '../../../assets/images/present.svg';
import RightDollar from '../../../assets/images/right-dollar.svg';
import { Input } from "../../InputElement";

export default function RegisterMimo() {
    const router = useRouter();
    console.log(router.query)
    return (
        <>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className={`modal modal-bottom sm:modal-middle ${router.query.user === '123' && "modal-open"}`}>
                <div className="modal-box max-w-lg flex flex-col items-center overflow-hidden">
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

                    <form
                        // onSubmit={handleSubmit(handleSignIn)}
                        className="form-control gap-2 my-7 px-7 w-full"
                    >
                        <Input
                            name="name"
                            type="text"
                            placeholder="Nome completo"
                        // error={errors.email}
                        />
                        <Input
                            name="email"
                            placeholder="E-mail"
                            type="email"
                        // error={errors.password}
                        />
                        <Input
                            name="phone"
                            placeholder="Celular (DDD)"
                            type="text"
                        // error={errors.password}
                        />
                        <button
                            className="btn normal-case py-4 text-PrimaryText w-56 m-auto mt-5 bg-default shadow-md border-0"
                            type="submit"
                        >
                            CADASTRAR
                        </button>
                    </form>
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