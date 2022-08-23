import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ShippingCard = (props: any) => {
    const router = useRouter()
    const [show, setShow] = useState(false)
    const [mensage, setMensage] = useState('')

    useEffect(() => {
        if (router.asPath == '/shipping/payment') {
            setMensage('Qual a forma de pagamento?')
        } else if (router.asPath == '/shipping/payment/credit') {
            setMensage('Pagamento via cartão de crédito')
        } else if (router.asPath == '/shipping/payment/pix') {
            setMensage('Pagamento via pix')
        } else if (router.asPath == '/shipping/payment/custom') {
            setMensage('Pagamento personalizado')
        } else {
            setMensage('Informações para entrega')
        }
    })

    return (
        <>
            <div className="flex justify-between p-2">
                <p>Resumo</p> <p>Valor total: R$ 2.995,62</p>
            </div>
            <div className="w-full px-2 bg-border h-[1px]"></div>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl text-PrimaryText">
                    {mensage == 'Qual a forma de pagamento?'
                        ? 'Qual a forma de pagamento?'
                        : mensage == 'Pagamento via cartão de crédito'
                        ? 'Pagamento via cartão de crédito'
                        : mensage == 'Pagamento via pix'
                        ? 'Pagamento via pix'
                        : mensage == 'Pagamento personalizado'
                        ? 'Pagamento personalizado'
                        : 'Informações para a entrega'}
                </h1>
            </div>
            <div className="w-full px-2 bg-border h-[1px]"></div>
        </>
    )
}
export default ShippingCard
