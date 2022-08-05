import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MailIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { ReactElement } from 'react'
import MyBottomNavigation from '../MyBottomNavigation/MyBottomNavigation'
import NavBar from '../NavBar/NavBar'

interface Homeprops {
    children: ReactElement
}

const Body = ({ children }: Homeprops) => {
    return (
        <div className="max-w-[1600px] mx-auto">
            <NavBar />
            {children}
            <div className="bg-colorCard py-6 pb-32 p-4 md:pb-6">
                <div className="mx-auto max-w-7xl">
                    <div className="py-6">
                        <div className="h-[1px] w-full bg-white max-w-7xl mx-auto"></div>
                    </div>

                    <div className="gap-6 px-6 grid grid-cols-1 md:grid-cols-4">
                        <div>
                            <div className="mx-auto">
                                <h1 className="text-3xl text-PrimaryText">
                                    Departamentos
                                </h1>
                                <ul className="text-PrimaryText gap-1 opacity-50">
                                    <li>iPhone XR</li>
                                    <li>iPhone 11</li>
                                    <li>iPhone 12</li>
                                    <li>iPhone 12 Pro Max</li>
                                    <li>iPhone 13</li>
                                    <li>iPhone 13 Pro</li>
                                    <li>iPhone 13 Pro Max</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <div className="mx-auto">
                                <h1 className="text-3xl text-PrimaryText">
                                    Mais informaçoes
                                </h1>
                                <ul className="text-PrimaryText gap-1 opacity-50">
                                    <li>informações de entrega</li>
                                    <Link href={'/politics'} passHref>
                                        <li className="link cursor-pointer">
                                            Política de privacidade
                                        </li>
                                    </Link>
                                    <Link href={'/terms'} passHref>
                                        <li className="link cursor-pointer">
                                            Termos e condições
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <div className="mx-auto">
                                <h1 className="text-3xl text-PrimaryText">
                                    Contatos
                                </h1>
                                <ul className="text-sm block leading-6">
                                    <li>
                                        <a
                                            href="mailto:contatobuyphone@gmail.com"
                                            className="flex items-center gap-2"
                                        >
                                            <MailIcon className="w-5 h-5" />
                                            contatobuyphone@gmail.com
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.facebook.com/Buyphone.match"
                                            target="_blank"
                                            className="flex items-center gap-2"
                                        >
                                            <FontAwesomeIcon
                                                className="w-5 h-5"
                                                icon={faFacebook}
                                            />
                                            BuyPhone
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://instagram.com/buyphone.match"
                                            target="_blank"
                                            className="flex items-center gap-2"
                                        >
                                            <FontAwesomeIcon
                                                className="w-5 h-5"
                                                icon={faInstagram}
                                            />
                                            buyphone.match
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="py-6">
                        <div className="h-[1px] w-full bg-white max-w-7xl mx-auto"></div>
                    </div>
                    <div className="flex flex-col px-6 text-center md:text-start md:flex-row md:justify-between md:items-center">
                        <div>
                            <h1 className="pt-6">
                                Copyright BuyPhone - 2022. Todos os direitos
                                reservados.
                            </h1>
                            <h2>CNPJ: 40.779.273/0001-09</h2>
                        </div>
                        <h3>Criado com ❤️ por Buyphone.com.br</h3>
                    </div>
                </div>
            </div>
            <MyBottomNavigation />
        </div>
    )
}
export default Body
