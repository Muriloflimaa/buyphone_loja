export const formatName = (nome) => {
    const nome2 = nome
        .normalize('NFD')
        .replace(/[^a-zA-Z\s]/g, '')
        .toLowerCase()

    return nome2
}

export const removeDuplicatesColors = (products) => {
    const colors = []
    products.map((product) => {
        colors.push(formatName(product.color))
        return
    })
    return [...new Set(colors)]
}

export const removeDuplicatesMemory = (products) => {
    const memory = []
    products.map((product) => {
        memory.push(product.memory)
        return
    })
    return [...new Set(memory)]
}

export const removeDuplicatesImage = (products) => {
    const image = []
    products.map((product) => {
        image.push(product.media[0].original_url)
        return
    })
    return [...new Set(image)]
}
