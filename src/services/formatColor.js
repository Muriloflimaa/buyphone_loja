export const formatColor = (nome) => {
    const nome2 = nome
        .normalize('NFD')
        .replace(/[^a-zA-Z\s]/g, '')
        .toLowerCase()

    return nome2
}
