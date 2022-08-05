import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useState } from 'react'

export default function login() {
    const [show, setShow] = useState(true)
    return (
        <>
            <h1 className="text-2xl flex justify-center pt-4 text-default font-medium">
                Faça login ou cadastre-se
            </h1>
            <div className="w-full">
                <div className="form-control w-full">
                    <div>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="BuyPhone@gmail.com"
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
                </div>
                <div className="flex justify-end w-full my-2">
                    <Link href={'/forgout-password'} passHref>
                        <a className="text-xs  text-blue-600 link cursor-pointer">
                            Esqueceu sua senha?
                        </a>
                    </Link>
                </div>
                <button
                    type="submit"
                    className="btn normal-case py-4 text-PrimaryText flex justify-center w-full bg-buyphone shadow-md border-0"
                >
                    Entrar
                </button>
                <div className="text-default mt-4">
                    Deseja criar uma conta?{' '}
                    <Link href={'/register'} passHref>
                        <a className="link text-blue-600 cursor-pointer">
                            Cadastre-se
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
}
