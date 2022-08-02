const ShippingCard = (props: any) => {
    return (
        <>
            <div className="flex justify-between p-2">
                <p>Resumo</p> <p>Valor total: R$ 2.995,62</p>
            </div>
            <div className="w-full px-2 bg-border h-[1px]"></div>
            <div className="flex flex-col items-center">
                <h1 className="text-3xl text-PrimaryText">
                    Informações para a entrega
                </h1>
            </div>
        </>
    )
}
export default ShippingCard
