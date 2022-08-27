import { useState } from 'react'

function getStorageValue(key: string, defaultValue: string) {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(key)
        return saved ? JSON.parse(saved) : defaultValue
    }
}

export const useLocalStorage = (key: string, initial: string) => {
    const [value] = useState(() => {
        return getStorageValue(key, initial ?? '')
    })
    return [value]
}
