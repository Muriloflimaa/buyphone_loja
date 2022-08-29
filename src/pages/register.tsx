import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useState } from 'react'
import ReactInputMask from 'react-input-mask'
import { api } from '../services/apiClient'
import { WithSSRGuest } from '../utils/WithSSRGuest'

export default function register() {
    const [show, setShow] = useState(true)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [document, setDocument] = useState('')
    const [mobile_phone, setMobilePhone] = useState('')
    const [birthdate, setBirthDate] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [acceptTerms, setAcceptTerms] = useState(false)

    const Register = async () => {
        await api
            .post('/register', {
                email,
                document,
                name,
                mobile_phone,
                birthdate,
                password,
                type: 0
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="form-control w-full">
            <div>
                <label className="label">
                    <span className="label-text">Nome</span>
                </label>
                <label className="input-group">
                    <input
                        id="name"
                        name="name"
                        onChange={(event) => setName(event.target.value)}
                        type="text"
                        className="input input-bordered rounded-md !important w-full text-PrimaryText"
                    />
                </label>
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <label className="input-group">
                    <input
                        id="email"
                        name="email"
                        onChange={(event) => setEmail(event.target.value)}
                        type="text"
                        className="input input-bordered rounded-md !important w-full text-PrimaryText"
                    />
                </label>
            </div>
            <div>
                <label className="label">
                    <span className="label-text">CPF</span>
                </label>
                <label className="input-group">
                    <ReactInputMask
                        mask="999.999.999-99"
                        id="document"
                        name="document"
                        onChange={(event) => setDocument(event.target.value)}
                        type="text"
                        className="input input-bordered rounded-md !important w-full text-PrimaryText"
                    />
                </label>
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Telefone </span>
                </label>
                <label className="input-group">
                    <ReactInputMask
                        mask="+55 (99) 99999-9999"
                        id="phone"
                        name="phone"
                        onChange={(event) => setMobilePhone(event.target.value)}
                        type="tel"
                        className="input input-bordered rounded-md !important w-full text-PrimaryText"
                    />
                </label>
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Data de nascimento </span>
                </label>
                <label className="input-group">
                    <input
                        id="date"
                        name="date"
                        onChange={(event) => setBirthDate(event.target.value)}
                        type="date"
                        className="input input-bordered rounded-md !important w-full text-PrimaryText"
                    />
                </label>
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Senha</span>
                </label>
                <label className="input-group">
                    <input
                        id="password"
                        name="password"
                        onChange={(event) => setPassword(event.target.value)}
                        type={show ? 'password' : 'text'}
                        placeholder="●●●●●●●"
                        className="input input-bordered rounded-tl-md rounded-tb-md !important w-full text-PrimaryText"
                    />
                    <span onClick={() => setShow(!show)}>
                        {show ? (
                            <EyeOffIcon className="w-4 h-4" />
                        ) : (
                            <EyeIcon className="w-4 h-4" />
                        )}
                    </span>
                </label>
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Confirmar senha</span>
                </label>
                <label className="input-group">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={(event) => setConfirmPass(event.target.value)}
                        type={show ? 'password' : 'text'}
                        placeholder="●●●●●●●"
                        className="input input-bordered rounded-tl-md rounded-tb-md !important w-full text-PrimaryText"
                    />
                    <span onClick={() => setShow(!show)}>
                        {show ? (
                            <EyeOffIcon className="w-4 h-4" />
                        ) : (
                            <EyeIcon className="w-4 h-4" />
                        )}
                    </span>
                </label>
            </div>
            <label
                className="block font-semibold text-[10px] py-3 text-gray-500"
                htmlFor="terms"
            >
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        onClick={() => setAcceptTerms(!acceptTerms)}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        name="terms"
                        id="terms"
                    />
                    <div className="ml-2 text-xs">
                        Eu li e concordo com os{' '}
                        <Link href={'/terms'} passHref>
                            <a className="underline text-gray-600 hover:text-gray-900">
                                Termos de Serviço
                            </a>
                        </Link>{' '}
                        e{' '}
                        <Link href={'/politics'} passHref>
                            <a
                                href="https://pedidos.buyphone.com.br/privacy-policy"
                                className="underline text-gray-600 hover:text-gray-900"
                            >
                                Política de Privacidade
                            </a>
                        </Link>
                    </div>
                </div>
            </label>
            <button
                type="submit"
                onClick={Register}
                className="btn normal-case py-4 mb-5 flex justify-center w-full bg-buyphone shadow-md border-0"
            >
                Registre-se
            </button>
            <div className="text-center text-sm">
                Já é registrado?{' '}
                <Link href={'/login'} passHref>
                    <a className="font-semibold text-blue-700 hover:text-blue-600">
                        Entrar
                    </a>
                </Link>
            </div>
        </div>
    )
}

export const getServerSideProps = WithSSRGuest(async (ctx) => {
    return {
        props: {},
    }
})
