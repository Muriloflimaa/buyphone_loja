import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { apiPedidos } from '../services/apiClient'
import { GetUseType } from '../utils/getUserType'
import { PersistentLogin } from '../utils/PersistentLogin'
import { verificationPrice } from '../utils/verificationPrice'

export default function Teste({ data }: any) {
    const [items, setItems] = useState([])
    const [inputSearch, setInputSearch] = useState('')
    const [searchParam] = useState(['name'])
    const user = GetUseType()

    useEffect(() => {
        setItems(data.data)
    }, [])

    const dataObject = Object.values(items)

    function search(items: any) {
        return items.filter((item: any) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(inputSearch.toLowerCase()) > -1
                )
            })
        })
    }

    function somar(item: any, indice: number) {
        return (
            <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                idCategory={item.id}
                colorPhone={item.color}
                price={2}
                averagePrice={2}
                slug={item.slug}
                slugCategory={item.slug}
                image={item.media[0].original_url}
                memory={item.memory}
            />
        )
    }

    return (
        <div className="p-10">
            <div className="search-wrapper">
                <label htmlFor="search-form">
                    <input
                        type="search"
                        name="search-form"
                        id="search-form"
                        className="p-3"
                        placeholder="Search for..."
                        value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                    />
                    <span className="sr-only">Search countries here</span>
                </label>
            </div>
            {/* {search(dataObject).map((item: any) => {
                item.products.map((res) => {
                    console.log(res.name)
                    return <li key={res.id}>{res.name}</li>
                })
            })} */}
            <ul className="grid grid-cols-4 ">
                {search(dataObject).map((item: any) => {
                    item.products.map((products: any) => {
                        const returnPrice = verificationPrice(products)
                        console.log(products)
                        return (
                            returnPrice.ourPrice > 0 && (
                                <ProductCard
                                    key={products.id}
                                    id={products.id}
                                    name={products.name}
                                    idCategory={item.id}
                                    colorPhone={products.color}
                                    price={returnPrice.ourPrice}
                                    averagePrice={returnPrice.averagePrice}
                                    slug={products.slug}
                                    slugCategory={item.slug}
                                    image={products.media[0].original_url}
                                    memory={products.memory}
                                />
                            )
                        )
                    })
                })}
            </ul>
        </div>
    )
}

export const getStaticProps = PersistentLogin(async (ctx) => {
    try {
        const { data } = await apiPedidos.get(`categories/`)
        return {
            props: {
                data,
            },
            revalidate: 60 * 60 * 6,
        }
    } catch (error) {
        return {
            props: {
                data: null,
            },
        }
    }
})
