import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import BelaSad from '../../assets/images/bela_sad.webp'
import ProductCard from '../../components/ProductCard'
import { AuthContext } from '../../context/AuthContext'
import { setupAPIClient } from '../../services/newApi/api'
import { IProduct } from '../../types'
import { verificationPrice } from '../../utils/verificationPrice'

interface IGetServerProps {
  params: {
    index: string
  }
  ctx: GetServerSidePropsContext
}

export interface DataProps {
  current_page: number
  data: Array<IProduct>
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Array<{
    active: boolean
    label: string
    url: string
  }>
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: null | number
  to: number
  total: number
}

interface ResultSearchProps {
  data: DataProps
  query: string
}

export default function SearchResult({ data, query }: ResultSearchProps) {
  const [products, setProducts] = useState(data)
  const { user } = useContext(AuthContext)
  const [isUser, setIsUser] = useState(false) //state para verificar se existe user

  useEffect(() => {
    setProducts(data)
  }, [data])

  useEffect(() => {
    if (user) {
      setIsUser(true)
    }
  }, [user]) //atualiza o state para nao dar erro de renderizacao

  async function handleChangePagination(page: string) {
    try {
      const { data } = await axios.post(
        `/api/api/store/search${page
          .replace('https://beta-api.buyphone.com.br/store/search', '')
          .replace(`https://api.buyphone.com.br/store/search`, '')}`,
        { query: query }
      )
      setProducts(data)
    } catch (error) {}
  }

  const [changeText, setChangeText] = useState(false)

  setTimeout(() => {
    setChangeText(!changeText)
  }, 1400)

  return (
    <div className="mb-5 mt-8 sm:mt-16">
      {!!products ? (
        <>
          <h1 className="md:text-4xl text-3xl font-medium text-center my-10">
            Você buscou por {query}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 mx-auto gap-6 px-5 md:px-0 max-w-7xl my-5">
            {products &&
              products.data.map((products: IProduct) => {
                const returnPrice = verificationPrice(products, user, isUser)

                return (
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
                    image={products.media[0]?.original_url}
                    memory={products.memory}
                    blackfriday={products.blackfriday}
                  />
                )
              })}
          </div>
          <div className="btn-group max-w-7xl flex justify-center mx-auto rounded-b-md">
            {products?.links.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  handleChangePagination(link.url), window.scrollTo(0, 0)
                }}
                className={`btn btn-xs font-thin normal-case md:btn-sm btn-ghost ${
                  link.active === true ? 'btn-disabled' : ''
                }`}
              >
                {link.label
                  .replace('&laquo; Previous', 'Anterior')
                  .replace('Next &raquo;', 'Próximo')}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-medium text-center">
            Você buscou por {query}
          </h1>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4 py-24 md:py-10">
            <div>
              <Image
                src={BelaSad}
                layout="fixed"
                quality={100}
                width={220}
                height={250}
                alt="Imagem personagem Belatriz"
              />
            </div>
            <div className="mt-4">
              <span className="text-lg text-info-content">
                <span className="font-semibold text-3xl">Ops!</span>
                <p>Não encontramos nenhum resultado para a busca por</p>
                <p className="font-medium text-lg">"{query}"</p>
              </span>
              <ul className="list-disc pl-4 mt-4 text-red-600">
                <li>Verifique se a palavra foi digitada corretamente.</li>
                <li>Tente palavras menos específicas.</li>
                <li>Tente palavras-chave diferentes.</li>
                <li>Faça buscas relacionadas.</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export const getServerSideProps = async ({ params, ctx }: IGetServerProps) => {
  const query = params.index
  const api = setupAPIClient(ctx)
  try {
    const { data } = await api.post('/store/search', {
      query: params.index,
    })
    return {
      props: {
        data,
        query,
      },
    }
  } catch (error) {
    return {
      props: { query },
    }
  }
}
