import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useState } from 'react'
import { WithSSRGuest } from '../utils/WithSSRGuest'

export default function register() {
    const [show, setShow] = useState(true)
    return (
        <div className="form-control w-full">
            <div>
                <label className="label">
                    <span className="label-text">Nome</span>
                </label>
                <label className="input-group">
                    <input
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
                        type="text"
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
