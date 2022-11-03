import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import AnaImg from '../assets/images/anabrisa.jpg'
import BarbaraImg from '../assets/images/barbara.jpg'
import BrendaImg from '../assets/images/brenda.jpg'
import { CardDepoiments } from '../components/CardDepoiment'
import CarouselComponent from '../components/Carousel'
import RegisterMimo from '../components/Modals/Register-Mimo'
import { apiStore } from '../services/api'
import { ICategory, IProduct } from '../types'
import { verificationPrice } from '../utils/verificationPrice'

//banner desktop----------
//light
import Banner1DesktopLight from '../assets/images/banner1desktoplight.webp'
import Banner2DesktopLight from '../assets/images/banner3desktoplight.webp'
//dark
import Banner1DesktopDark from '../assets/images/banner1desktopdark.webp'
import Banner2DesktopDark from '../assets/images/banner2desktopdark.webp'

//banner desktop-----------
//light
import Banner1MobileLight from '../assets/images/banner1mobilelight.webp'
import Banner2MobileLight from '../assets/images/banner2mobilelight.webp'
//dark
import Banner1MobileDark from '../assets/images/banner1mobiledark.webp'
import Banner2MobileDark from '../assets/images/banner2mobiledark.webp'

import BannerDepoiments from '../assets/images/depoiments.webp'
import BannerIphone13Dark from '../assets/images/iphone13prodark.webp'
import BannerIphone13Light from '../assets/images/iphone13prolight.webp'
import CardMatch from '../components/CardMatch'
import ProductCard from '../components/ProductCard'

interface DataProps {
  data: {
    data: Array<ICategory>
  }
  darkOrLigth: boolean
}

const Home: NextPage<DataProps> = ({ data, darkOrLigth }) => {
  const [productsMatch, setProductsMatch] = useState<Array<IProduct>>()
  const currentRefCarroussel = useRef<any>()

  useEffect(() => {
    getProductsMatch()
  }, [])

  async function getProductsMatch() {
    try {
      const { data } = await apiStore.get(`carousel`)
      setProductsMatch(data)
    } catch (error) {}
  }

  const [currentSlide, setCurrentSlide] = useState(1)

  function next() {
    const maxCurrent = currentRefCarroussel.current?.itemsRef.length

    if (currentSlide >= maxCurrent) {
      setCurrentSlide(1)
      return
    }
    setCurrentSlide(currentSlide + 1)
  }

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
              !!darkOrLigth
                ? [Banner1MobileDark, Banner2MobileDark]
                : [Banner1MobileLight, Banner2MobileLight]
            }
          />
        </div>
        <div className="md:block hidden">
          <CarouselComponent
            image={
              !!darkOrLigth
                ? [Banner1DesktopDark, Banner2DesktopDark]
                : [Banner1DesktopLight, Banner2DesktopLight]
            }
          />
        </div>

        <div className="flex flex-col md:flex-row w-full max-w-[2000px] mx-auto mt-3 md:mt-1 gap-1">
          <div className="md:w-1/2">
            <Link
              className="cursor-pointer"
              href={'/products/apple/iphones/iphone-13-pro'}
              passHref
            >
              <a>
                <Image
                  src={!!darkOrLigth ? BannerIphone13Dark : BannerIphone13Light}
                  quality={100}
                  placeholder="blur"
                ></Image>
              </a>
            </Link>
          </div>
          <div className="md:w-1/2">
            <a href="#depoiments">
              <Image
                src={BannerDepoiments}
                placeholder="blur"
                quality={100}
              ></Image>
            </a>
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
                return <CardMatch key={res.id} data={res} next={next} />
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
            {data.data.map((category) =>
              category.products.map((products: IProduct) => {
                const returnPrice = verificationPrice(products)
                return (
                  <ProductCard
                    key={products.id}
                    id={products.id}
                    name={products.name}
                    idCategory={category.id}
                    colorPhone={products.color}
                    price={returnPrice.ourPrice}
                    averagePrice={returnPrice.averagePrice}
                    slug={products.slug}
                    slugCategory={category.slug}
                    image={products.media[0].original_url}
                    memory={products.memory}
                  />
                )
              })
            )}
          </div>
        </div>
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
          </Carousel>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { data } = await apiStore.get(`categories/`)

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
