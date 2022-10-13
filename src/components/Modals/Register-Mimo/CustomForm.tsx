import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { ToastCustom } from '../../../utils/toastCustom';

interface IFormFields {
    EMAIL: string,
    FNAME: string,
    PHONE: string,
}

interface ICustomForm {
    status: string | null
    message: string | Error | null
    onValidated: (data: IFormFields) => void
}

export default function CustomForm({ status, message, onValidated }: ICustomForm) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (status === "sending") {
            ToastCustom(
                8000,
                'Enviando dados...',
                'warning',
                'Notificação'
            )
        }
        if (status === "success") {
            ToastCustom(
                8000,
                'Cadastrado com sucesso!',
                'success',
                'Notificação'
            )
            clearFields()
            router.push('/')
        }
        if (status === "error") {
            ToastCustom(
                8000,
                'Erro ao cadastrar!',
                'error',
                'Notificação'
            )
        }
    }, [status])

    const clearFields = () => {
        setName('');
        setEmail('');
        setPhone('');
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        email &&
            name &&
            phone &&
            email.indexOf("@") > -1 &&
            onValidated({
                EMAIL: email,
                FNAME: name,
                PHONE: phone,
            });
    }

    return (
        <form className="form-control gab-2 my-7 px-7 w-full" onSubmit={e => handleSubmit(e)}>

            <div className="grid gap-3">
                <input
                    className="input input-bordered rounded-md w-full text-info-content"
                    onChange={e => setName(e.target.value)}
                    type="text"
                    value={name}
                    placeholder="Nome"
                    required
                />

                <input
                    className="input input-bordered rounded-md w-full text-info-content"
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    value={email}
                    placeholder="E-mail"
                    required
                />

                <input
                    className="input input-bordered rounded-md w-full text-info-content"
                    onChange={e => setPhone(e.target.value)}
                    type="text"
                    value={phone}
                    placeholder="Telefone"
                    required
                />
            </div>
            <button
                className="btn normal-case py-4 text-PrimaryText w-56 m-auto mt-5 bg-default shadow-md border-0"
                type="submit"
            >
                {status === "sending" ? 'CADASTRANDO...' : 'CADASTRAR'}
            </button>
        </form>
    );
};