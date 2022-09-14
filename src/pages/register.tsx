import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ReactInputMask from 'react-input-mask'
import { WithSSRGuest } from '../utils/WithSSRGuest'
import ErrorImg from '../assets/images/error.webp'
import SuccessImg from '../assets/images/success.webp'
import Image from 'next/image'
import { apiLojaBeta } from '../services/apiBetaConfigs'
import { useRouter } from 'next/router'

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
    const router = useRouter()

    const Register = async () => {
        if (
            name &&
            email &&
            document &&
            mobile_phone &&
            birthdate &&
            password &&
            confirmPass
        ) {
            if (acceptTerms) {
                if (password != confirmPass) {
                    toast.error('senhas não conferem')
                } else {
                    try {
                        await apiLojaBeta.post('/user/register', {
                            email,
                            document,
                            name,
                            mobile_phone,
                            birthdate,
                            password,
                            type: 1,
                        })
                        toast.custom(
                            (t) => (
                                <div
                                    className={`${
                                        t.visible
                                            ? 'animate-enter'
                                            : 'animate-leave'
                                    } w-full lg:w-1/4 bg-[#FECACA] text-[#484752] h-auto items-center shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                                >
                                    <div className="flex-1 w-0 p-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 pt-0.5">
                                                <Image
                                                    src={SuccessImg}
                                                    layout="fixed"
                                                    width={40}
                                                    height={50}
                                                ></Image>
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <p className="text-xs font-medium text-gray-900">
                                                    Cadastrada com sucesso
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ),
                            {
                                duration: 1000,
                            }
                        )
                        setTimeout(() => {
                            router.push('/login')
                        }, 1500)
                    } catch (error: any) {
                        const resposta = error.response.data.errors
                        var MessageErrorArray = Object.keys(resposta).map(
                            function (key) {
                                return [resposta[key]]
                            }
                        )
                        toast.custom(
                            (t) => (
                                <div
                                    className={`${
                                        t.visible
                                            ? 'animate-enter'
                                            : 'animate-leave'
                                    } w-full lg:w-1/4 bg-[#FECACA] text-[#484752] h-auto items-center shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                                >
                                    <div className="flex-1 w-0 p-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 pt-0.5">
                                                <Image
                                                    src={ErrorImg}
                                                    layout="fixed"
                                                    width={40}
                                                    height={50}
                                                ></Image>
                                            </div>
                                            <div className="ml-3 flex-1">
                                                <p className="text-xs font-medium text-gray-900">
                                                    Verifique o alerta abaixo e
                                                    corrija:
                                                </p>
                                                <p className="mt-1 text-[11px] text-gray-900 opacity-70">
                                                    {MessageErrorArray}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ),
                            {
                                duration: 8000,
                            }
                        )
                    }
                }
            } else {
                toast.error('você precisa aceitar os termos')
            }
        } else {
            toast.error('preencha todos os campos')
        }
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
                        className="input input-bordered rounded-md !important w-full text-info-contentt"
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
                        className="input input-bordered rounded-md !important w-full text-info-contentt"
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
                        className="input input-bordered rounded-md !important w-full text-info-contentt"
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
                        className="input input-bordered rounded-md !important w-full text-info-contentt"
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
                        className="input input-bordered rounded-md !important w-full text-info-contentt"
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
                        className="input input-bordered rounded-tl-md rounded-tb-md !important w-full text-info-contentt"
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
                        className="input input-bordered rounded-tl-md rounded-tb-md !important w-full text-info-contentt"
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
