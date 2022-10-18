import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
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
  const discount = userData?.type === 1 ? 12.5 : 7
  return (
    <>
      <Head>
        <title>BuyPhone - {data.name}</title>
      </Head>
      <div className="h-auto">
        <div className="flex justify-center mx-5">
          <div className="alert alert-success bg-[#00a843] justify-center my-10 text-sm text-center md:text-md w-full max-w-7xl">
            <FontAwesomeIcon
              icon={faTruckFast}
              className="w-7 h-7 text-PrimaryText hidden md:flex"
            />
            <span className="text-PrimaryText">
              Todos os nossos produtos com frete grátis. Prazo: 10 a 15 dias
              úteis
            </span>
          </div>
        </div>
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
        <a
          href="https://api.whatsapp.com/send?phone=5518997188537"
          target="_blank"
          className="alert alert-success justify-center my-6 text-sm md:text-md max-w-7xl mx-auto text-PrimaryText bg-[#00a843]"
        >
          <FontAwesomeIcon
            icon={faWhatsapp}
            className="w-7 h-7 text-PrimaryText"
          />
          Não encontrou o que procura? Clique aqui para falar com o nosso
          consultor.
        </a>
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
