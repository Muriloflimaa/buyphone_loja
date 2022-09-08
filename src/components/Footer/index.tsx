import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Image from 'next/image'
import VisaSvg from '../../assets/images/visa.svg'
import McSvg from '../../assets/images/mc.svg'
import EloSvg from '../../assets/images/elo.svg'
import AESvg from '../../assets/images/americanexpress.svg'
import Parc1Svg from '../../assets/images/Group115.svg'
import Parc2Svg from '../../assets/images/image28.svg'
import Parc3Svg from '../../assets/images/image29.svg'
import { ICategory } from '../../types'

interface FooterProps {
    dataCategory: {
        data: Array<ICategory>
    }
}

export default function Footer({ dataCategory }: FooterProps) {
    return (
        <footer className="bg-secondary w-full py-6 pb-32 p-4 md:pb-6">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between gap-y-12 md:gap-y-0 gap-x-6">
                <div>
                    <h3 className="font-bold text-lg mb-3 text-info-content">
                        Categorias
                    </h3>
                    <ul className="text-info-content gap-1 opacity-90">
                        {dataCategory.data.length > 0 ? (
                            dataCategory.data.map((category) => {
                                return (
                                    <li className="link" key={category.id}>
                                        <Link
                                            href={`/${category.slug}`}
                                            passHref
                                        >
                                            <a>{category.name}</a>
                                        </Link>
                                    </li>
                                )
                            })
                        ) : (
                            <span>Categoria de produtos não disponíveis.</span>
                        )}
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-3 text-info-content">
                        Mais informaçoes
                    </h3>
                    <ul className="gap-1 opacity-90 text-info-content">
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
                <div>
                    <h3 className="font-bold text-lg mb-3 text-info-content">
                        Contatos
                    </h3>
                    <ul className="text-sm block leading-6 text-info-content">
                        <li>
                            <Link href={'mailto:contatobuyphone@gmail.com'}>
                                <a className="flex items-center">
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className="mr-2 text-info-content"
                                    />
                                    contatobuyphone@gmail.com
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'https://www.facebook.com/Buyphone.match'}
                            >
                                <a
                                    target="_blank"
                                    className="flex items-center"
                                >
                                    <FontAwesomeIcon
                                        icon={faFacebook}
                                        className="mr-2 text-info-content"
                                    />
                                    BuyPhone
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'https://instagram.com/buyphone.match'}>
                                <a
                                    target="_blank"
                                    className="flex items-center text-info-content"
                                >
                                    <FontAwesomeIcon
                                        icon={faInstagram}
                                        className="mr-2 text-info-content"
                                    />
                                    buyphone.match
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col lg:flex-row gap-12">
                    <div>
                        <h3 className="font-bold text-lg mb-3">
                            Métodos de Pagamento
                        </h3>

                        <ul className="text-sm flex gap-2">
                            <li>
                                <Image src={VisaSvg} layout="fixed"></Image>
                            </li>
                            <li>
                                <Image src={EloSvg} layout="fixed"></Image>
                            </li>
                            <li>
                                <Image src={AESvg} layout="fixed"></Image>
                            </li>
                            <li>
                                <Image src={McSvg} layout="fixed"></Image>
                            </li>
                            <li></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-3">Parceiros</h3>
                        <ul className="text-sm flex gap-2">
                            <li>
                                <Image src={Parc1Svg} layout="fixed"></Image>
                            </li>
                            <li>
                                <Image src={Parc2Svg} layout="fixed"></Image>
                            </li>
                            <li>
                                <Image src={Parc3Svg} layout="fixed"></Image>
                            </li>
                            <li></li>
                        </ul>
                        <small className="text-xs text-info-content">
                            Seus dados estão seguros
                        </small>
                    </div>
                </div>
            </div>

            <div className="flex flex-col px-6 text-center md:text-start md:flex-row md:justify-between md:items-center text-info-content pt-4">
                <div>
                    <h1 className="pt-6">
                        Copyright BuyPhone - 2022. Todos os direitos reservados.
                    </h1>
                    <h2>CNPJ: 40.779.273/0001-09</h2>
                </div>
                <h3>Criado com ❤️ por Buyphone.com.br</h3>
            </div>
        </footer>
    )
}
