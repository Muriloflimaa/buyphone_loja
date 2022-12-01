import Head from 'next/head'
import Image from 'next/image'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import BannerCopaDesktop from '../../assets/images/BannerCopaDesktop.webp'
import BannerCopaMobile from '../../assets/images/BannerCopaMobile.webp'
import ProductCard from '../../components/ProductCard'
import { apiStore } from '../../services/api'
import { IProduct } from '../../types'
import { verificationPrice } from '../../utils/verificationPrice'

interface BlackFridayProps {
  data: { data: Array<IProduct> }
}

export default function BlackFriday({ data }: BlackFridayProps) {
  const { '@BuyPhone:User': user } = parseCookies(undefined) //pega dados do usuário logado
  const [isUser, setIsUser] = useState(false) //state para previnir erro de renderização no usuario logado

  useEffect(() => {
    if (user) {
      setIsUser(true)
    }
  }, [user])

  return (
    <div className="w-full">
      <div className="md:block hidden max-w-[2000px] mx-auto mt-6">
        <Image
          placeholder="blur"
          className="object-contain"
          src={BannerCopaDesktop}
          layout="responsive"
          quality={100}
        />
      </div>
      <div className="block md:hidden">
        <Image
          placeholder="blur"
          className="object-contain"
          src={BannerCopaMobile}
          layout="responsive"
          quality={100}
        />
      </div>
      <div className="max-w-7xl mx-auto">
        <h1 className="md:text-4xl text-3xl font-medium text-center mt-10">
          Ofertas Black da Copa!
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 my-10 px-4 md:px-0">
          {data.data.length > 0 &&
            data.data.map((products: IProduct) => {
              const returnPrice = verificationPrice(products, user, isUser)
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
                    blackfriday={products.blackfriday}
                  />
                )
              )
            })}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  if (
    process.env.NEXT_PUBLIC_BLACK_FRIDAY &&
    !JSON.parse(process.env.NEXT_PUBLIC_BLACK_FRIDAY)
  ) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  try {
    const { data } = await apiStore(
      `products?blackfriday=true&page=1&per_page=100`
    )
    return {
      props: {
        data,
      },
      revalidate: 60 * 30,
    }
  } catch (error) {
    return {
      props: {
        data: null,
      },
    }
  }
}
