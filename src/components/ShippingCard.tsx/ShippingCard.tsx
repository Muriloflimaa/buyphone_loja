import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ShippingCard = (props: any) => {
    const router = useRouter()
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (router.asPath == '/shipping/payment') {
            setMessage('Qual a forma de pagamento?')
        } else if (router.asPath == '/shipping/payment/credit') {
            setMessage('Pagamento via cartão de crédito')
        } else if (router.asPath == '/shipping/payment/pix') {
            setMessage('Pagamento via pix')
        } else if (router.asPath == '/shipping/payment/custom') {
            setMessage('Pagamento personalizado')
        } else {
            setMessage('Informações para entrega')
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
                    {message == 'Qual a forma de pagamento?'
                        ? 'Qual a forma de pagamento?'
                        : message == 'Pagamento via cartão de crédito'
                        ? 'Pagamento via cartão de crédito'
                        : message == 'Pagamento via pix'
                        ? 'Pagamento via pix'
                        : message == 'Pagamento personalizado'
                        ? 'Pagamento personalizado'
                        : 'Informações para a entrega'}
                </h1>
            </div>
            <div className="w-full px-2 bg-border h-[1px]"></div>
        </>
    )
}
export default ShippingCard
