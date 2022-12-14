import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../../../../../components/ProductCard'
import { ICategory } from '../../../../../types'
import Head from 'next/head'
import { verificationPrice } from '../../../../../utils/verificationPrice'
import { setupAPIClient } from '../../../../../services/newApi/api'
import { AuthContext } from '../../../../../context/AuthContext'

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
  const { user } = useContext(AuthContext)

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
      <div className="h-auto my-10">
        <h1 className="md:text-4xl text-3xl font-medium text-center mb-8">
          {data.name}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 mx-auto gap-6 px-5 md:px-0 max-w-7xl">
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
            <span>Categoria de produtos n??o dispon??veis.</span>
          )}
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({ params }: IParams) => {
  const api = setupAPIClient()
  try {
    const { data } = await api.get(`/store/categories/${params.slugCategory}`)
    return {
      props: {
        data,
      },
      revalidate: 60 * 30, //30 minutos, se omitir o valor de revalidate, a p??gina nao atualizar??,
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
  const api = setupAPIClient()
  try {
    const { data } = await api.get(`/store/categories?per_page=500`)

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
