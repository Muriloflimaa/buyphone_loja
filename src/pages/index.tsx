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
import ProductCard from '../components/ProductCard'
import { apiStore } from '../services/api'
import { ICategory, IProduct } from '../types'
import { verificationPrice } from '../utils/verificationPrice'
import Banner4 from '../assets/images/banner4.webp'

//banner desktop----------
//light
import Banner1DesktopLight from '../assets/images/banner1desktoplight.webp'
import Banner2DesktopLight from '../assets/images/banner3desktoplight.webp'
import Banner3DesktopLight from '../assets/images/banner3desktoplight.webp'
//dark
import Banner1DesktopDark from '../assets/images/banner1desktopdark.webp'
import Banner2DesktopDark from '../assets/images/banner2desktopdark.webp'
import Banner3DesktopDark from '../assets/images/banner3desktopdark.webp'

//banner desktop-----------
//light
import Banner1MobileLight from '../assets/images/banner1mobilelight.webp'
import Banner2MobileLight from '../assets/images/banner2mobilelight.webp'
//dark
import Banner1MobileDark from '../assets/images/banner1mobiledark.webp'
import Banner2MobileDark from '../assets/images/banner2mobiledark.webp'

import BannerIphone13Light from '../assets/images/iphone13prolight.webp'
import BannerIphone13Dark from '../assets/images/iphone13prodark.webp'
import BannerDepoiments from '../assets/images/depoiments.webp'
import CardMatch from '../components/CardMatch'

interface DataProps {
  data: {
    data: Array<ICategory>
  }
  darkOrLigth: boolean
}

const Home: NextPage<DataProps> = ({ data, darkOrLigth }) => {
  const [productsMatch, setProductsMatch] = useState<Array<IProduct>>()
  const [showArrow, setShowArrow] = useState(true)
  const currentRefCarroussel = useRef<any>()

  useEffect(() => {
    window.addEventListener('scroll', changeBackground)
  }, [])

  useEffect(() => {
    getProductsMatch()
  }, [])

  const changeBackground = () => {
    if (window.scrollY > 300) {
      setShowArrow(true)
    } else {
      setShowArrow(false)
    }
  }

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
        {showArrow === true ? (
          <div className="w-full fixed z-50 bottom-24 ml-[85%] md:ml-[95%] md:bottom-12 ">
            <a onClick={() => scroll(0, 100)} href="#home">
              <div className="btn btn-circle border-transparent bg-base-100 shadow-md shadow-black/40">
                <FontAwesomeIcon
                  icon={faChevronUp}
                  className="w-4 marker:h-4 marker:text-primary"
                />
              </div>
            </a>
          </div>
        ) : null}
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
          <h1 className="text-4xl font-medium text-center">Match perfeito!</h1>

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
          <div className="max-w-7xl md:mb-12 mb-6 mx-auto">
            <div className="w-full flex justify-center">
              <div className="w-full h-auto relative flex px-4">
                <div className="relative w-full h-full pb-[50%] md:pb-[15%]">
                  <iframe
                    className="absolute w-full h-48 flex border-none shadow-black/40 shadow-md m-0"
                    placeholder="blur"
                    loading="lazy"
                    src="https://www.youtube.com/embed/thSPGPnuuNg?&autoplay=1&loop=1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <h1 className="md:text-4xl text-2xl font-medium text-center mb-8">
            Todos os produtos!
          </h1>

          <div className="grid grid-cols-2  md:grid-cols-4 mx-auto gap-6 px-5 md:px-0 max-w-7xl">
            {data?.data.length > 0 ? (
              data.data.map((category) =>
                category.products.map((products: IProduct) => {
                  const returnPrice = verificationPrice(products)
                  return (
                    returnPrice.ourPrice > 0 && (
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
                  )
                })
              )
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
              linkVideo="https://www.youtube.com/embed/pMftaexP7RY"
              image={AnaImg}
              profissional="Digital influencer"
              depoiment="BuyPhone muito bem indicada, uma amiga minha indicou"
            />
            <CardDepoiments
              name="Brendha Crizel"
              instagram="www.instagram.com/brendhacrizel/"
              linkVideo="https://www.youtube.com/embed/VswfBYbeWFU"
              image={BrendaImg}
              profissional="Criador(a) de conteúdo digital"
              depoiment="A BuyPhone tem o melhor preço do mercado e você pode escolher como quer pagar"
            />
            <CardDepoiments
              name="Bárbara Brunca"
              instagram="www.instagram.com/barbarabrunca/"
              linkVideo="https://www.youtube.com/embed/OhEwSZSrRUY"
              image={BarbaraImg}
              profissional="Criador(a) de conteúdo digital"
              depoiment="BuyPhone muito bem indicada, uma amiga minha indicou"
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
