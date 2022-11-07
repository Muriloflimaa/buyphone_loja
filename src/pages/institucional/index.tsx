//***** NEXT AND LIBS *****//
import Image from 'next/image'
import dynamic from 'next/dynamic'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Divider } from 'react-daisyui'
import React from 'react'

//***** COMPONENTS *****//
import CardCompare from '../../components/LP/CardCompare'
import Footer from '../../components/LP/Footer'
import { CardDepoiments } from '../../components/LP/CardDepoiment'
import styles from './styles.module.scss'
import CardLojas from '../../components/LP/CardLojas'
const NavBar = dynamic(() => import('../../components/LP/NavBar'), {
  ssr: false,
})

//***** IMAGES *****//
// lojas
import CasasBahiaImg from '../../assets/images/LP/CasasBahia.svg'
import MagazineImg from '../../assets/images/LP/Magalu.svg'
import AmericanasImg from '../../assets/images/LP/Americanas.svg'
import PontoFrioImg from '../../assets/images/LP/PontoFrio.svg'
import ExtraImg from '../../assets/images/LP/Extra.svg'
// arrows
import Arrow1 from '../../assets/images/LP/arrow1.png'
import Arrow2 from '../../assets/images/LP/arrow2.png'
import Arrow3 from '../../assets/images/LP/arrow3.png'
import Arrow4 from '../../assets/images/LP/arrow4.png'
import Arrow5 from '../../assets/images/LP/arrow5.png'
import Arrow6 from '../../assets/images/LP/arrow6.png'
import ArrowWhitePng from '../../assets/images/LP/arrowmobilewhite.png'
import ArrowPurplePng from '../../assets/images/LP/arrowmobilepurple.png'
// persons
import JuninhoBuyPhone from '../../assets/images/LP/juninho.png'
import Juninho2BuyPhone from '../../assets/images/LP/juninho2.png'
import Juninho2CartPhone from '../../assets/images/LP/juninho2cart.png'
import Juninho3Post from '../../assets/images/LP/juninho3post.png'
import GirlBuyPhone from '../../assets/images/LP/girlbuyphone.png'
import Girl2BuyPhone from '../../assets/images/LP/girl2.png'
import Juninho2AirPlane from '../../assets/images/LP/juninho2airplane.png'
// clients
import AnaImg from '../../assets/images/LP/client_anabrisa.jpg'
import BarbaraImg from '../../assets/images/LP/client_barbara.jpg'
import BrendaImg from '../../assets/images/LP/client_brenda.jpg'
import CLyviaImg from '../../assets/images/LP/client_lyvia.png'
import CGabrielImg from '../../assets/images/LP/client_gabriel.png'
import CLuizImg from '../../assets/images/LP/client_luiz.png'
import CIgorImg from '../../assets/images/LP/client_igor.png'
import CAmandaImg from '../../assets/images/LP/client_amanda.png'
// sociais
import WhatsappImg from '../../assets/images/LP/whatsapp.png'
import TikTokPng from '../../assets/images/LP/tiktok.png'
import InstagramPng from '../../assets/images/LP/instagram.png'
import TwitterPng from '../../assets/images/LP/twitter.png'
import LinkedinPng from '../../assets/images/LP/linkedin.png'
// outer
import Bublepng from '../../assets/images/LP/buble.svg'
import MacPng from '../../assets/images/LP/mac.png'
import MachineCardPng from '../../assets/images/LP/machinecard.svg'
import PhoneImg from '../../assets/images/LP/phone.png'
import HeartLikeIg from '../../assets/images/LP/HeartLikeIg.png'
import ShildPng from '../../assets/images/LP/shield.png'

export default function Depoimentos() {
  //duvidas frequentes
  const data = [
    {
      title: 'Porque são tão baratos?',
      paragraph:
        'Nós compramos através de pontos de cartão de crédito e milhas de nossos associados em promoções nas principais lojas do Brasil!            ',
    },
    {
      title: 'Os produtos possuem nota fiscal?',
      paragraph:
        'Sim, enviamos uma declaração de conteúdo com a chave de acesso da NF-e emitida em nome do nosso associado pelas principais lojas (Magalu, Casas Bahia, Ponto, Extra, Americanas), para possíveis consultas no site da receita federal https://www.nfe.fazenda.gov.br/portal/consultaRecaptcha.aspx',
    },
    {
      title: 'Aparelhos tem garantia?',
      paragraph:
        'Com os produtos da Apple você não precisa se preocupar com nota fiscal, pois assim que você ativa o iCloud, consegue ter acesso a todos os benefícios de garantia. Todos os aparelhos possuem garantia mundial de 1 ano da Apple.',
    },
    {
      title: 'Qual a forma de pagamento?',
      paragraph:
        'Pix, cartão de crédito e pagamento personalizado (Entrada no PIX + parcelas no cartão).',
    },
    {
      title: 'Qual prazo de entrega?',
      paragraph:
        'Assim que o pagamento é confirmado o prazo é de 7 a 15 dias úteis.',
    },
    {
      title: 'Só trabalham com aparelhos novos?',
      paragraph:
        'Os produtos são novos (lacrados) não são de vitrine! Comprados nas principais lojas do Brasil.',
    },
    {
      title: 'Qual endereço físico?',
      paragraph:
        'A BuyPhone é uma Startup, não somos uma loja física e trabalhamos de forma digital em todo o Brasil. O endereço de nossa operação, onde nossa equipe trabalha, fica localizado em R: Av Brasilia 2121 Sala 1116, Jardim Nova Yorque, Araçatuba-SP, CEP: 16018-000.',
    },
    {
      title: 'Qual CNPJ da BuyPhone?         ',
      paragraph: 'CNPJ: 45.679.637/0001-94.',
    },
  ]

  return (
    <React.Fragment>
      <NavBar />
      <div id="main" className="bg-primary">
        <div className="w-full pt-36 mx-auto max-w-6xl px-4">
          <div className="w-full flex flex-col-reverse md:flex-row justify-between">
            <div className="flex flex-col text-base-100 ">
              <div className="text-center md:text-start">
                <h1 className="text-base-100/10 uppercase text-5xl lg:text-8xl font-bold lg:absolute lg:leading-3">
                  pague menos
                </h1>
                <h2 className="uppercase tracking-widest text-xl font-bold lg:mt-6 ">
                  VEJA COMO COMPRAR IPHONES PAGANDO
                  <br /> MUITO MAIS BARATO!
                </h2>
              </div>
              <Divider className="bg-base-100/20 divider h-[1px] text-center md:text-start" />
              <span className="font-normal lg:text-xl text-center md:text-start">
                Conosco, você encontra toda linha de iPhones, com o melhor preço
                do mercado, 100% nacionais fornecido pelas maiores lojas do
                Brasil!
              </span>
            </div>

            <div className="h-auto w-full flex justify-center">
              <div className="bg-base-100/20 w-72 h-72 lg:w-96 lg:h-96 flex justify-center items-center relative rounded-[100%]">
                <div className="w-40 lg:w-60 h-auto absolute lg:right-9 lg:top-0 z-10">
                  <Image
                    src={PhoneImg}
                    quality={100}
                    alt="Imagem de Dinheiro"
                  />
                </div>
                <div
                  className={
                    'w-40 h-auto absolute -top-20 right-4 ' + styles.object4
                  }
                >
                  <Image
                    src={HeartLikeIg}
                    quality={100}
                    alt="Coração Instagram"
                  />
                </div>
                <div
                  className={
                    'w-20 h-auto absolute left-0 lg:ml-[24%] bottom-0 mb-[40%] ' +
                    styles.object2
                  }
                >
                  <Image
                    src={HeartLikeIg}
                    quality={100}
                    alt="Coração Instagram"
                  />
                </div>
                <div
                  className={
                    'w-8 h-8 bg-[#EB0045] rounded-[100%] shadow-md shadow-black/30 absolute left-0 lg:ml-[30%] ml-[20%] bottom-0 mb-[30%] ' +
                    styles.object1
                  }
                />
                <div
                  className={
                    'w-12 h-12 bg-[#EB0045] rounded-[100%] shadow-md shadow-black/30 absolute right-12 bottom-0 top-0 mt-[30%] ' +
                    styles.object3
                  }
                />
                <div
                  className={
                    'w-28 h-28 bg-[#EB0045] rounded-[100%] shadow-md shadow-black/30 absolute left-10 bottom-0 top-0 ' +
                    styles.object6
                  }
                />
                <div
                  className={
                    'w-20 h-20 bg-base-100/10 rounded-[100%] shadow-md shadow-black/30 absolute -left-10 bottom-0 top-0 mt-[50%] ' +
                    styles.object5
                  }
                />
                <div
                  className={
                    'w-20 h-20 md:w-32  md:h-32 bg-base-100/10 rounded-[100%] shadow-md shadow-black/30 absolute -right-3 lg:-right-8 bottom-10 ' +
                    styles.object7
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-4">
          <div className="py-14 px-4 relative max-w-6xl mx-auto hidden md:block">
            <div className="w-24 h-[200px] blur-md bg-primary -left-8 absolute top-0 z-10" />
            <div className="w-24 h-[200px] blur-md bg-primary -right-4 md:-right-8 absolute top-0 z-10" />
            <div className={styles.container}>
              <div className={styles.photobanner}>
                <CardLojas image={CasasBahiaImg} width={150} />
                <CardLojas image={MagazineImg} width={120} />
                <CardLojas image={AmericanasImg} width={150} />
                <CardLojas image={PontoFrioImg} width={150} />
                <CardLojas image={ExtraImg} width={120} />
                <CardLojas image={CasasBahiaImg} width={150} />
                <CardLojas image={MagazineImg} width={120} />
                <CardLojas image={AmericanasImg} width={150} />
                <CardLojas image={PontoFrioImg} width={150} />
                <CardLojas image={ExtraImg} width={120} />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center w-full gap-3 py-10 md:hidden">
            <div className="flex justify-around w-full">
              <div className="flex flex-col gap-3">
                <CardLojas image={CasasBahiaImg} width={150} />
                <CardLojas image={MagazineImg} width={120} />
              </div>
              <div className="flex flex-col gap-3">
                <CardLojas image={AmericanasImg} width={150} />
                <CardLojas image={PontoFrioImg} width={150} />
              </div>
            </div>

            <CardLojas image={ExtraImg} width={120} />
          </div>
        </div>
      </div>
      <div id="entenda" className="bg-base-200">
        <div className="flex mx-auto max-w-6xl px-4 py-20 flex-col relative">
          <div className="text-center flex flex-col items-center">
            <h1 className="text-primary/10 uppercase text-5xl md:text-8xl font-bold md:absolute md:leading-3">
              ENTENDA
            </h1>
            <h2 className="text-primary uppercase tracking-widest text-xl font-bold md:mt-6">
              ASSISTA AO VÍDEO E ENTENDA MELHOR!
            </h2>
            <div className="bg-primary/20 w-20 h-[5px] rounded-3xl mt-4"></div>
          </div>

          <div className="flex justify-center w-full max-w-5xl mx-auto mt-11">
            <div className="w-full flex justify-center">
              <div className="w-full h-auto relative flex">
                <div className="relative w-full h-full pb-[56.25%]">
                  <iframe
                    className="absolute w-full h-full flex border-none shadow-black/40 shadow-md m-0"
                    placeholder="blur"
                    loading="lazy"
                    src="https://www.youtube.com/embed/FrYS9Hj_yEk"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary relative py-4 pb-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center relative pt-10 md:pt-20 px-4">
          <div className="text-center flex flex-col items-center">
            <h1 className="text-base-100/5 uppercase text-5xl md:text-8xl font-bold md:absolute md:leading-3">
              Conheça
            </h1>
            <h2 className="text-base-100 md:w-2/3 uppercase tracking-widest text-xl font-bold md:mt-6">
              TODAS AS ETAPAS DO NOSSO MODELO DE VENDAS INOVADOR
            </h2>
          </div>

          <div className="flex flex-col md:flex-row justify-around relative w-full text-base-100 mt-10 md:mt-0">
            <div className="absolute hidden md:flex w-full justify-center -bottom-32">
              <Image src={Arrow1} alt="Arrow1" />
            </div>
            <div className="flex flex-col items-center">
              <Image
                className="max-w-[120px] md:max-w-none"
                src={GirlBuyPhone}
                alt="GirlBuyPhone"
                quality={100}
              />

              <div className="flex flex-col">
                <h1 className="font-semibold text-lg md:text-xl">•Pedido</h1>
                <span className="max-w-xs text-sm md:text-base">
                  O cliente realiza o pedido do produto em nosso site.
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center relative">
              <div className="flex w-full h-36 justify-center md:hidden">
                <Image src={ArrowWhitePng} alt="Arrow2" />
              </div>

              <Image
                className="max-w-[150px] md:max-w-none"
                src={JuninhoBuyPhone}
                quality={100}
                alt="JuninhoBuyPhone"
              />

              <div className="flex flex-col">
                <h1 className="font-semibold text-lg md:text-xl">
                  •Intermediação
                </h1>
                <span className="max-w-xs text-sm md:text-base">
                  Com a ajuda da tecnologia nós notificamos a venda em nosso
                  canal de associados.
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-end w-full relative md:mt-14 z-10 text-base-100">
            <div className="md:absolute hidden md:flex w-full justify-center md:justify-end md:-top-10 md:-left-36">
              <Image src={Arrow2} alt="Arrow 2" />
            </div>
            <div className="absolute hidden md:flex w-full justify-center -bottom-8 right-28">
              <Image src={Arrow3} alt="Arrow3" />
            </div>
            <div className="flex w-full h-36 justify-center md:hidden">
              <Image src={ArrowWhitePng} alt="Arrow2" />
            </div>
            <div className="flex flex-col md:absolute md:left-0 items-center md:mt-64 text-primary">
              <Image
                className="max-w-[150px] md:max-w-none"
                src={Juninho2CartPhone}
                quality={100}
                alt="Juninho2CartPhone"
              />

              <div className="flex flex-col text-base-100 md:text-primary">
                <h1 className="font-semibold text-lg md:text-xl">•Pedido</h1>
                <span className="max-w-xs text-sm md:text-base">
                  O cliente realiza o pedido do produto em nosso site.
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center max-w-md mx-auto md:mx-0 text-base-100 md:pt-14 md:mr-48">
              <div className="flex w-full h-36 justify-center md:hidden">
                <Image src={ArrowWhitePng} alt="Arrow2" />
              </div>

              <Image
                className="max-w-[150px] md:max-w-none"
                src={Juninho2BuyPhone}
                quality={100}
                alt="Juninho2BuyPhone"
                width={240}
                height={300}
              />

              <div className="flex flex-col">
                <h1 className="font-semibold text-lg md:text-xl">•Match</h1>
                <span className="max-w-xs text-sm md:text-base">
                  Nosso associado reserva o pedido em poucos minutos após a
                  notificação.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-base-100 w-full h-auto md:-mt-24 pb-4">
        <div className="max-w-6xl mx-auto w-full flex flex-col relative px-4">
          <div className="hidden md:flex w-full absolute justify-start -ml-10 mt-24 -left-8">
            <Image src={Arrow4} alt="Arrow3" />
          </div>
          <div className="hidden md:flex w-full absolute justify-center -ml-28 mt-[25%]">
            <Image src={Arrow5} alt="Arrow3" />
          </div>

          <div className="flex flex-col md:flex-row items-center md:mt-16 justify-around">
            <div className="flex w-full h-36 justify-center md:hidden">
              <Image src={ArrowPurplePng} alt="Arrow2" />
            </div>
            <div className="flex flex-col md:ml-10 md:items-start items-center max-w-md mx-auto text-primary">
              <Image
                className="max-w-[150px] md:max-w-none"
                src={Juninho3Post}
                quality={100}
                alt="Juninho2CartPhone"
              />

              <div className="flex flex-col">
                <h1 className="font-semibold text-lg md:text-xl">•Logística</h1>
                <span className="max-w-xs text-sm md:text-base">
                  Nossa equipe recebe o produto para conferência e despacha para
                  o endereço de nosso cliente.
                </span>
              </div>
            </div>
            <div className="hidden md:flex justify-center w-full absolute bottom-28 mr-24">
              <Image src={Arrow6} alt="Arrow3" />
            </div>
            <div className="flex w-full h-36 justify-center md:hidden">
              <Image src={ArrowPurplePng} alt="Arrow2" />
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col md:items-start items-center max-w-md mx-auto text-primary md:mt-8">
                <Image
                  className="max-w-[100px] md:max-w-none"
                  src={Girl2BuyPhone}
                  quality={100}
                  alt="Girl2BuyPhone"
                />

                <div className="flex flex-col">
                  <h1 className="font-semibold text-lg md:text-xl">
                    •Recebimento
                  </h1>
                  <span className="max-w-xs text-sm md:text-base">
                    O cliente recebe nosso produto em um prazo médio de 10 dias
                    após a confirmação do pagamento.
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:items-start items-center max-w-md mx-auto text-primary">
                <div className="flex w-full h-36 justify-center md:hidden">
                  <Image src={ArrowPurplePng} alt="Arrow2" />
                </div>
                <Image
                  className="max-w-[150px] md:max-w-none"
                  src={Juninho2AirPlane}
                  quality={100}
                  alt="Juninho2AirPlane"
                />

                <div className="flex flex-col">
                  <h1 className="font-semibold text-lg md:text-xl">
                    •Ganho de milhas
                  </h1>
                  <span className="max-w-xs text-sm md:text-base">
                    Nosso associado recebe as milhas ou pontos ganhos com a
                    compra e pode usar como quiser.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="depoimentos" className="bg-base-200 w-full">
        <div className="max-w-6xl mx-auto px-4 w-full pt-20 pb-10">
          <div className="text-center flex flex-col items-center">
            <h1 className="text-primary/10 uppercase text-5xl md:text-8xl font-bold md:absolute md:leading-3">
              Depoimentos
            </h1>
            <h2 className="text-primary uppercase tracking-widest text-xl font-bold md:mt-6">
              de alguns de nossos clientes
            </h2>
          </div>
          <Carousel
            infiniteLoop
            autoPlay
            interval={5000}
            showIndicators={false}
            swipeable={false}
            showStatus={false}
            showThumbs={false}
            className="max-w-6xl mx-auto"
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="btn btn-circle border-transparent text-black/30 bg-transparent absolute z-10 top-[40%] left-4 text-xl"
                >
                  ❮
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="btn btn-circle border-transparent text-black/30 bg-transparent absolute z-10 top-[40%] right-4 text-xl"
                >
                  ❯
                </button>
              )
            }
          >
            <CardDepoiments
              name="Anna Brisa"
              instagram="www.instagram.com/annabrisaa"
              linkVideo="https://www.youtube.com/embed/pMftaexP7RY?autoplay=0&controls=0&showinfo=0&playlist=pMftaexP7RY"
              image={AnaImg}
              profissional="Digital influencer"
              depoiment="Foi uma experiência muito boa de compra!"
            />
            <CardDepoiments
              name="Brendha Crizel"
              instagram="www.instagram.com/brendhacrizel/"
              linkVideo="https://www.youtube.com/embed/VswfBYbeWFU?autoplay=0&controls=0&showinfo=0&playlist=VswfBYbeWFU"
              image={BrendaImg}
              profissional="Criador(a) de conteúdo digital"
              depoiment="A BuyPhone tem o melhor preço do mercado e você pode escolher como quer pagar"
            />
            <CardDepoiments
              name="Bárbara Brunca"
              instagram="www.instagram.com/barbarabrunca/"
              linkVideo="https://www.youtube.com/embed/OhEwSZSrRUY?autoplay=0&controls=0&showinfo=0&playlist=OhEwSZSrRUY"
              image={BarbaraImg}
              profissional="Criador(a) de conteúdo digital"
              depoiment="É uma nova forma muito legal, de comprar produtos da apple!"
            />
            <CardDepoiments
              name="Lyvia Nagib Fulanetti"
              instagram="www.instagram.com/lyvianagib/"
              linkVideo="https://www.youtube.com/embed/Npmw1UcMnxM?autoplay=0&controls=0&showinfo=0&playlist=Npmw1UcMnxM"
              image={CLyviaImg}
              profissional="Fisioterapeuta"
              depoiment="Comprei dois celulares, um pra mim e um pra
                     minha irmã, dois iPhones 11. O preço é muito
                     abaixo. Vale muito a pena!"
            />
            <CardDepoiments
              name="Gabriel Martins"
              instagram="www.instagram.com/gabrielpessoamartins/"
              linkVideo="https://www.youtube.com/embed/w1Sv0QIFxyA?autoplay=0&controls=0&showinfo=0&playlist=w1Sv0QIFxyA"
              image={CGabrielImg}
              profissional="Empresário"
              depoiment="Celular zero, lacrado na caixa! Pesquisei
                     bastante em vários lugares e o preço deles é bem
                     abaixo do mercado."
            />
            <CardDepoiments
              name="Luiz Henrique Puertas"
              instagram="www.instagram.com/luizpuertas/"
              linkVideo="https://www.youtube.com/embed/t3U1o2I9WvI?autoplay=0&controls=0&showinfo=0&playlist=t3U1o2I9WvI"
              image={CLuizImg}
              profissional="Vendas de sistemas fotovoltaicos"
              depoiment="Um preço muito bom, paguei muito barato no
                     Iphone original lacrado!"
            />
            <CardDepoiments
              name="Igor Fortin"
              instagram="www.instagram.com/igorfortin/"
              linkVideo="https://www.youtube.com/embed/vH0EjiMyZaQ?autoplay=0&controls=0&showinfo=0&playlist=vH0EjiMyZaQ"
              image={CIgorImg}
              profissional="Advogado"
              depoiment="IPhone 12 que adquiri na BuyPhone, perfeito!
                     Novo, com ótimas condições de preço e
                     parcelamento."
            />
            <CardDepoiments
              name="Amanda L. Prado"
              instagram="www.instagram.com/_amandalprado/"
              linkVideo="https://www.youtube.com/embed/xzX8LJv7VuQ?autoplay=0&controls=0&showinfo=0&playlist=xzX8LJv7VuQ"
              image={CAmandaImg}
              profissional="🧿"
              depoiment="A Amanda adorou o produto que comprou na
                     BuyPhone."
            />
          </Carousel>
        </div>
      </div>
      <div id="social" className="bg-base-200 w-full">
        <div className="max-w-6xl mx-auto pt-10 md:pb-24 px-4 flex flex-col">
          <div className="text-center flex flex-col items-center">
            <h1 className="text-primary/10 uppercase text-5xl md:text-8xl font-bold md:absolute md:leading-3">
              Redes sociais
            </h1>
            <h2 className="text-primary md:w-1/3 uppercase tracking-widest text-xl font-bold md:mt-6">
              Redes sociais
            </h2>
          </div>
          <div className="grid grids-cols-1 md:grid-cols-4 gap-8 py-24 md:p-0 md:pt-12">
            <CardCompare
              image={InstagramPng}
              title="Instagram"
              paragraph="Seu match perfeito!
                     Compre seu iPhone com o melhor preço do mercado."
              link="https://www.instagram.com/buyphone.match/"
            />
            <CardCompare
              link="https://www.linkedin.com/company/buyphonematch"
              image={LinkedinPng}
              title="LinkedIn"
              paragraph="Seu match perfeito!
                     Compre seu iPhone com o melhor preço do mercado."
            />
            <CardCompare
              link="https://twitter.com/buyphoneoficial"
              image={TwitterPng}
              title="Twitter"
              paragraph="O melhor de tudo isso, é que conseguimos SEMPRE cobrir os preços das principais lojas do Brasil."
            />
            <CardCompare
              link="https://www.tiktok.com/@buyphoneoficial"
              image={TikTokPng}
              title="TikTok"
              paragraph="Oferecemos suporte acessível com atendimento humanizado através dos canais de comunicação mais utilizados."
            />
          </div>
        </div>
      </div>

      <div id="contato" className="bg-primary w-full">
        <div className="max-w-6xl mx-auto px-4 w-full flex flex-col py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex justify-start max-w-lg">
              <div className="flex flex-col items-center text-center md:text-start md:items-start gap-4">
                <h1 className="text-3xl text-base-100">
                  Compre pelo Whatsapp
                  <br /> Tire suas duvidas juntamente com o nosso consultor.
                </h1>
                <a target={'_blank'} href="https://wa.me/5518981367275">
                  <button className="btn btn-success border-none rounded-3xl bg-[#02900F] text-base-100 w-44">
                    Clique aqui
                  </button>
                </a>
              </div>
            </div>
            <div className="flex w-64 mt-10 justify-end md:-mt-32">
              <Image src={WhatsappImg} quality={100} alt="WhatsappImg" />
            </div>
          </div>
        </div>
      </div>
      <div id="compare" className="bg-base-200 w-full">
        <div className="max-w-6xl mx-auto pt-10 md:py-24 px-4 flex flex-col">
          <div className="text-center flex flex-col items-center">
            <h1 className="text-primary/10 uppercase text-5xl md:text-8xl font-bold md:absolute md:leading-3">
              COMPARE
            </h1>
            <h2 className="text-primary md:w-1/3 uppercase tracking-widest text-xl font-bold md:mt-6">
              ENTENDA nossos diferencias e faça a sua melhor escolha
            </h2>
          </div>
          <div className="grid grids-cols-1 md:grid-cols-4 gap-8 py-24 md:p-0 md:pt-12">
            <CardCompare
              image={ShildPng}
              title="Segurança"
              paragraph="Garantimos a segurança nas transações entre usuários
                           e privacidade de dados entre todos os envolvidos."
            />
            <CardCompare
              image={MacPng}
              title="Facilidade"
              paragraph=" Nossa forma de comprar é inovadora e com o
                     diferencial de condições de pagamentos
                     personalizadas."
            />
            <CardCompare
              image={MachineCardPng}
              title="Melhor preço"
              paragraph="O melhor de tudo isso, é que conseguimos SEMPRE
                     cobrir os preços das principais lojas do Brasil."
            />
            <CardCompare
              image={Bublepng}
              title="Suporte"
              paragraph=" Oferecemos suporte acessível com atendimento
                     humanizado através dos canais de comunicação mais
                     utilizados."
            />
          </div>
        </div>
      </div>
      <div className="bg-primary w-full">
        <div className="max-w-6xl mx-auto flex flex-col px-4 py-24 relative">
          <div className="text-center flex flex-col items-center pb-10">
            <h1 className="text-base-100/5 uppercase text-5xl md:text-7xl font-bold md:absolute md:leading-3">
              Dúvidas frequentes
            </h1>
            <h2 className="text-base-100 uppercase tracking-widest text-2xl font-bold md:mt-[10px]">
              Dúvidas frequentes
            </h2>
          </div>

          {data.map((res) => {
            return (
              <div key={res.title} className="collapse collapse-arrow w-full">
                <input id="Check1" type="checkbox" />
                <label htmlFor="Check1"></label>
                <div className="collapse-title text-xl font-medium text-white bg-base-100/10 w-full">
                  {res.title}
                </div>

                <div className="collapse-content text-white">
                  <div className="w-full h-[1px] bg-dark_doubts"></div>
                  <div className="w-full h-[1px] bg-dark_doubts"></div>
                  <p className="p-4">{res.paragraph}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}
