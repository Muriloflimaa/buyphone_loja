import { FormEvent, useState } from "react"
import { apiStore } from "../../../../services/api"
import { ToastCustom } from "../../../../utils/toastCustom"

interface IProductUnavailable {
    nameProduct?: string
}

export default function ProductUnavailable({
    nameProduct,
}: IProductUnavailable) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const params = {
            name,
            email,
            list: 21,
            product: nameProduct
        }
        try {
            const response = await apiStore.post('leads/', params)
            if (response.data.message === 'success' || response.data.message === 'error') {
                ToastCustom(8000, 'Sua solicitação foi enviada com sucesso!', 'success', 'Enviado!')
                setLoading(false)
                return
            }
        } catch (error) {
            if (error) {
                ToastCustom(
                    8000,
                    'Atualize a página ou tente novamente mais tarde',
                    'error',
                    'Houve um erro!'
                )
            }
        }
    }

    return (
        <form
            className={
                'form-control gap-2 w-full flex flex-col items-center'
            }
            onSubmit={(e) => handleSubmit(e)}
        >
            <div className={'grid gap-3 w-full'}>
                <input
                    className="input input-bordered rounded-md w-full text-info-content"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name}
                    placeholder="Nome"
                    required
                />

                <input
                    className="input input-bordered rounded-md w-full text-info-content"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    value={email}
                    placeholder="E-mail"
                    required
                />
            </div>
            <button onClick={() => name && email && setLoading(true)} className={`btn btn-info btn-block text-white ${loading && 'loading'}`} type="submit">
                Enviar
            </button>
        </form>
    )
}
