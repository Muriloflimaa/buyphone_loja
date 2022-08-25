import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../hooks/AuthContext'
import { apiLogin } from '../services/apiLogin'
import { parseCookies } from 'nookies'
import jwt_decode from 'jwt-decode'

export default function login() {
    const [show, setShow] = useState(true)
    const { signIn } = useContext(AuthContext)
    const { isAuthenticated } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        const data = {
            email,
            password,
        }
        await signIn(data)
    }

    console.log(isAuthenticated)
    const router = useRouter()

    useEffect(() => {
        const { '@BuyPhone_Token': token } = parseCookies()

        if (token) {
            const decoded = jwt_decode(token) //decodifica o token

            const timeElapsed = Date.now() // pega a data de agora
            const today = new Date(timeElapsed)

            const d = new Date(0)
            d.setUTCSeconds(decoded.exp) // pega a data do token e transforma ela em tempo

            const diff = Math.abs(d.getTime() - today.getTime()) //divide o tempo do token pelo tempo atual
            const days = Math.ceil(diff / (1000 * 60)) //divide o tempo atual e o tempo restante do token em Min - 60 = 1 Hora

            //se faltar 10 minutos para o token expirar chama o refresh e seta tudo no cookies novamente
            if (days < 10) {
                return
            } else {
                router.push('/')
            }
        }
    }, [])

    return (
        <>
            <h1 className="text-2xl flex justify-center pt-4 text-default font-medium">
                Faça login ou cadastre-se
            </h1>
            <form onSubmit={handleSubmit} className="w-full">
                {/* começo login */}
                <div className="form-control w-full">
                    <div>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <label className="input-group">
                            <input
                                defaultValue={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="BuyPhone@gmail.com"
                                required
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
                                defaultValue={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={show ? 'password' : 'text'}
                                placeholder="●●●●●●●"
                                required
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
                {/* fim login */}
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
                <div className="text-default mt-4 flex gap-1 justify-center">
                    Deseja criar uma conta?
                    <Link href={'/register'} passHref>
                        <a className="link text-blue-600 cursor-pointer">
                            Cadastre-se
                        </a>
                    </Link>
                </div>
            </form>
        </>
    )
}
