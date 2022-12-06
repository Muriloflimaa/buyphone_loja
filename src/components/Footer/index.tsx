import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import Image from 'next/image'
import VisaSvg from '../../assets/images/visa.svg'
import McSvg from '../../assets/images/mc.svg'
import EloSvg from '../../assets/images/elo.svg'
import AESvg from '../../assets/images/americanexpress.svg'
import Parc1Svg from '../../assets/images/cloudflare.webp'
import Parc2Svg from '../../assets/images/starkbank.webp'
import Parc3Svg from '../../assets/images/pagseguro.png'
import { ICategory } from '../../types'
import React, { useEffect, useState } from 'react'
import { apiStore } from '../../services/api'
import SeloBlintadoGooglePng from '../../assets/images/google.png'
import SeloBlintadoPng from '../../assets/images/siteblindado.png'

export default function Footer() {
  const [dataApi, setDataApi] = useState<Array<ICategory>>()

  useEffect(() => {
    async function Data() {
      try {
        const { data } = await apiStore.get(`categories/`)
        setDataApi(data.data)
      } catch (error) {
        setDataApi(undefined)
      }
    }
    Data()
  }, [])

  return (
    <footer className="bg-secondary w-full py-6 pb-32 p-4 md:pb-6 max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between gap-y-12 md:gap-y-0 gap-x-6">
        <div>
          <h3 className="font-medium text-lg mb-3 text-info-content">
            Categorias
          </h3>
          <ul className="text-info-content gap-1 opacity-90">
            {dataApi ? (
              dataApi.map((category) => {
                return (
                  <li key={category.id}>
                    <Link
                      href={`/products/apple/iphones/${category.slug}`}
                      passHref
                    >
                      <a className="w-max link-hover">{category.name}</a>
                    </Link>
                  </li>
                )
              })
            ) : (
              <li>
                <div className="flex gap-3">
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <h1>Carregando...</h1>
                </div>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-lg mb-3 text-info-content">
            Mais informações
          </h3>
          <ul className="gap-1 opacity-90 text-info-content">
            <Link href={'/account/politics'} passHref>
              <li className="link link-hover cursor-pointer">
                Política de privacidade
              </li>
            </Link>
            <Link href={'/account/terms'} passHref>
              <li className="link link-hover cursor-pointer">
                Termos e condições
              </li>
            </Link>
            <Link href={'/institucional'} passHref>
              <li className="link link-hover cursor-pointer">
                Conheça a BuyPhone
              </li>
            </Link>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-lg mb-3 text-info-content">
            Contatos
          </h3>
          <ul className="text-sm block leading-6 text-info-content">
            <li className="link-hover">
              <Link href={'mailto:contato@buyphone.com.br'}>
                <a className="flex items-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="mr-2 w-5 h-5 text-info-content"
                  />
                  contato@buyphone.com.br
                </a>
              </Link>
            </li>
            <li className="link-hover">
              <Link href={'https://www.facebook.com/Buyphone.match'}>
                <a target="_blank" className="flex items-center">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="mr-2 w-5 h-5 text-info-content"
                  />
                  BuyPhone
                </a>
              </Link>
            </li>
            <li className="link-hover">
              <Link href={'https://instagram.com/buyphone.match'}>
                <a
                  target="_blank"
                  className="flex items-center text-info-content"
                >
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="mr-2 w-5 h-5 text-info-content"
                  />
                  buyphone.match
                </a>
              </Link>
            </li>
            <li className="link-hover">
              <Link href={'https://wa.me/5518981367275'}>
                <a
                  target="_blank"
                  className="flex items-center text-info-content"
                >
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    className="mr-2 w-5 h-5 text-info-content"
                  />
                  (18) 98136-7275
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="font-medium text-lg mb-3">Parceiros</h3>
              <ul className="menu menu-horizontal md:menu-vertical text-sm flex gap-2">
                <li className="bg-white p-2 rounded-md w-fit">
                  <Image
                    src={Parc1Svg}
                    width={60}
                    height={30}
                    className="object-contain"
                    layout="fixed"
                    quality={100}
                  ></Image>
                </li>
                <li className="bg-white p-2 rounded-md w-fit">
                  <Image
                    src={Parc2Svg}
                    width={60}
                    height={30}
                    className="object-contain "
                    layout="fixed"
                    quality={100}
                  ></Image>
                </li>
                <li className="bg-white p-2 rounded-md w-fit">
                  <Image
                    src={Parc3Svg}
                    width={60}
                    height={30}
                    className="object-contain"
                    layout="fixed"
                    quality={100}
                  ></Image>
                </li>
              </ul>
              <small className="text-xs text-info-content">
                Seus dados estão seguros
              </small>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-3">Métodos de Pagamento</h3>

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
            <div className="mt-8">
              <h3 className="font-medium text-lg mb-3">Verificações</h3>
              <ul className="flex items-center">
                <li className="w-[50%]">
                  <a
                    target={'_blank'}
                    href="https://www.sslshopper.com/ssl-checker.html#hostname=buyphone.com.br"
                  >
                    <Image
                      src={SeloBlintadoPng}
                      layout="responsive"
                      quality={100}
                    ></Image>
                  </a>
                </li>
                <li className="w-[50%]">
                  <a
                    target={'_blank'}
                    href="https://transparencyreport.google.com/safe-browsing/search?url=https:%2F%2Fbuyphone.com.br%2F&hl=pt_BR"
                  >
                    <Image
                      src={SeloBlintadoGooglePng}
                      layout="responsive"
                      quality={100}
                    ></Image>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-6 text-center md:text-start md:flex-row md:justify-between md:items-center text-info-content pt-4">
        <div>
          <h1 className="pt-6">
            Copyright BuyPhone - 2022. Todos os direitos reservados.
          </h1>
          <h2>CNPJ: 45.679.637/0001-94</h2>
          <h3>Araçatuba - SP, 16.018-000, Brasil</h3>
        </div>
        <h3>Criado com ❤️ por Buyphone.com.br</h3>
      </div>
    </footer>
  )
}
