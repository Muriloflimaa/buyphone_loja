import Link from 'next/link'
import Image from 'next/image'
import iPhoneProduct from '../assets/images/imgcel.svg'
import { ChevronDownIcon, StarIcon } from '@heroicons/react/solid'
import { useState } from 'react'

export default function description() {
    const [qtd, setQtd] = useState(0)
    return (
        <div className="max-w-4xl mx-auto w-full">
            <h1 className="font-medium flex items-start gap-2">
                <Link href={'/'}>
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
                        Detalhes
                    </a>
                </Link>
            </h1>
            <div className="flex w-full mt-10 justify-between">
                <div className="flex flex-col items-center gap-3 w-[20%]">
                    <div className="w-16 h-auto">
                        <Image src={iPhoneProduct} layout="responsive"></Image>
                    </div>
                    <div className="w-16 h-auto">
                        <Image src={iPhoneProduct} layout="intrinsic"></Image>
                    </div>
                    <div className="w-16 h-auto">
                        <Image src={iPhoneProduct} layout="intrinsic"></Image>
                    </div>
                    <div className="w-16 h-auto">
                        <Image src={iPhoneProduct} layout="intrinsic"></Image>
                    </div>
                    <ChevronDownIcon className="w-5 h-5 text-PrimaryText" />
                </div>
                <div className="w-[60%]">
                    <label
                        htmlFor="my-modal-4"
                        className="btn modal-button hover:bg-transparent hover:border-transparent bg-transparent border-transparent"
                    >
                        <div className="w-72 h-auto">
                            <Image
                                src={iPhoneProduct}
                                layout="responsive"
                            ></Image>
                        </div>
                    </label>
                </div>

                <input
                    type="checkbox"
                    id="my-modal-4"
                    className="modal-toggle"
                />
                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                    <label
                        className="modal-box relative flex justify-around gap-4 items-center max-w-3xl h-[60vw]"
                        htmlFor=""
                    >
                        <label
                            htmlFor="my-modal-4"
                            className="btn btn-sm p-2 btn-circle absolute right-4 top-4"
                        >
                            ✕
                        </label>
                        <div className="w-64 h-auto scale-150">
                            <Image
                                src={iPhoneProduct}
                                layout="responsive"
                            ></Image>
                        </div>
                    </label>
                </label>

                <div className="flex flex-col gap-5 text-PrimaryText">
                    <div>
                        <div className="flex gap-2 items-center">
                            <h1 className="text-2xl">iPhone 12</h1>
                        </div>
                        <div className="flex items-center">
                            <StarIcon className="w-5 h-5 text-yellow-500"></StarIcon>
                            <p className="text-PrimaryText text-xs">4,9</p>

                            <p className="text-xs ml-2">(1234 comentários)</p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-2xl">Memória</h1>
                        <div className="flex gap-3">
                            <p className="badge badge-info">64gb</p>
                            <p className="badge badge-info">64gb</p>
                            <p className="badge badge-info">64gb</p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-2xl">Cores</h1>
                        <div className="flex gap-3">
                            <div className="w-5 h-5 rounded-full bg-black border border-white hover:ease-in-out" />
                            <div className="w-5 h-5 rounded-full bg-blue-600 border border-white hover:ease-in-out" />
                            <div className="w-5 h-5 rounded-full bg-yellow-600 border border-white hover:ease-in-out" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="relative w-24 flex justify-center">
                            <h1 className="font-semibold text-base leading-4">
                                R$ 2.215,00
                            </h1>
                            <div className="bg-red-500 w-full mt-2 absolute h-[1px]"></div>
                        </div>
                        <h2 className="text-2xl font-bold">R$ 2.000,00</h2>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="btn-group w-36 flex items-center">
                            <button
                                className="btn text-xs h-auto p-4 min-h-0 border border-white rounded-md"
                                onClick={() => {
                                    setQtd(qtd - 1)
                                }}
                            >
                                -
                            </button>
                            <h1 className="p-5">{qtd}</h1>
                            <button
                                className="btn text-xs h-auto p-4 min-h-0 border border-white rounded-md"
                                onClick={() => {
                                    setQtd(qtd + 1)
                                }}
                            >
                                +
                            </button>
                        </div>
                        <button className="btn btn-primary">Comprar</button>
                    </div>
                    <div className="w-full rounded-lg bg-colorCard flex items-center justify-center p-4 gap-1">
                        <h1>Frete: Grátis</h1>
                        <h2 className="text-xs text-gray-400">
                            (10 a 15 dias úteis)
                        </h2>
                    </div>
                </div>
            </div>
            <div className="flex flex-col my-10 gap-3 text-PrimaryText">
                <div className="w-full rounded-lg bg-colorCard flex items-center justify-start p-4 gap-1">
                    <h1>Descrição</h1>
                </div>
                <div className="css-1yjvs5a eym5xli0">
                    <h2 className="css-1v1b8pm e6dlnub0">Características</h2>
                    <div className="css-qmnq66 eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">Tipo</span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">Barra</span>
                        </div>
                    </div>
                    <div className="css-njoe6m eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">Som </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">
                                MP3 Player
                            </span>
                        </div>
                    </div>
                    <div className="css-qmnq66 eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                Grava vídeo{' '}
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">Sim</span>
                        </div>
                    </div>
                    <div className="css-njoe6m eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                Slot para cartão{' '}
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">Não</span>
                        </div>
                    </div>
                    <div className="css-qmnq66 eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                Rádio FM{' '}
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">Não</span>
                        </div>
                    </div>
                    <div className="css-njoe6m eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                MP3 player{' '}
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">Sim</span>
                        </div>
                    </div>
                    <div className="css-qmnq66 eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                Bluetooth
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">Sim</span>
                        </div>
                    </div>
                    <div className="css-njoe6m eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">Wi-Fi </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">Sim</span>
                        </div>
                    </div>
                    <div className="css-qmnq66 eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                Suporte a GPS{' '}
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">Sim</span>
                        </div>
                    </div>
                    <div className="css-njoe6m eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                Mensagens
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">SMS</span>
                        </div>
                    </div>
                    <div className="css-qmnq66 eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                Mensagens
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">MMS</span>
                        </div>
                    </div>
                    <div className="css-njoe6m eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                Mensagens
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">E-mail</span>
                        </div>
                    </div>
                    <div className="css-qmnq66 eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                Sistema Operacional
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">iOS</span>
                        </div>
                    </div>
                    <div className="css-njoe6m eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                Processador
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">
                                A14 Bionic
                            </span>
                        </div>
                    </div>
                    <div className="css-qmnq66 eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                Tecnologia{' '}
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">GSM</span>
                        </div>
                    </div>
                    <div className="css-njoe6m eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                Tecnologia{' '}
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">3G</span>
                        </div>
                    </div>
                    <div className="css-qmnq66 eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                Tecnologia{' '}
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">4G</span>
                        </div>
                    </div>
                    <div className="css-njoe6m eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                Tecnologia{' '}
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">5G</span>
                        </div>
                    </div>
                    <div className="css-8p77yg eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                Memória interna{' '}
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">
                                64 GB (Total, sendo uma parte usada para o
                                sistema operacional e aplicativos
                                pré-instalados)
                            </span>
                        </div>
                    </div>
                    <div className="css-njoe6m eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">Cor </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">Preto</span>
                        </div>
                    </div>
                    <div className="css-8p77yg eym5xli0">
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-z37na9 eym5xli0">
                                Características Gerais
                            </span>
                        </div>
                        <div className="css-164ipk1 eym5xli0">
                            <span className=" css-2pwwx6 eym5xli0">
                                - Tela Super Retina XDR de 6.1 polegadas* -
                                Ceramic Shield, mais resistente que qualquer
                                vidro de qualquer smartphone - Compatível com
                                5G*** - Chip A14 Bionic, o mais rápido em um
                                smartphone - Sistema avançado de câmera dupla
                                (ultra-angular e grande-angular) de 12 MP; modo
                                Noite, Deep Fusion, HDR Inteligente 3, gravação
                                de vídeo HDR com Dolby Vision 4K - Câmera
                                frontal TrueDepth de 12 MP com modo Noite,
                                gravação de vídeo HDR com Dolby Vision 4K -
                                Classificação IP68 de resistência à água (líder
                                do setor)***** - Compatível com acessórios
                                MagSafe com encaixe fácil e recarga sem fio mais
                                rápida**** - iOS - Material / Composição: Parte
                                da frente em Ceramic Shield, Parte de trás em
                                vidro e estrutura de alumínio - Sensores: Face
                                ID, Barômetro, Giroscópio de três eixos,
                                Acelerômetro, Sensor de proximidade, Sensor de
                                luz ambiente - Modelo MGJ53BR/A
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
