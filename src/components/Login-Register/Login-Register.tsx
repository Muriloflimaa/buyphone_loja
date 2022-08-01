import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.scss'
import LogoSvg from '../../assets/images/LogoPurple.svg'
import { ReactElement, useEffect, useState } from 'react'

interface Homeprops {
    children: ReactElement
    width: string
}

const LoginRegister = ({ children, width }: Homeprops) => {
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
                        'card bg-white mb-10 z-50 w-full flex flex-col shadow-lg ' +
                        width
                    }
                >
                    <div className="card-body w-full ">
                        <div className="w-full">
                            <div className="flex justify-center">
                                <Link
                                    href={'/login'}
                                    className="cursor-pointer"
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

                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginRegister
