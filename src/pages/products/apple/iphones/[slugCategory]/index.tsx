import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../../../../../components/ProductCard'
import { AuthContext } from '../../../../../context/AuthContext'
import { ICategory } from '../../../../../types'
import Head from 'next/head'
import { apiStore } from '../../../../../services/api'
import { verificationPrice } from '../../../../../utils/verificationPrice'
import { parseCookies } from 'nookies'

interface DataProps {
  data: ICategory
}

interface IParams {
  params: {
    slugCategory: string
  }
}

export default function Products({ data }: DataProps) {
  const [isUser, setIsUser] = useState(false) //state para verificar se existe user
  const { '@BuyPhone:User': user } = parseCookies(undefined) //pega user dos cookies, cookies atualizado pelo authContext

  useEffect(() => {
    if (user) {
      setIsUser(true)
    }
  }, [user]) //atualiza o state para nao dar erro de renderizacao
  return (
    <>
      <Head>
        <title>BuyPhone - {data.name}</title>
      </Head>
      <div className="h-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 mx-auto py-6 gap-6 px-5 md:px-0 max-w-7xl">
          {data.products.length > 0 ? (
            data.products.map((products) => {
              const returnPrice = verificationPrice(products, user, isUser)
              return (
                <React.Fragment key={products.id}>
                  <ProductCard
                    key={products.id}
                    id={products.id}
                    name={products.name}
                    colorPhone={products.color}
                    price={returnPrice.ourPrice}
                    averagePrice={returnPrice.averagePrice}
                    idCategory={products.id}
                    slug={products.slug}
                    slugCategory={data.slug}
                    image={products.media[0]?.original_url}
                    memory={products.memory}
                    blackfriday={products.blackfriday}
                  />
                </React.Fragment>
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
    const { data } = await apiStore.get(`categories?per_page=500`)

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
