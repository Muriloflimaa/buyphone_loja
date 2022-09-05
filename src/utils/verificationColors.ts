import { Dispatch, SetStateAction } from 'react'

export const verificationColor = (
    colorPhone: string,
    setColor: Dispatch<SetStateAction<string>>
) => {
    if (colorPhone == 'Preto') {
        setColor('bg-black')
    }
    if (colorPhone == 'Branco') {
        setColor('bg-white')
    }
    if (colorPhone == 'Vermelho') {
        setColor('bg-red-700')
    }
    if (colorPhone == 'Meia-noite') {
        setColor('bg-gray-900')
    }
    if (colorPhone == 'Azul') {
        setColor('bg-sky-700')
    }
    if (colorPhone == 'Azul-Sierra') {
        setColor('bg-sky-200')
    }
    if (
        colorPhone == 'Azul-Pacífico' ||
        colorPhone == 'Azul Pacífico' ||
        colorPhone == 'Azul pacífico'
    ) {
        setColor('bg-cyan-900')
    }
    if (colorPhone == 'Verde' || colorPhone == 'Verde-Alpino') {
        setColor('bg-emerald-200')
    }
    if (colorPhone == 'Grafite') {
        setColor('bg-zinc-500')
    }
    if (colorPhone == 'Prateado' || colorPhone == 'Estelar') {
        setColor('bg-gray-50')
    }
    if (colorPhone == 'Dourado') {
        setColor('bg-amber-100')
    }
    if (colorPhone == 'Rosa') {
        setColor('bg-pink-200')
    }
}
