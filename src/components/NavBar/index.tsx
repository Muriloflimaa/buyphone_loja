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
  XIcon,
} from '@heroicons/react/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../assets/images/logo.svg'
import { AuthContext } from '../../context/AuthContext'
import { SearchContext } from '../../context/SearchContext'
import { useCart } from '../../context/UseCartContext'
import { apiPedidos } from '../../services/apiClient'
import { GetUseType } from '../../utils/getUserType'
import { moneyMask } from '../../utils/masks'
import { FirstAllUpper, UniqueName } from '../../utils/ReplacesName'
import ProductCart from '../ProductCart'
import styles from './styles.module.scss'

export default function NavBar() {
  const { isAuthenticated, signOut } = useContext(AuthContext)
  const [showSearch, setShowSearch] = useState(false)
  const { cart, CleanCart, values, somaTotal } = useCart()
  const [cartSize, setCartSize] = useState<number>()
  const [isOn, setIsOn] = useState(false)
  const [isUser, setIsUser] = useState(false)
  const user = GetUseType()
  const [showCart, setShowCart] = useState(false)
  const { changeState } = useContext(SearchContext)
  const [dataApi, setDataApi] = useState<any>()
  const [notShowCart, setNotShowCart] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (cart) {
      setCartSize(cart.length)
    }
  }, [cart])

  useEffect(() => {
    async function Data() {
      try {
        const DATA = await apiPedidos.get(`categories/`)
        setDataApi(DATA.data)
      } catch (error) {
        setDataApi(null)
      }
    }
    Data()
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      setIsUser(false)
    } else {
      setIsUser(true)
    }
  }, [isAuthenticated]) //ve se o usuario esta logado

  useEffect(() => {
    if (
      router.asPath == '/shipping' ||
      router.asPath == '/shipping/payment/pix' ||
      router.asPath == '/shipping/address' ||
      router.asPath == '/shipping/payment' ||
      router.asPath == '/shipping/payment/custom' ||
      router.asPath == '/shipping/payment/credit'
    ) {
      setNotShowCart(true)
    } else {
      setNotShowCart(false)
    }
  }, [router.asPath])

  return (
    <>
      <div className="fixed z-20 w-full">
        <div className="glass">
          <nav className="relative mt-0 w-full bg-primary/[.9]">
            <div className="w-full">
              <div className="w-full h-16 flex justify-between items-center md:grid md:grid-cols-4 md:h-24 relative p-4 z-10 mx-auto max-w-7xl">
                <div className="md:col-span-1">
                  <div
                    className="block md:hidden"
                    onClick={() => setIsOn(!isOn)}
                  >
                    {/* CHAMA O MENU */}
                    <label
                      htmlFor="my-drawer"
                      className="btn btn-circle z-50 bg-transparent border-none swap swap-rotate transition-none absolute -mt-[20px]"
                      onClick={() => setIsOn(!isOn)}
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
                  <div className="hidden md:block">
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
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="w-full">
                    <input
                      type="search"
                      name="search-form"
                      id="search-form"
                      className="input input-bordered rounded-md hidden md:flex !important w-full text-white bg-[#4a3e865b]"
                      placeholder="Pesquisa..."
                      onClick={() =>
                        router.asPath !== '/' ? router.push('/') : null
                      }
                      onChange={(e) => changeState(e.target.value)}
                    />

                    <div className="block md:hidden mt-2 ml-8">
                      <Link href={'/'} passHref>
                        <a>
                          <Image
                            src={Logo}
                            className="cursor-pointer"
                            layout="intrinsic"
                            width={120}
                            height={80}
                            alt="Logo BuyPhone"
                          />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <div className="block md:hidden ">
                    {!showSearch ? (
                      <SearchIcon
                        className="h-5 w-5 text-PrimaryText block"
                        onClick={() => setShowSearch(!showSearch)}
                      />
                    ) : (
                      <XIcon
                        className="h-5 w-5 text-PrimaryText block"
                        onClick={() => setShowSearch(!showSearch)}
                      />
                    )}
                  </div>

                  <div className="md:flex justify-end items-center gap-5 w-full hidden ">
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
                            Olá, {UniqueName(user?.name)}
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
                            <Link href={'/user/profile'}>
                              <a>Meus Dados</a>
                            </Link>
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
                              onClick={() => signOut()}
                            >
                              Sair
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                    <div
                      className={
                        'absolute w-[100vw] h-[100vw] p-[3000px] opacity-0 -mr-96 ' +
                        (showCart ? 'block' : 'hidden')
                      }
                      onClick={() => setShowCart(!showCart)}
                    ></div>
                    <div
                      className={
                        'dropdown dropdown-end  ' +
                        (showCart ? 'opacity-100 visible' : '')
                      }
                    >
                      {!notShowCart && (
                        <label className=" m-1">
                          <div className="hidden justify-end flex-col items-center cursor-pointer md:flex relative">
                            <ShoppingCartIcon
                              className="h-7 w-7 text-PrimaryText hidden md:block"
                              onClick={() => setShowCart(!showCart)}
                            />
                            {cartSize && cartSize > 0 ? (
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
                      )}

                      <div
                        className={
                          'mt-3 card card-compact dropdown-content bg-secondary w-80 shadow-2xl ' +
                          (showCart ? 'opacity-100 visible' : '')
                        }
                      >
                        <div className="card-body">
                          <div className="flex justify-between">
                            <span className="text-lg uppercase">
                              Meu Carrinho
                            </span>
                            <span className="font-thin text-xs">
                              {cartSize && cartSize > 1 ? (
                                cartSize + ' itens'
                              ) : cartSize == 1 ? (
                                cartSize + ' item'
                              ) : (
                                <h1>Carrinho está vazio</h1>
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="card-body gap-6">
                          {cartSize && cartSize > 0 ? (
                            values.map(
                              (res) =>
                                res.id && (
                                  <li className="list-none" key={res.id}>
                                    <ProductCart
                                      id={res.id}
                                      amount={res.amount}
                                      name={res.product.name}
                                      color={res.product.color}
                                      price={res.subTotal}
                                      memory={res.product.memory}
                                      image={res.product.media[0].original_url}
                                    />
                                  </li>
                                )
                            )
                          ) : (
                            <h1>Carrinho vazio</h1>
                          )}
                        </div>
                        <div className="card-body bg-base-200">
                          {somaTotal > 0 ? (
                            <div className="flex justify-between py-4">
                              <span className="text-gray-500 text-lg">
                                Valor Total:
                              </span>
                              <span className="font-semibold text-lg">
                                R$ {moneyMask(somaTotal.toString())}
                              </span>
                            </div>
                          ) : (
                            ''
                          )}
                          {cartSize && cartSize > 0 ? (
                            <div className="card-actions justify-center">
                              <a
                                onClick={() => {
                                  setShowCart(!showCart)
                                  router.push('/shipping')
                                }}
                                className="btn btn-success btn-block font-medium normal-case"
                              >
                                Finalizar Compra
                              </a>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-border max-w-7xl mx-auto border-t-[1px] opacity-50"></div>
              <div
                className={
                  'z-50 w-full h-12 transition-all duration-300 fixed flex md:hidden ' +
                  (showSearch === false ? '-mt-[120px]' : 'mt-0')
                }
              >
                <input
                  type="input"
                  name="search-form"
                  id="search-form"
                  className="input input-bordered rounded-none w-full text-white bg-primary"
                  placeholder="Pesquisa..."
                  onClick={() =>
                    router.asPath !== '/' ? router.push('/') : null
                  }
                  onChange={(e) => changeState(e.target.value)}
                />
              </div>
              <div
                className={
                  'w-full mb-2 transition-all durantion-200 ' +
                  (showSearch === false ? 'mt-0' : 'mt-12')
                }
              >
                <div className="w-full border-t border-base-200 border-opacity-10 text-primary-content max-w-7xl mx-auto">
                  <ul className="menu menu-horizontal w-full text-md overflow-auto sm:text-sm">
                    {dataApi?.data?.length > 0 && (
                      <li>
                        <Link href={'/'}>
                          <a>Todos</a>
                        </Link>
                      </li>
                    )}
                    {dataApi?.data?.length > 0 ? (
                      dataApi.data.map((category: any) => (
                        <li key={category.id}>
                          <Link href={`/${category.slug}`} passHref>
                            <a className="w-max">{category.name}</a>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li>
                        <div className="flex gap-3">
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <h1>Carregando...</h1>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="overflow-hidden">
                  <div className={styles.divisorbuyphone}></div>
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
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
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
            onClick={() => setIsOn(!isOn)}
          ></label>
          <div className="menu overflow-y-auto h-[100vh] bg-base-100 text-base-content fixed flex">
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
                      {user?.type == 1 ? 'Revendedor' : 'Consumidor'}
                    </h2>
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-full p-4">
                    <Link href={'/login'} passHref>
                      <a className="link text-info-content">Realizar login</a>
                    </Link>
                  </div>
                )}
              </div>
              <label
                htmlFor="my-drawer"
                className="swap swap-rotate p-6"
                onClick={() => setIsOn(!isOn)}
              >
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

            <label
              htmlFor="my-drawer"
              className="flex px-4 cursor-pointer"
              onClick={() => {
                setIsOn(!isOn)
                router.push('/')
              }}
            >
              <div className="flex py-8 gap-3 w-full">
                <HomeIcon className="h-5 w-5 text-info-content" />
                <span className="text-info-content">Página inicial</span>
              </div>
            </label>

            <div className="collapse collapse-arrow h-auto overflow-y-auto">
              <input type="checkbox" />
              <div className="collapse-title flex gap-3 text-xl">
                <ShoppingBagIcon className="h-5 w-5 text-info-content" />
                <span className="text-info-content text-base">Produtos</span>
              </div>
              <div className="collapse-content flex flex-col overflow-auto gap-2 h-auto">
                {dataApi?.data.length > 0 ? (
                  dataApi.data.map((category: any) => (
                    <label
                      htmlFor="my-drawer"
                      key={category.id}
                      className="flex px-4 cursor-pointer"
                      onClick={() => {
                        setIsOn(!isOn)
                        router.push(
                          `/${category.name.replace(/ /g, '-').toLowerCase()}`
                        )
                      }}
                    >
                      {category.name}
                    </label>
                  ))
                ) : (
                  <p>Carregando.</p>
                )}
              </div>
            </div>

            <label
              htmlFor="my-drawer"
              className="flex px-4 cursor-pointer"
              onClick={() => {
                setIsOn(!isOn)
                router.push('/user/profile')
              }}
            >
              <div className="flex py-8 gap-3 w-full">
                <UserIcon className="h-5 w-5 text-info-content" />
                <span className="text-info-content">Minha conta</span>
              </div>
            </label>
            <label
              htmlFor="my-drawer"
              className="flex px-4 cursor-pointer"
              onClick={() => {
                setIsOn(!isOn)
                signOut()
              }}
            >
              <div className="flex py-8 gap-3 items-center w-full">
                <LogoutIcon className="h-5 w-5 text-info-content" />
                <span className="text-info-content">Sair</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}
