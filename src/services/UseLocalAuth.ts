import { useState } from 'react'

function get(key: any, defaultValue: any) {
    if (typeof window !== 'undefined') {
        const value = window.localStorage.getItem(key) || defaultValue
        try {
            return JSON.parse(value)
        } catch (error) {
            return value
        }
    }
}
export const useLocalStorage = (key: any, initial: any) => {
    const [value] = useState(() => {
        return get(key, initial ?? '')
    })
    return [value]
}

export const set = (key: any, value: any) => {
    if (typeof value !== 'string') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}
