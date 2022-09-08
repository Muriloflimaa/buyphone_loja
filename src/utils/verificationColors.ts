export const verificationColor = (colorPhone: string) => {
    if (colorPhone === 'Preto') {
        return 'bg-black'
    } else if (colorPhone === 'Branco' || colorPhone === 'Estelar') {
        return 'bg-white'
    } else if (colorPhone === 'Vermelho') {
        return 'bg-red-500'
    } else if (colorPhone === 'Meia-noite') {
        return 'bg-gray-900'
    } else if (colorPhone === 'Azul') {
        return 'bg-sky-800'
    } else if (colorPhone === 'Azul-Sierra') {
        return 'bg-slate-400'
    } else if (
        colorPhone === 'Azul-Pacífico' ||
        colorPhone === 'Azul Pacífico' ||
        colorPhone === 'Azul pacífico'
    ) {
        return 'bg-sky-700'
    } else if (colorPhone === 'Verde') {
        return 'bg-green-200'
    } else if (colorPhone === 'Verde-Alpino') {
        return 'bg-lime-900'
    } else if (colorPhone === 'Grafite') {
        return 'bg-gray-700'
    } else if (colorPhone === 'Prateado') {
        return 'bg-gray-400'
    } else if (colorPhone === 'Dourado') {
        return 'bg-amber-100'
    } else if (colorPhone === 'Rosa') {
        return 'bg-pink-200'
    }
}
