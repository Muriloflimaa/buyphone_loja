import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import MeetImg from '../assets/images/BannerMeet.png'
import { CardDepoiments } from '../components/CardDepoiment'
import CarouselComponent from '../components/Carousel'
import RegisterMimo from '../components/Modals/Register-Mimo'
import ProductCard from '../components/ProductCard'
import { apiStore } from '../services/api'
import { IProduct } from '../types'
import { verificationPrice } from '../utils/verificationPrice'

//*** images
//*** clientes
import AnaImg from '../assets/images/client_anabrisa.jpg'
import BarbaraImg from '../assets/images/client_barbara.jpg'
import BrendaImg from '../assets/images/client_brenda.jpg'
import CLyviaImg from '../assets/images/client_lyvia.png'
import CGabrielImg from '../assets/images/client_gabriel.png'
import CLuizImg from '../assets/images/client_luiz.png'
import CIgorImg from '../assets/images/client_igor.png'
import CAmandaImg from '../assets/images/client_amanda.png'
//*** banners grandes (desktop)
//light
import Banner1DesktopLight from '../assets/images/banner1desktoplight.webp'
import Banner2DesktopLight from '../assets/images/banner3desktoplight.webp'
//dark
import Banner1DesktopDark from '../assets/images/banner1desktopdark.webp'
import Banner2DesktopDark from '../assets/images/banner2desktopdark.webp'
import BannerBlackFriday from '../assets/images/bannerblackfriday.webp'
//***  minibanners
//light
import Banner1MobileLight from '../assets/images/banner1mobilelight.webp'
import Banner2MobileLight from '../assets/images/banner2mobilelight.webp'
import BannerInstagramLight from '../assets/images/banneriglight.webp'
import BannerLojasLight from '../assets/images/bannerlojaslight.webp'
import MiniBannerWhatsappLigth from '../assets/images/MiniBannerWhatsappLigth.webp'
//dark
import Banner1MobileDark from '../assets/images/banner1mobiledark.webp'
import Banner2MobileDark from '../assets/images/banner2mobiledark.webp'
import BannerInstagramDark from '../assets/images/bannerigdark.webp'
import BannerLojasDark from '../assets/images/bannerlojasdark.webp'
import MiniBannerWhatsappDark from '../assets/images/MiniBannerWhatsappDark.webp'

import MiniBannerBlackFriday from '../assets/images/MiniBannerBlackFriday.webp'
import MiniBannerConheca from '../assets/images/conhecabuyphone.webp'

import BannerDepoiments from '../assets/images/depoiments.webp'
import BannerIphone13Dark from '../assets/images/iphone13prodark.webp'
import BannerIphone13Light from '../assets/images/iphone13prolight.webp'
import CardMatch from '../components/CardMatch'
import ItsModal from '../components/Modals/Its-Match'
import Link from 'next/link'

interface DataProps {
  data: {
    data: Array<IProduct>,
    last_page: number
  }
  darkOrLigth: boolean
}

const Home: NextPage<DataProps> = ({ data, darkOrLigth }) => {
  const [productsMatch, setProductsMatch] = useState<Array<IProduct>>()
  const currentRefCarroussel = useRef<any>()
  const [changeText, setChangeText] = useState(false)
  const [apiNew, setApiNew] = useState<Array<IProduct>>(data.data)
  const [currentSlide, setCurrentSlide] = useState(1)
  const [currentPage, setCurrentPage] = useState(2)

  const handleCarregarProdutos = async () => {
    if (currentPage !== data.last_page) {
      await apiStore.get(`products/?per_page=10&page=${currentPage}`)
        .then((response) => response.data.data)
        .then((newProducts) => setApiNew((prevData) => [...prevData, ...newProducts]));
    }
    setCurrentPage(currentPage + 1)
  }

  async function getProductsMatch() {
    try {
      const { data } = await apiStore.get(`carousel`)
      setProductsMatch(data)
    } catch (error) { }
  }

  function next() {
    const maxCurrent = currentRefCarroussel.current?.itemsRef.length

    if (currentSlide >= maxCurrent) {
      setCurrentSlide(1)
      return
    }
    setCurrentSlide(currentSlide + 1)
  }

  // setTimeout(() => {
  //   setChangeText(!changeText)
  // }, 1400)

  useEffect(() => {
    getProductsMatch()
  }, [])

  return (
    <>
      <div className="absolute -mt-48" id="home"></div>
      <RegisterMimo />
      <Head>
        <title>BuyPhone - Seu match perfeito</title>
      </Head>
      <div className="h-auto -mt-8">
        <div className="block md:hidden">
          <CarouselComponent
            image={
              darkOrLigth
                ? [Banner1MobileDark, Banner2MobileDark]
                : [Banner1MobileLight, Banner2MobileLight]
            }
          />
        </div>
        <div className="md:block hidden">
          <CarouselComponent
            image={
              darkOrLigth
                ? [
                    {
                      ...BannerBlackFriday,
                      link: 'https://api.whatsapp.com/send?phone=5518981367275&text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20BlackFriday.',
                    },
                    Banner1DesktopDark,
                    Banner2DesktopDark,
                  ]
                : [
                    {
                      ...BannerBlackFriday,
                      link: 'https://api.whatsapp.com/send?phone=5518981367275&text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20BlackFriday.',
                    },
                    Banner1DesktopLight,
                    Banner2DesktopLight,
                  ]
            }
          />
        </div>

        <div className="flex flex-col md:flex-row w-full max-w-[2000px] mx-auto mt-3 md:mt-1 gap-1">
          <div className="md:w-1/2">
            <CarouselComponent
              image={
                darkOrLigth
                  ? [
                      {
                        ...MiniBannerBlackFriday,
                        link: 'https://api.whatsapp.com/send?phone=5518981367275&text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20BlackFriday.',
                      },
                      {
                        ...BannerIphone13Dark,
                        link: '/products/apple/iphones/iphone-13-pro',
                      },
                      {
                        ...BannerInstagramDark,
                        link: 'https://www.instagram.com/buyphone.match/',
                      },
                      BannerLojasDark,
                    ]
                  : [
                      {
                        ...MiniBannerBlackFriday,
                        link: 'https://api.whatsapp.com/send?phone=5518981367275&text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20BlackFriday.',
                      },
                      {
                        ...BannerIphone13Light,
                        link: '/products/apple/iphones/iphone-13-pro',
                      },
                      {
                        ...BannerInstagramLight,
                        link: 'https://www.instagram.com/buyphone.match/',
                      },
                      BannerLojasLight,
                    ]
              }
            />
          </div>
          <div className="md:w-1/2">
            <CarouselComponent
              image={
                darkOrLigth
                  ? [
                      {
                        ...BannerDepoiments,
                        link: '#depoiments',
                      },
                      {
                        ...MiniBannerWhatsappDark,
                        link: 'https://api.whatsapp.com/send?phone=5518981367275',
                      },
                      {
                        ...MiniBannerConheca,
                        link: 'https://api.whatsapp.com/send?phone=5518981367275',
                      },
                    ]
                  : [
                      {
                        ...BannerDepoiments,
                        link: '#depoiments',
                      },
                      {
                        ...MiniBannerWhatsappLigth,
                        link: 'https://api.whatsapp.com/send?phone=5518981367275',
                      },
                      {
                        ...MiniBannerConheca,
                        link: 'https://api.whatsapp.com/send?phone=5518981367275',
                      },
                    ]
              }
            />
          </div>
        </div>
        <div className="mt-10">
          <h1 className="text-4xl font-medium text-center">
            Encontre seu Match!
          </h1>

          <Carousel
            ref={currentRefCarroussel}
            swipeable={false}
            showIndicators={false}
            swipeScrollTolerance={3000}
            showStatus={false}
            showThumbs={false}
            showArrows={false}
            emulateTouch={false}
            infiniteLoop={true}
            centerSlidePercentage={80}
            selectedItem={currentSlide}
          >
            {productsMatch &&
              productsMatch.map((res) => {
                return (
                  <CardMatch
                    key={res.id}
                    data={res}
                    changeText={changeText}
                    next={next}
                  />
                )
              })}
          </Carousel>
        </div>

        <div className="md:mt-8">
          <div className="max-w-7xl md:mb-12 mb-6 px-4 mx-auto">
            <div className="hidden md:flex justify-center items-center h-32 md:h-48 overflow-y-hidden md:w-full rounded-3xl shadow-black/40 shadow-md">
              <div className="w-full flex justify-center">
                <div className="w-full h-auto relative flex">
                  <div className="relative w-full h-full pb-[56.25%]">
                    <iframe
                      className="absolute w-full h-full flex border-none m-0"
                      placeholder="blur"
                      loading="lazy"
                      src="https://www.youtube.com/embed/thSPGPnuuNg?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=thSPGPnuuNg"
                      title="YouTube video player"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="md:text-4xl text-2xl font-medium text-center mb-8">
            Todos os produtos!
          </h1>
          <div className="grid grid-cols-2  md:grid-cols-4 mx-auto gap-6 px-5 md:px-0 max-w-7xl">
            {apiNew.length > 0 ? (
              apiNew.map((products: IProduct) => {
                const returnPrice = verificationPrice(products)
                return (
                  returnPrice.ourPrice > 0 && (
                    <ProductCard
                      key={products.id}
                      id={products.id}
                      name={products.name}
                      idCategory={products.category_id}
                      colorPhone={products.color}
                      price={returnPrice.ourPrice}
                      averagePrice={returnPrice.averagePrice}
                      slug={products.slug}
                      slugCategory={products.category_slug}
                      image={products.media[0].original_url}
                      memory={products.memory}
                      changeText={changeText}
                    />
                  )
                )
              })
            ) : (
              <div className="flex gap-3 justify-center">
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
            )}
          </div>
        </div>
        {currentPage !== data.last_page && (
          <div className='flex w-full justify-center'>
            <button className='btn border btn-outline btn-primary w-full max-w-[250px] mt-8' onClick={handleCarregarProdutos}>Ver mais</button>
          </div>
        )
        }
        <div id="depoiments"></div>
        <div className="mt-20">
          <h1 className="md:text-4xl text-2xl font-medium text-center mb-8">
            Depoimentos
          </h1>
          <Carousel
            infiniteLoop
            autoPlay
            interval={5000}
            showIndicators={false}
            swipeable={false}
            showStatus={false}
            showThumbs={false}
            className="max-w-7xl mx-auto mb-8"
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="btn btn-circle border-transparent bg-base-100 shadow-md shadow-black/40 absolute z-10 top-[40%] left-4"
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
                  className="btn btn-circle border-transparent bg-base-100 shadow-md shadow-black/40 absolute z-10 top-[40%] right-4"
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

        <div className="max-w-7xl mx-auto my-10">
          <h1 className="md:text-4xl text-2xl font-medium text-center mb-8">
            Conheça a BuyPhone
          </h1>
          <Link href="/institucional">
            <a>
              <Image
                src={MeetImg}
                layout="responsive"
                className="rounded-3xl cursor-pointer"
              />
            </a>
          </Link>
        </div>
      </div>
      <ItsModal />
    </>
  )
}

export const getServerSideProps = async () => {
  try {
    const { data } = await apiStore.get(`products/`)
    return {
      props: {
        data,
      },
    }
  } catch (error) {
    return {
      props: {
        data: null,
      },
    }
  }
}

export default Home
