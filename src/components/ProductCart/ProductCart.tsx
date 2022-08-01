import Image from 'next/image'
import { TrashIcon } from '@heroicons/react/solid'

const ProductCart = (props: any) => {
    return (
        <div className="bg-colorCard rounded-xl shadow-md w-full h-auto p-2 flex  justify-between text-PrimaryText text-xs">
            <div className="flex">
                <div className="w-auto h-auto">
                    <Image src={props.image} layout="fixed"></Image>
                </div>
                <div className="flex flex-col justify-between p-3 gap-2">
                    <div>
                        <h1>{props.name}</h1>
                        <h2>Id: {props.id}</h2>
                    </div>

                    <h3>Quantidade: {props.qtd}</h3>
                </div>
            </div>
            <div className="flex flex-col justify-center p-3 items-end">
                <h1 className="text-sm">R$ {props.price}</h1>
                <TrashIcon className="h-4 w-4 text-PrimaryText" />
            </div>
        </div>
    )
}
export default ProductCart
