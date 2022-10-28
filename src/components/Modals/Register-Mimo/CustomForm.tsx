import { useRouter } from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { FormEvent, useEffect, useState } from 'react';
import { masktel1 } from '../../../utils/masks';
import { ToastCustom } from '../../../utils/toastCustom';

interface IFormFields {
    EMAIL: string,
    FNAME: string,
    PHONE: string,
    SOURCE: string,
    MEDIUM: string,
    CAMPAIGN: string
}

interface ICustomForm {
    status: string | null
    onValidated: (data: IFormFields) => void
}

export default function CustomForm({ status, onValidated }: ICustomForm) {
    const router = useRouter();
    const cookies = parseCookies(undefined)
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const openModalInfoDiscount = () => {
            return document.getElementById('modal-open-cadastre')?.classList.add('modal-open')
        }
        if (status === "success") {
            ToastCustom(
                3000,
                'Cadastrado com sucesso!',
                'success',
                'Notificação'
            )
            clearFields()
            setCookie(null, 'LEAD', 'true', {
                path: '/',
            })
            router.push('/')
            setTimeout(openModalInfoDiscount, 3000)
        }
        if (status === "error") {
            ToastCustom(
                3000,
                'Erro ao cadastrar!',
                'error',
                'Que pena...'
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
        const newCookies = JSON.parse(cookies.UTM)
        email &&
            name &&
            phone &&
            newCookies &&
            email.indexOf("@") > -1 &&
            onValidated({
                EMAIL: email,
                FNAME: name,
                PHONE: phone,
                SOURCE: newCookies.utm_source,
                MEDIUM: newCookies.utm_medium,
                CAMPAIGN: newCookies.utm_campaign,
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
                    value={masktel1(phone)}
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