import styles from '../../styles/styles.module.scss'
import Image from 'next/image'
import LogoSvg from '../assets/images/LogoPurple.svg'
import { useState } from 'react'
import { EyeIcon } from '@heroicons/react/solid'
import { EyeOffIcon } from '@heroicons/react/solid'

export default function login() {
    const [show, setShow] = useState(true)
    return (
        <>
            <div className="glass z-10 fixed left-0 w-full h-full"></div>
            <ul className={styles.circles}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>

            <div className="px-4 min-h-screen flex justify-center items-center">
                <div className="card bg-white mb-10 z-50 w-full flex flex-col shadow-lg items-center max-w-sm">
                    <div className="card-body w-full flex flex-col items-center">
                        <div className="flex flex-col justify-between items-center gap-3 w-full">
                            <div className="w-56 h-auto">
                                <Image
                                    src={LogoSvg}
                                    layout="responsive"
                                    alt="Logo BuyPhone"
                                />
                            </div>
                            <h1 className="text-2xl text-default font-medium">
                                Faça login ou cadastre-se
                            </h1>
                            <div className="form-control gap-2 w-full">
                                <div>
                                    <label className="label">
                                        <span className="label-text">
                                            Email
                                        </span>
                                    </label>
                                    <label className="input-group">
                                        <input
                                            type="text"
                                            placeholder="info@site.com"
                                            className="input input-bordered rounded-md !important w-full text-PrimaryText"
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="label-text">
                                            Senha
                                        </span>
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
                            <button
                                type="submit"
                                className="btn normal-case py-4 my-5 text-PrimaryText flex justify-center w-full bg-buyphone shadow-md border-0"
                            >
                                Entrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
