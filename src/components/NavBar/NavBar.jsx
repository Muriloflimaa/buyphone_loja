import Image from 'next/image'
import Logo from '../../assets/images/logo.svg'
import styles from './styles.module.scss'

import React, { useState, useEffect } from 'react'
import {
    SearchIcon,
    UserCircleIcon,
    HomeIcon,
    ShoppingBagIcon,
    LogoutIcon,
    UserIcon,
    ShoppingCartIcon,
} from '@heroicons/react/solid'
import Link from 'next/link'
import toast from 'react-hot-toast'
import ProductCart from '../ProductCart/ProductCart'
import iPhoneProduct from '../../assets/images/product.svg'
import { useRouter } from 'next/router'



export default function NavBar() {
    const [isOn, setIsOn] = useState(false)

    function handleClick() {
        setIsOn(!isOn)
    }

    const router = useRouter()

    const [show, setShow] = useState(false)
    useEffect(() => {
        if (router.asPath == '/shipping/address' || router.asPath == '/cart' || router.asPath == '/shipping' || router.asPath == '/shipping/payment' || router.asPath == '/shipping/payment/credit' || router.asPath == '/shipping/payment/pix') {
            setShow(true)
        } else {
            setShow(false)
        }
    })

    function cart() {
        toast.custom((t) => (
            <div
                className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-sm w-full bg-colorCard shadow-lg rounded-xl p-5`}
            >
                <div className="flex justify-between items-center">
                    <h1 className="text-PrimaryText text-xl uppercase">
                        Meu carrinho
                    </h1>
                    <h2 className="text-PrimaryText text-xs">2 itens</h2>
                </div>
                <div className="flex flex-col gap-9 my-4 mt-8">
                    <ProductCart
                        name="iPhone 12 pro MAX"
                        id="Azul / 256GB"
                        qtd={1}
                        price={5.2}
                        image={iPhoneProduct}
                        shadow=" "
                    />
                   <div className="overflow-hidden">
<div className={styles.divisorbuyphone}></div>
</div>
<ProductCart
                        name="iPhone 12 pro MAX"
                        id="Azul / 256GB"
                        qtd={1}
                        price={5.2}
                        image={iPhoneProduct}
                        shadow=" "
                    />
                   <div className="overflow-hidden">
<div className={styles.divisorbuyphone}></div>
</div>
                </div>

                <div className="flex justify-center">
                    <Link href={'/shipping'}>
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="bg-[#00A944] py-4 my-3 w-full rounded-lg text-PrimaryText"
                        >
                            Ir para o pagamento
                        </button>
                    </Link>
                </div>

            </div>
        ))
    }

    return (
        <nav>
            <div className="w-full">
                <div className="w-full h-16 flex justify-between items-center md:grid md:grid-cols-3 md:h-24 bg-Primary relative p-4 z-10 mx-auto max-w-7xl">
                    <div className="block md:hidden">
                        {/* CHAMA O MENU */}
                        <label
                            htmlFor="my-drawer"
                            className="btn btn-circle swap swap-rotate absolute -mt-6"
                            onClick={handleClick}
                        >
                            <input type="checkbox" />
                            <div>
                                <svg
                                    className="swap-off fill-current text-PrimaryText z-20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                                </svg>
                            </div>
                        </label>
                        {/* FIM */}
                    </div>
                    <Link href={'/'}>
                        <Image
                            src={Logo}
                            className="cursor-pointer"
                            layout="fixed"
                        />
                    </Link>
                    <SearchIcon className="h-5 w-5 text-PrimaryText block md:hidden " />
                    <div className="hidden md:block w-full">
                        <div>
                            <label className="input-group">
                                <input
                                    type="text"
                                    placeholder="Pesquisa..."
                                    className="input input-bordered rounded-md !important w-full text-PrimaryText"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="md:flex justify-end gap-3 w-full hidden">
                    <Link href={'/login'}>
                        <div className="flex justify-end flex-col items-center cursor-pointer">
                            <UserIcon className="h-8 w-8 text-PrimaryText" />
                        </div>
                        </Link>
                        <Link href={'/cart'}>
                            <div className="flex justify-end flex-col items-center cursor-pointer md:hidden">
                                <ShoppingCartIcon className="h-7 w-7 text-PrimaryText" />
                            </div>
                        </Link>

                        {show == false ? (
                            <div
                                className="hidden justify-end flex-col items-center cursor-pointer md:flex relative"
                                onClick={cart}
                            >
                                <ShoppingCartIcon className="h-7 w-7 text-PrimaryText hidden md:block" />
                                <div className='absolute'>
                                <span class="flex h-3 w-3 relative -mt-[2.04rem] ml-7">
  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
  <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
</span>
</div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <div className="w-full mb-2 border-t-[1px] border-border">
                    <div className="tabs text-PrimaryText w-full flex justify-center">
                    {/* exibir produtos aqui */}
                    </div>
                </div>
            </div>

            

            {/* MENU */}
            <div
                className={
                    'drawer absolute -mt-16 transition-all duration-500 h-[100vh] ' +
                    (isOn == false ? '-z-10' : 'z-50')
                }
            >
                <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div
                    className={
                        'drawer-content transition-all duration-500 delay-500 ' +
                        (isOn == true ? 'hidden' : 'block')
                    }
                ></div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer"
                        className="drawer-overlay w-full h-full fixed"
                        onClick={handleClick}
                    ></label>

                    <ul className="menu overflow-y-auto h-full bg-base-100 text-base-content fixed  flex">
                        <div className="flex items-center justify-between border-b-[1px] border-PrimaryText">
                            <div className="flex justify-between items-center p-6">
                                <div>
                                    <UserCircleIcon className="h-12 w-12 text-PrimaryText" />
                                </div>
                                <div className="flex flex-col pl-6">
                                    <h1 className="text-xl font-semibold text-PrimaryText">
                                        João Pizzini
                                    </h1>
                                    <h2 className="text-PrimaryText">
                                        Revendedor
                                    </h2>
                                </div>
                            </div>
                            <label
                                htmlFor="my-drawer"
                                className="swap swap-rotate p-6"
                                onClick={handleClick}
                            >
                                <input type="checkbox" />
                                <div>
                                    <svg
                                        className="swap-off fill-current text-PrimaryText z-20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 512 512"
                                    >
                                        <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                                    </svg>
                                </div>
                            </label>
                        </div>
                        <li>
                            <Link href="/">
                                <div className="flex py-8">
                                    <HomeIcon className="h-5 w-5 text-PrimaryText" />

                                    <a className="text-PrimaryText">
                                        Página inicial
                                    </a>
                                </div>
                            </Link>
                        </li>

                        <li className="flex">
                            <div
                                tabIndex={0}
                                className="collapse collapse-arrow flex flex-col px-4 py-3 gap-0 h-auto p-0 items-start"
                            >
                                <div className="collapse-title min-h-0 text-xl font-medium flex items-center p-0 relative">
                                    <ShoppingBagIcon className="h-5 w-5 text-PrimaryText" />

                                    <a className="text-PrimaryText font-normal text-base collapse-title">
                                        Produtos
                                    </a>
                                </div>
                                <div className="collapse-content flex flex-col ml-5 gap-3 text-PrimaryText font-normal text-base">
                                    <p>iPhone XR</p>
                                    <p>iPhone 11</p>
                                    <p>iPhone 12</p>
                                    <p>iPhone 12</p>
                                    <p>iPhone 12</p>
                                    <p>iPhone 12</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex py-8">
                                <UserIcon className="h-5 w-5 text-PrimaryText" />
                                <a className="text-PrimaryText">Minha conta</a>
                            </div>
                        </li>
                        <li>
                            <div className="flex py-8">
                                <LogoutIcon className="h-5 w-5 text-PrimaryText" />
                                <a className="text-PrimaryText">Sair</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
