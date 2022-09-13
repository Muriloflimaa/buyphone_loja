import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    HomeIcon,
    LogoutIcon,
    SearchIcon,
    ShoppingBagIcon,
    ShoppingCartIcon,
    UserCircleIcon,
    UserIcon,
} from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import Logo from '../../assets/images/logo.svg'
import { AuthContext } from '../../context/AuthContext'
import { useCart } from '../../context/UseCartContext'
import { apiPedidos } from '../../services/apiClient'
import { ICategory } from '../../types'
import { GetUseType } from '../../utils/getUserType'
import { moneyMask } from '../../utils/masks'
import { FirstAllUpper, UniqueName } from '../../utils/ReplacesName'
import { verificationPrice } from '../../utils/verificationPrice'
import ProductCart from '../ProductCart'
import styles from './styles.module.scss'

interface NavBarProps {
    dataCategory: {
        data: Array<ICategory>
    }
}

export default function NavBar({ dataCategory }: NavBarProps) {
    const { isAuthenticated, signOut } = useContext(AuthContext)
    const [data, setData] = useState<any>([])
    const { cart } = useCart()
    const cartSize = cart.length
    const [isOn, setIsOn] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const user = GetUseType()
    const returnPrice = verificationPrice(data, user)

    const total = cart.reduce((sumTotal, product) => {
        return sumTotal + returnPrice?.ourPrice * product.amount
    }, 0)

    const handleClick = () => {
        setIsOn(!isOn)
    }

    useEffect(() => {
        if (!isAuthenticated) {
            setIsUser(false)
        } else {
            setIsUser(true)
        }
    }, [isAuthenticated])

    useEffect(() => {
        cart.map(async (item) => {
            try {
                const dat = await apiPedidos.get(`products/${item.id}`)
                setData(dat.data.data)
            } catch (error) {
                console.log(error)
            }
        })
    }, [cart])

    return (
        <>
            <div className="fixed z-20 w-full">
                <div className="glass">
                    <nav className="relative mt-0 w-full bg-primary/[.9]">
                        <div className="w-full">
                            <div className="w-full h-16 flex justify-between items-center md:grid md:grid-cols-3 md:h-24 relative p-4 z-10 mx-auto max-w-7xl">
                                <div className="block md:hidden">
                                    {/* CHAMA O MENU */}
                                    <label
                                        htmlFor="my-drawer"
                                        className="btn btn-circle bg-transparent border-none swap swap-rotate transition-none absolute -mt-[20px]"
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
                                <Link href={'/'} passHref>
                                    <a>
                                        <Image
                                            src={Logo}
                                            className="cursor-pointer"
                                            layout="fixed"
                                            alt="Logo BuyPhone"
                                        />
                                    </a>
                                </Link>
                                <SearchIcon className="h-5 w-5 text-PrimaryText block md:hidden opacity-0" />
                                <div className="hidden md:block w-full">
                                    {/* <div>
                                        <label className="input-group">
                                            <input
                                                type="search"
                                                name="search-form"
                                                id="search-form"
                                                className="input input-bordered rounded-md !important w-full text-info-content"
                                                placeholder="Pesquisa..."
                                            />
                                        </label>
                                    </div> */}
                                </div>
                                <div className="md:flex justify-end items-center gap-5 w-full hidden">
                                    {!isUser ? (
                                        <Link href={'/login'} passHref>
                                            <div className="flex justify-end flex-col items-center cursor-pointer">
                                                <FontAwesomeIcon
                                                    icon={faCircleUser}
                                                    className="w-7 h-7 text-PrimaryText"
                                                />
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="hidden sm:inline-block dropdown dropdown-end">
                                            <label
                                                tabIndex={0}
                                                className="btn btn-sm bg-rose-500 hover:bg-rose-700 rounded-full text-base-100 flex-row gap-2 pr-1"
                                            >
                                                <span className="normal-case text-white">
                                                    Olá,{' '}
                                                    {UniqueName(user?.name)}
                                                </span>
                                                <FontAwesomeIcon
                                                    icon={faCircleUser}
                                                    className="w-6 h-6 mr-1 text-PrimaryText"
                                                />
                                            </label>
                                            <ul
                                                tabIndex={0}
                                                className="menu menu-compact dropdown-content mt-3 p-2 bg-base-200 rounded-box w-52 shadow-2xl"
                                            >
                                                <li>
                                                    <a href="https://loja.buyphone.com.br/user/profile">
                                                        Meus Dados
                                                    </a>
                                                </li>
                                                <li>
                                                    <Link href={'/myshopping'}>
                                                        <a>Minhas Compras</a>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        className="text-left w-full"
                                                        type="submit"
                                                        onClick={signOut}
                                                    >
                                                        Sair
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}

                                    <div className="dropdown dropdown-end">
                                        <label tabIndex={0} className=" m-1">
                                            <div className="hidden justify-end flex-col items-center cursor-pointer md:flex relative">
                                                <ShoppingCartIcon className="h-7 w-7 text-PrimaryText hidden md:block" />
                                                {cartSize > 0 ? (
                                                    <div className="absolute">
                                                        <span className="flex h-3 w-3 relative -mt-[2.04rem] ml-7">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                        </span>
                                                    </div>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </label>

                                        <div
                                            tabIndex={0}
                                            className="mt-3 card card-compact dropdown-content bg-secondary w-80 shadow-2xl"
                                        >
                                            <div className="card-body">
                                                <div className="flex justify-between">
                                                    <span className="text-lg uppercase">
                                                        Meu Carrinho
                                                    </span>
                                                    <span className="font-thin text-xs">
                                                        {cartSize > 1 ? (
                                                            cartSize + ' itens'
                                                        ) : cartSize == 1 ? (
                                                            cartSize + ' item'
                                                        ) : (
                                                            <h1>
                                                                Carrinho está
                                                                vazio
                                                            </h1>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div>
                                                    {cartSize > 0 ? (
                                                        <ProductCart
                                                            data={data}
                                                        />
                                                    ) : (
                                                        <h1>Carrinho vazio</h1>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="card-body bg-base-200">
                                                <div className="flex justify-between py-4">
                                                    <span className="text-gray-500 text-lg">
                                                        Valor Total:
                                                    </span>
                                                    <span className="font-semibold text-lg">
                                                        R${' '}
                                                        {moneyMask(
                                                            total.toString()
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-border max-w-7xl mx-auto border-t-[1px] opacity-50"></div>
                            <div className="w-full mb-2 ">
                                <div className="w-full border-t border-base-200 border-opacity-10 text-primary-content max-w-7xl mx-auto">
                                    <ul className="menu menu-horizontal w-full text-md overflow-auto sm:text-sm">
                                        <li>
                                            <Link href={'/'}>
                                                <a>Todos</a>
                                            </Link>
                                        </li>
                                        {dataCategory.data.length > 0 ? (
                                            dataCategory.data.map(
                                                (category) => {
                                                    return (
                                                        <li key={category.id}>
                                                            <Link
                                                                href={`/${category.slug}`}
                                                                passHref
                                                            >
                                                                <a className="w-max">
                                                                    {
                                                                        category.name
                                                                    }
                                                                </a>
                                                            </Link>
                                                        </li>
                                                    )
                                                }
                                            )
                                        ) : (
                                            <span>
                                                Categoria de produtos não
                                                disponíveis.
                                            </span>
                                        )}
                                    </ul>
                                </div>
                                <div className="overflow-hidden">
                                    <div
                                        className={styles.divisorbuyphone}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            {/* MENU */}
            <div
                className={
                    'drawer absolute transition-all duration-500 h-[100vh] ' +
                    (!isOn ? '-z-10 -ml-[200vw]' : 'z-50 block')
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
                        (isOn ? 'hidden -z-10' : 'block z-50')
                    }
                ></div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer"
                        className="drawer-overlay w-full h-[100vh] fixed"
                        onClick={handleClick}
                    ></label>
                    <ul className="menu overflow-y-auto h-[100vh] bg-base-100 text-base-content fixed flex">
                        <div className="flex items-center justify-between border-b-[1px] border-PrimaryText">
                            <div className="flex justify-between items-center p-6">
                                <div>
                                    {!isUser ? (
                                        <UserCircleIcon className="w-10 h-10" />
                                    ) : (
                                        <img
                                            src={user?.profile_photo_url}
                                            alt="Foto do Usuário"
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                    )}
                                </div>
                                {isUser ? (
                                    <div className="flex flex-col pl-6">
                                        <h1 className="text-xl font-semibold text-info-content">
                                            {FirstAllUpper(user?.name)}
                                        </h1>
                                        <h2 className="text-info-content">
                                            {user?.type == 1
                                                ? 'Revendedor'
                                                : 'Consumidor'}
                                        </h2>
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center w-full p-4">
                                        <Link href={'/login'} passHref>
                                            <a className="link text-info-content">
                                                Realizar login
                                            </a>
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <label
                                htmlFor="my-drawer"
                                className="swap swap-rotate p-6"
                                onClick={handleClick}
                            >
                                <input type="checkbox" />
                                <div>
                                    <svg
                                        className="swap-off fill-current text-info-content z-20"
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
                        <Link href={'/'}>
                            <li>
                                <div className="flex py-8">
                                    <HomeIcon className="h-5 w-5 text-info-content" />
                                    <a className="text-info-content">
                                        Página inicial
                                    </a>
                                </div>
                            </li>
                        </Link>
                        <li className="flex">
                            <div
                                tabIndex={0}
                                className="collapse collapse-arrow flex flex-col px-4 py-3 gap-0 h-auto p-0 items-start"
                            >
                                <div className="collapse-title min-h-0 text-xl font-medium flex items-center p-0 relative">
                                    <ShoppingBagIcon className="h-5 w-5 text-info-content" />
                                    <a className="text-info-content font-normal text-base collapse-title">
                                        Produtos
                                    </a>
                                </div>
                                <ul className="collapse-content flex flex-col ml-5 gap-3 text-info-content font-normal text-base">
                                    {dataCategory.data.length > 0 ? (
                                        dataCategory.data.map((category) => {
                                            return (
                                                <li key={category.id}>
                                                    <Link
                                                        href={`/${category.slug}`}
                                                    >
                                                        <a className="w-max">
                                                            {category.name}
                                                        </a>
                                                    </Link>
                                                </li>
                                            )
                                        })
                                    ) : (
                                        <span>
                                            Categoria de produtos não
                                            disponíveis.
                                        </span>
                                    )}
                                </ul>
                            </div>
                        </li>
                        <li>
                            <div className="flex py-8">
                                <UserIcon className="h-5 w-5 text-info-content" />
                                <a className="text-info-content">Minha conta</a>
                            </div>
                        </li>
                        <li>
                            <div className="flex py-8">
                                <LogoutIcon className="h-5 w-5 text-info-content" />
                                <a
                                    className="text-info-content"
                                    onClick={signOut}
                                >
                                    Sair
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
