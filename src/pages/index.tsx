import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useRef, useState } from 'react'
import CarouselComponent from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import { SearchContext } from '../context/SearchContext'
import { apiPedidos } from '../services/apiClient'
import { ICategory, IProduct } from '../types'
import { GetUseType } from '../utils/getUserType'
import { verificationPrice } from '../utils/verificationPrice'
import MiniBanner1 from '../assets/images/miniBanner1.webp'
import MiniBanner2 from '../assets/images/miniBanner2.webp'
import MiniBanner3 from '../assets/images/miniBanner3.webp'
import { Carousel } from 'react-responsive-carousel'
import CardMatch from '../components/CardMatch'
import ScrapeImg from '../assets/images/scrape.webp'
import Banner4 from '../assets/images/banner4.webp'

interface DataProps {
  data: {
    data: Array<ICategory>
  }
}

const Home: NextPage<DataProps> = ({ data }) => {
  const currentRefCarroussel = useRef<any>()
  const user = GetUseType()
  const { search } = useContext(SearchContext)
  const [currentSlide, setCurrentSlide] = useState(1)

  function hotProducts(product: Element | Array<IProduct> | any) {
    return product
  }

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
      <Head>
        <title>BuyPhone - Seu match perfeito</title>
      </Head>
      <div className="h-auto -mt-8">
        {/* banner para mobile */}
        <img
          className="md:hidden max-h-full"
          src="https://loja.buyphone.com.br/img/banner-full1.webp"
          alt=""
        />
        <CarouselComponent />
        <div className="flex w-full max-w-[2000px] mx-auto mt-2 ">
          <Carousel
            infiniteLoop
            autoPlay
            interval={2500}
            showStatus={false}
            showThumbs={false}
            showArrows={false}
            showIndicators={false}
            className="w-1/2"
          >
            <Link
              className="cursor-pointer"
              href={'/products/apple/iphones/iphone-13-pro'}
              passHref
            >
              <a>
                <Image src={MiniBanner1} quality={100}></Image>
              </a>
            </Link>
            <Image src={MiniBanner3} quality={100}></Image>
          </Carousel>
          <div className="w-1/2">
            <Link
              className="cursor-pointer"
              href={'/products/apple/iphones/iphone-12-pro'}
              passHref
            >
              <a>
                <Image src={MiniBanner2} quality={100}></Image>
              </a>
            </Link>
          </div>
        </div>
        <div className="mt-10">
          <h1 className="text-4xl font-medium text-center">Match perfeito!</h1>

          <Carousel
            ref={currentRefCarroussel}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            centerSlidePercentage={80}
            centerMode={true}
            selectedItem={currentSlide}
          >
            <CardMatch next={next} />
            <CardMatch next={next} />
            <CardMatch next={next} />
            <CardMatch next={next} />
            <CardMatch next={next} />
          </Carousel>
        </div>
        <div className="max-w-7xl mx-auto">
          <Image src={ScrapeImg} layout="responsive" quality={100} />
        </div>

        <div className="mt-10">
          <h1 className="text-4xl font-medium text-center">Mais vendidos</h1>

          {data.data.length > 0 ? (
            <Carousel
              centerMode={true}
              showIndicators={false}
              showStatus={false}
              showThumbs={false}
              centerSlidePercentage={26}
              infiniteLoop={true}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className="btn btn-circle absolute z-10 top-[50%] left-4"
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
                    className="btn btn-circle absolute z-10 top-[50%] right-4"
                  >
                    ❯
                  </button>
                )
              }
            >
              {data.data.map((category) =>
                hotProducts(category.products).map((products: IProduct) => {
                  const returnPrice = verificationPrice(products, user)
                  return (
                    returnPrice.ourPrice > 0 && (
                      <div className="my-10">
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
                      </div>
                    )
                  )
                })
              )}
            </Carousel>
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
        <div>
          <div className="max-w-7xl my-8 mx-auto">
            <Image src={Banner4} quality={100} layout="responsive"></Image>
          </div>
          <h1 className="text-4xl font-medium text-center mb-8">
            Todos os produtos!
          </h1>

          <div className="grid  grid-cols-2  md:grid-cols-4 mx-auto gap-6 px-5 md:px-0 max-w-7xl">
            {data?.data.length > 0 ? (
              data.data.map((category) =>
                search(category.products).map((products: IProduct) => {
                  const returnPrice = verificationPrice(products, user)
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
        <Link
          href={'https://api.whatsapp.com/send?phone=5518981367275'}
          passHref
        >
          <a
            target="_blank"
            className="alert alert-success justify-center my-10 text-sm md:text-md max-w-7xl mx-auto text-PrimaryText bg-[#00a843]"
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="w-7 h-7 text-PrimaryText"
            />
            Não encontrou o que procura? Clique aqui para falar com o nosso
            consultor.
          </a>
        </Link>
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { data } = await apiPedidos.get(`categories/`)
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
