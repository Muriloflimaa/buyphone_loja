import React, { useContext, useState } from 'react'
import ProductCard from '../../../../../components/ProductCard'
import { AuthContext } from '../../../../../context/AuthContext'
import { ICategory } from '../../../../../types'
import Head from 'next/head'
import { apiStore } from '../../../../../services/api'

interface DataProps {
  data: ICategory
}

interface IParams {
  params: {
    slugCategory: string
  }
}

export default function Products({ data }: DataProps) {
  const { userData } = useContext(AuthContext)
  const discount =
    process.env.NEXT_PUBLIC_BLACK_FRIDAY &&
    !!JSON.parse(process.env.NEXT_PUBLIC_BLACK_FRIDAY)
      ? 12.5
      : userData?.type === 1
      ? 12.5
      : 7

  const [changeText, setChangeText] = useState(false)

  setTimeout(() => {
    setChangeText(!changeText)
  }, 1400)

  return (
    <>
      <Head>
        <title>BuyPhone - {data.name}</title>
      </Head>
      <div className="h-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 mx-auto py-6 gap-6 px-5 md:px-0 max-w-7xl">
          {data.products.length > 0 ? (
            data.products.map((products) => {
              const itens = [
                products.price,
                products.magalu_price,
                products.americanas_price,
                products.casasbahia_price,
                products.ponto_price,
              ]

              const filteredItens = itens.filter((item) => item)
              const averagePrice =
                filteredItens.length > 0 ? Math.min(...filteredItens) : 0
              const discountPrice = Math.round(averagePrice * (discount / 100))
              const ourPrice = averagePrice - discountPrice
              return ourPrice ? (
                <React.Fragment key={products.id}>
                  <ProductCard
                    key={products.id}
                    id={products.id}
                    name={products.name}
                    colorPhone={products.color}
                    price={ourPrice}
                    averagePrice={averagePrice}
                    idCategory={products.id}
                    slug={products.slug}
                    slugCategory={data.slug}
                    image={products.media[0].original_url}
                    memory={products.memory}
                    changeText={changeText}
                  />
                </React.Fragment>
              ) : (
                <></>
              )
            })
          ) : (
            <span>Categoria de produtos não disponíveis.</span>
          )}
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({ params }: IParams) => {
  try {
    const { data } = await apiStore.get(`categories/${params.slugCategory}`)
    return {
      props: {
        data,
      },
      revalidate: 60 * 30, //30 minutos, se omitir o valor de revalidate, a página nao atualizará,
    }
  } catch (error) {
    return {
      props: {
        data: null,
      },
    }
  }
}

export async function getStaticPaths() {
  try {
    const { data } = await apiStore.get(`categories/`)

    const paths = data.data.map((category: ICategory) => {
      return {
        params: {
          slugCategory: `${category.slug}`,
        },
      }
    })

    return { paths, fallback: false }
  } catch (error) {
    return {}
  }
}
