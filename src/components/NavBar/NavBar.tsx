import Image from 'next/image'
import Logo from '../../assets/images/logo.svg'
import React, { useState, useRef } from 'react'
import {
    SearchIcon,
    UserCircleIcon,
    HomeIcon,
    ShoppingBagIcon,
    LogoutIcon,
    UserIcon,
} from '@heroicons/react/solid'

const NavBar = () => {
    const [isOn, setIsOn] = useState(false)

    function handleClick() {
        setIsOn(!isOn)
    }

    return (
        <nav>
            <div className="w-full h-16 flex justify-between items-center bg-Primary border-b-[2px] border-border relative p-4 z-10">
                <div>
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
                <Image src={Logo} layout="fixed" />

                <SearchIcon className="h-5 w-5 text-PrimaryText " />
            </div>

            {/* MENU */}
            <div
                className={
                    isOn
                        ? 'drawer absolute -mt-16 z-20 transition-all duration-500'
                        : 'drawer absolute -mt-16 -z-10 transition-all duration-500'
                }
            >
                <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div
                    className={
                        isOn ? 'drawer-content block' : 'drawer-content hidden'
                    }
                ></div>
                <div
                    className={
                        isOn ? 'drawer-side block' : 'drawer-side hidden'
                    }
                >
                    <label
                        htmlFor="my-drawer"
                        className="drawer-overlay w-full h-full fixed"
                        onClick={handleClick}
                    ></label>

                    <ul className="menu overflow-y-auto h-full bg-base-100 text-base-content fixed">
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
                                className=" swap swap-rotate p-6"
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
                            <div className="flex py-8">
                                <HomeIcon className="h-5 w-5 text-PrimaryText" />
                                <a className="text-PrimaryText">
                                    Página inicial
                                </a>
                            </div>
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

            {/* FIM */}
        </nav>
    )
}

export default NavBar
