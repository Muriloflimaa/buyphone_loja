import { useState } from 'react'

export const SearchConst = (valueInput: string) => {
    const searchParam = ['name', 'memory', 'color']

    function search(items: any) {
        return items.filter((item: any) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(valueInput.toLowerCase()) > -1
                )
            })
        })
    }
    return { search }
}
