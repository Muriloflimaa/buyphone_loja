import Image from 'next/image'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import JuninhoImg from '../../assets/images/juninho.webp'
import ProductCard from '../../components/ProductCard'
import { apiStore } from '../../services/api'
import { IProduct } from '../../types'

interface IParams {
  params: {
    index: string
  }
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
  const { '@BuyPhone:User': user } = parseCookies(undefined) //pega user dos cookies, cookies atualizado pelo authContext
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
      const { data } = await apiStore.post(
        `/search${page
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
    <>
      {!!products ? (
        <>
          <h1 className="text-4xl font-medium text-center">
            Você buscou por {query}
          </h1>
          <div className="grid grid-cols-2  md:grid-cols-4 mx-auto gap-6 px-5 md:px-0 max-w-7xl py-24 md:py-10">
            {products &&
              products.data.map((products: IProduct) => {
                const discount =
                  process.env.NEXT_PUBLIC_BLACK_FRIDAY &&
                  !!JSON.parse(process.env.NEXT_PUBLIC_BLACK_FRIDAY)
                    ? 12.5
                    : !!isUser && user && JSON.parse(user)?.type === 1
                    ? 12.5
                    : 7
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
                const discountPrice = Math.round(
                  averagePrice * (discount / 100)
                )
                const ourPrice = averagePrice - discountPrice //realiza a verificacao de preco, nao foi possivel usar a existente

                return (
                  <ProductCard
                    key={products.id}
                    id={products.id}
                    name={products.name}
                    idCategory={products.category_id}
                    colorPhone={products.color}
                    price={ourPrice}
                    averagePrice={averagePrice}
                    slug={products.slug}
                    slugCategory={products.category_slug}
                    image={products.media[0].original_url}
                    memory={products.memory}
                    changeText={changeText}
                  />
                )
              })}
          </div>
          <div className="btn-group max-w-7xl mx-auto rounded-b-md">
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
              <Image src={JuninhoImg} layout="fixed" width={200} height={250} />
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
    </>
  )
}

export const getServerSideProps = async ({ params }: IParams) => {
  const query = params.index
  try {
    const { data } = await apiStore.post('/search', { query: params.index })
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
