import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { apiPedidos } from '../services/apiClient'
import { ICategory } from '../types'
import { GetUseType } from '../utils/getUserType'
import { PersistentLogin } from '../utils/PersistentLogin'
import { verificationPrice } from '../utils/verificationPrice'

interface DataProps {
    data: {
        data: Array<ICategory>
    }
}

export default function Teste({ data }: DataProps) {
    const user = GetUseType()

    const [inputSearch, setInputSearch] = useState('')
    const [searchParam] = useState(['name', 'memory', 'color'])

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
                        // value={inputSearch}
                        onChange={(e) => setInputSearch(e.target.value)}
                    />
                    <span className="sr-only">Search countries here</span>
                </label>
            </div>
            <ul className="grid grid-cols-4 ">
                {data.data.length > 0 ? (
                    data.data.map((category) =>
                        search(category.products).map((products: any) => {
                            const returnPrice = verificationPrice(
                                products,
                                user
                            )
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
                    <span>Categoria de produtos não disponíveis.</span>
                )}
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
