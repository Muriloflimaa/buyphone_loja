import { ArrowLeftIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import LogoSvg from '../../assets/images/LogoPurple.svg'
import styles from './styles.module.scss'

interface Homeprops {
    children: ReactElement
    width: string
}

const LoginRegister = ({ children, width }: Homeprops) => {
    const [wid, setWidth] = useState(false)
    const router = useRouter()
    useEffect(() => {
        if (router.asPath == '/terms' || router.asPath == '/politics') {
            setWidth(true)
        } else {
            setWidth(false)
        }
    }, [])
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

            <div className="px-4 min-h-screen flex justify-center items-center mx-auto">
                <div
                    className={
                        'card bg-white z-50 w-full flex flex-col shadow-lg ' +
                        width
                    }
                >
                    <div className="card-body w-full ">
                        <div className="w-full">
                            <div className="flex justify-center">
                                <Link
                                    href={'/login'}
                                    className="cursor-pointer"
                                    passHref
                                >
                                    <div className="w-56 h-auto cursor-pointer">
                                        <Image
                                            src={LogoSvg}
                                            layout="responsive"
                                            alt="Logo BuyPhone"
                                        />
                                    </div>
                                </Link>
                            </div>
                            {wid == true ? (
                                <div className="flex justify-center pt-4">
                                    <button
                                        className="flex gap-2 font-bold text-lg justify-center items-center py-4 text-default"
                                        onClick={() => router.back()}
                                    >
                                        <ArrowLeftIcon className="w-5 h-5" />
                                        Clique para voltar
                                    </button>
                                </div>
                            ) : (
                                ''
                            )}

                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginRegister
