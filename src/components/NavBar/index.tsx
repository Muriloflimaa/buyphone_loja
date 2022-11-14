import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  HomeIcon,
  LogoutIcon,
  SearchIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TagIcon,
  UserCircleIcon,
  UserIcon,
  XIcon,
} from '@heroicons/react/solid'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useContext, useEffect, useState } from 'react'
import { Divider } from 'react-daisyui'
import { SubmitHandler, useForm } from 'react-hook-form'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import * as yup from 'yup'
import Logo from '../../assets/images/logo.svg'
import { AuthContext } from '../../context/AuthContext'
import { useCart } from '../../context/UseCartContext'
import { apiStore } from '../../services/api'
import { ICategory } from '../../types'
import { moneyMask } from '../../utils/masks'
import { FirstAllUpper, UniqueName } from '../../utils/ReplacesName'
import LoadingComponent from '../LoadingComponent'
import InfoDiscount from '../Modals/Info-Discount'
import ProductCart from '../ProductCart'
import styles from './styles.module.scss'

type SearchFormData = {
  searchMobile: string
  searchDesktop: string
}

export default function NavBar() {
  const { signOut, userData, isUser } = useContext(AuthContext)
  const [showSearch, setShowSearch] = useState(false)
  const { cart, values, somaTotal, discountValue, isAttCart } = useCart()
  const [cartSize, setCartSize] = useState<number>()
  const [showCart, setShowCart] = useState(false)
  const [dataApi, setDataApi] = useState<Array<ICategory> | null>()
  const [notShowCart, setNotShowCart] = useState(false)
  const router = useRouter()
  const [openDrawer, setOpenDrawer] = useState(false)
  const cookies = parseCookies(undefined)

  useEffect(() => {
    if (cart) {
      setCartSize(cart.length)
    }
  }, [cart])

  useEffect(() => {
    async function Data() {
      try {
        const { data } = await apiStore.get(`categories/`)
        setDataApi(data.data)
      } catch (error) {
        setDataApi(null)
      }
    }
    Data()
  }, [])

  useEffect(() => {
    if (
      router.asPath == '/shipping/payment/pix/pix-checkout' ||
      router.asPath == '/shipping/payment' ||
      router.asPath == '/shipping/address' ||
      router.asPath == '/shipping/payment/credit/new-card' ||
      router.asPath == '/shipping/payment/credit/match-card' ||
      router.asPath == '/shipping/payment/credit/match-installments' ||
      router.asPath == '/shipping/payment/credit/credit-checkout' ||
      router.asPath == '/shipping/payment/custom' ||
      router.asPath == '/shipping/payment/credit' ||
      router.asPath == '/shipping/payment/credit-checkout' ||
      router.asPath == '/shipping/payment/match-installments' ||
      router.asPath == '/shipping/payment/credit-finally'
    ) {
      setNotShowCart(true)
    } else {
      setNotShowCart(false)
    }
  }, [router.asPath])

  const SearchSchema = yup.object().shape({
    searchMobile: yup.string(),
    searchDesktop: yup.string(),
  })

  const { register, handleSubmit, reset } = useForm<SearchFormData>({
    resolver: yupResolver(SearchSchema),
  })

  const handleSearch: SubmitHandler<SearchFormData> = async (values, event) => {
    event?.preventDefault()

    if (values.searchMobile !== '') {
      router.push(`/search-result/${values.searchMobile}`)
    }
    if (values.searchDesktop !== '') {
      router.push(`/search-result/${values.searchDesktop}`)
    }
    setShowSearch(false)
    reset()
  }

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState)
  }

  const handleOpenModalInfo = () => {
    return document
      .getElementById('modal-open-cadastre')
      ?.classList.add('modal-open')
  }

  return (
    <>
      <div className="fixed z-20 w-full">
        <div className="glass">
          <div className="bg-primary/[.9] relative">
            <div className="navbar">
              <div className="max-w-7xl mx-auto w-full justify-between">
                {/* NAVBAR LADO ESQUERDO */}
                <div className="navbar-start md:w-auto">
                  {/* MOBILE */}
                  <button className="block md:hidden" onClick={toggleDrawer}>
                    <svg
                      className="swap-off fill-current text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 512 512"
                    >
                      <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                    </svg>
                  </button>

                  {/* DESKTOP */}
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
                {/* NAVBAR CENTRAL */}
                <div className="navbar-center md:w-1/2">
                  {/* MOBILE */}
                  <div className="block md:hidden">
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

                  {/* DESKTOP */}
                  <form
                    onSubmit={handleSubmit(handleSearch)}
                    className="relative flex"
                  >
                    <input
                      {...register('searchDesktop')}
                      type="text"
                      className="input rounded-md hidden md:block w-full text-info-content bg-base-200"
                      placeholder="Pesquisa..."
                    />
                    <button type="submit" className="absolute right-4 top-4">
                      <SearchIcon className="h-5 w-5 text-info-content hidden md:block" />
                    </button>
                  </form>
                </div>

                {/* NAVBAR LADO DIREITO */}
                <div className="navbar-end flex justify-end md:w-auto">
                  {/* MOBILE */}
                  <div className="md:hidden flex">
                    {!showSearch ? (
                      <SearchIcon
                        className="h-5 w-5 text-white"
                        onClick={() => setShowSearch(!showSearch)}
                      />
                    ) : (
                      <XIcon
                        className="h-5 w-5 text-white"
                        onClick={() => setShowSearch(!showSearch)}
                      />
                    )}
                    <div
                      className={`items-center flex-col ${
                        cookies.LEAD === 'true' ? 'flex' : 'hidden'
                      }`}
                    >
                      <div className="ml-3 flex">
                        <label
                          htmlFor="modal-info-discount"
                          className="cursor-pointer"
                        >
                          <TagIcon className="h-5 w-5 text-white" />
                        </label>
                        <div className="w-2 h-2 rounded-full bg-info"></div>
                      </div>
                    </div>
                  </div>
                  {/* DESKTOP */}
                  <div className="md:flex justify-end items-center gap-5 w-full hidden">
                    {!isUser ? (
                      <Link href={'/account/login'} passHref>
                        <a>
                          <div className="flex justify-end flex-col items-center cursor-pointer">
                            <FontAwesomeIcon
                              icon={faCircleUser}
                              className="w-7 h-7 text-white"
                            />
                          </div>
                        </a>
                      </Link>
                    ) : (
                      <div className="hidden sm:inline-block dropdown dropdown-end px-2">
                        <label
                          tabIndex={0}
                          className="btn btn-sm bg-rose-500 hover:bg-rose-700 h-auto py-2 rounded-full text-base-100 flex-row gap-2 pr-1"
                        >
                          <span className="normal-case text-white">
                            Olá, {UniqueName(userData?.name)}
                          </span>
                          <FontAwesomeIcon
                            icon={faCircleUser}
                            className="w-6 h-6 mr-1 text-white"
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
                            <Link href={'/user/myshopping'}>
                              <a>Minhas Compras</a>
                            </Link>
                          </li>
                          {userData && (
                            <li>
                              <button
                                className="text-left w-full"
                                type="submit"
                                onClick={() => signOut()}
                              >
                                Sair
                              </button>
                            </li>
                          )}
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
                    {!notShowCart && (
                      <div
                        className={
                          'dropdown dropdown-end ' +
                          (showCart ? 'opacity-100 visible' : '')
                        }
                      >
                        <label className="m-1">
                          <div className="hidden justify-end flex-col items-center cursor-pointer md:flex relative">
                            <ShoppingCartIcon
                              className="h-7 w-7 text-white hidden md:block"
                              onClick={() => setShowCart(!showCart)}
                            />
                            {cartSize && cartSize > 0 ? (
                              <div className="absolute">
                                <span className="flex h-3 w-3 relative -mt-[2.04rem] ml-7">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                              </div>
                            ) : null}
                          </div>
                        </label>

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
                                {cartSize && cartSize > 1
                                  ? cartSize + ' itens'
                                  : cartSize == 1
                                  ? cartSize + ' item'
                                  : 'Carrinho está vazio'}
                              </span>
                            </div>
                          </div>

                          <div className="card-body max-h-80 overflow-y-auto gap-6">
                            {cartSize && cartSize > 0 && !!isAttCart ? (
                              cart.map((res) => (
                                <div
                                  key={res.id}
                                  className="flex animate-pulse justify-between w-full min-h-[70px] p-4"
                                >
                                  <div className="flex gap-3 w-full">
                                    <div className="w-8 h-full bg-slate-300 rounded flex items-center"></div>

                                    <div className="flex flex-col gap-2 justify-between">
                                      <div className="grid gap-2">
                                        <div className="h-2 w-8 bg-slate-300 rounded "></div>

                                        <div className="h-2 w-8 bg-slate-300 rounded "></div>
                                      </div>

                                      <div className="h-2 w-8 bg-slate-300 rounded "></div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col w-1/3 gap-2 justify-between items-end">
                                    <div className="h-2 w-full bg-slate-300 rounded "></div>

                                    <div className="flex w-full justify-end">
                                      <div className="h-2 w-1/2 bg-slate-300 rounded "></div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : cartSize && cartSize > 0 ? (
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
                                        image={
                                          res.product.media[0].original_url
                                        }
                                        blackfriday={res.product.blackfriday}
                                      />
                                    </li>
                                  )
                              )
                            ) : (
                              <h1>Carrinho vazio</h1>
                            )}
                          </div>
                          <div className="card-body bg-base-200">
                            {cartSize && cartSize > 0 && !!isAttCart ? (
                              <div className="flex justify-between items-center py-4">
                                <span className="text-gray-500 text-lg">
                                  Valor Total:
                                </span>
                                <div className="flex flex-col">
                                  {userData?.promotion && (
                                    <span className="text-[14px] text-gray-500 line-through text-right">
                                      R${' '}
                                      {moneyMask(
                                        (somaTotal + discountValue).toString()
                                      )}
                                    </span>
                                  )}
                                  <span className="font-semibold text-lg animate-pulse blur-sm">
                                    R$ xxxx
                                  </span>
                                </div>
                              </div>
                            ) : somaTotal > 0 ? (
                              <>
                                {userData?.promotion && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">
                                      Desconto:
                                    </span>
                                    <span className="font-semibold text-sm text-green-600">
                                      R$ -150,00
                                    </span>
                                  </div>
                                )}
                                <div className="flex justify-between items-center py-4">
                                  <span className="text-gray-500 text-lg">
                                    Valor Total:
                                  </span>
                                  <div className="flex flex-col">
                                    {userData?.promotion && (
                                      <span className="text-[14px] text-gray-500 line-through text-right">
                                        R${' '}
                                        {moneyMask(
                                          (somaTotal + discountValue).toString()
                                        )}
                                      </span>
                                    )}
                                    <span className="font-semibold text-lg">
                                      R$ {moneyMask(somaTotal.toString())}
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              ''
                            )}
                            {cartSize && cartSize > 0 ? (
                              <div className="card-actions justify-center">
                                <button
                                  onClick={() => {
                                    setShowCart(!showCart)
                                    router.push('/shipping')
                                  }}
                                  className="btn border-transparent bg-success w-full text-white"
                                >
                                  Finalizar Compra
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    )}
                    <div
                      className={`items-center flex-col mt-6 -ml-7 ${
                        cookies.LEAD === 'true' ? 'flex' : 'hidden'
                      }`}
                    >
                      <div className="">
                        <label
                          htmlFor="modal-info-discount"
                          className="cursor-pointer"
                        >
                          <TagIcon className="h-7 w-7 text-white hidden md:block" />
                        </label>
                      </div>
                      <div className="badge badge-info text-xs mt-1">
                        Desconto
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-border max-w-7xl mx-auto border-t-[1px] opacity-50"></div>
            <div
              className={
                'z-50 w-full transition-all duration-300 fixed md:hidden flex flex-col gap-3 ' +
                (showSearch === false ? '-mt-[250px]' : 'mt-0')
              }
            >
              <form
                onSubmit={handleSubmit(handleSearch)}
                className="relative flex"
              >
                <input
                  {...register('searchMobile')}
                  type="text"
                  className="input rounded-none w-full text-info-content bg-base-200 block md:hidden px-4"
                  placeholder="Pesquisa..."
                />
                <button type="submit">
                  <SearchIcon className="h-5 w-5 text-info-content absolute right-4 top-4" />
                </button>
              </form>
            </div>
            <div
              className={
                'w-full mb-2 transition-all durantion-200 ' +
                (showSearch === false ? 'mt-0' : 'mt-12')
              }
            >
              <div className="w-full border-t border-base-200 border-opacity-10 text-primary-content max-w-7xl mx-auto">
                <ul className="menu menu-horizontal w-full text-md overflow-auto sm:text-sm">
                  {process.env.NEXT_PUBLIC_BLACK_FRIDAY &&
                    !!JSON.parse(process.env.NEXT_PUBLIC_BLACK_FRIDAY) && (
                      <li className="bg-white text-black font-semibold">
                        <Link href={'/black-friday'}>
                          <a>Black Friday</a>
                        </Link>
                      </li>
                    )}
                  {dataApi && dataApi?.length > 0 && (
                    <li>
                      <Link href={'/'}>
                        <a>Início</a>
                      </Link>
                    </li>
                  )}
                  {dataApi && dataApi?.length > 0 ? (
                    dataApi?.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/products/apple/iphones/${category.slug}`}
                          passHref
                        >
                          <a className="w-max">{category.name}</a>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <LoadingComponent />
                  )}
                </ul>
              </div>
              <div className="overflow-hidden">
                <div className={styles.divisorbuyphone}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* fim da navbar */}

      {/* drawer/para/mobile */}
      <Drawer
        open={openDrawer}
        onClose={toggleDrawer}
        direction="left"
        duration={400}
        className="w-auto"
      >
        <ul className="menu p-4 overflow-x-hidden w-80 h-full bg-base-100 text-base-content">
          <div className="flex items-center justify-between">
            <div className="flex justify-between items-center px-4">
              <div>
                {!isUser ? (
                  <UserCircleIcon className="w-10 h-10" />
                ) : (
                  <img
                    src={userData?.profile_photo_url}
                    alt={'user'}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
              </div>
              {!!isUser ? (
                <div className="flex flex-col px-6">
                  <h1 className="text-xl font-semibold text-info-content">
                    {FirstAllUpper(userData?.name)}
                  </h1>
                  <h2 className="text-info-content">
                    {userData?.type == 1 ? 'Revendedor' : 'Consumidor'}
                  </h2>
                </div>
              ) : (
                <div className="flex justify-center items-center w-full p-4">
                  <Link href={'/account/login'} passHref>
                    <a className="link text-info-content">Login</a>
                  </Link>
                </div>
              )}
            </div>
            <div onClick={toggleDrawer}>
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
            </div>
          </div>
          <Divider />
          <div className="h-full flex flex-col justify-between">
            <div className="flex flex-col gap-5">
              <div className="flex px-4 cursor-pointer" onClick={toggleDrawer}>
                <Link href={'/'}>
                  <a className="flex gap-3 w-full">
                    <HomeIcon className="h-5 w-5 text-info-content" />
                    <span className="text-info-content">Página inicial</span>
                  </a>
                </Link>
              </div>

              <div className="collapse collapse-arrow w-full mx-4">
                <input id="Check1" className="p-0 min-h-0" type="checkbox" />
                <label htmlFor="Check1"></label>
                <div className="collapse-title after:top-2 min-h-0 p-0 text-xl font-medium w-full">
                  <div className="flex items-center gap-3">
                    <ShoppingBagIcon className="h-5 w-5 text-info-content" />
                    <span className="text-info-content font-light text-base">
                      Produtos
                    </span>
                  </div>
                </div>

                <div className="collapse-content">
                  {dataApi && dataApi?.length > 0 ? (
                    dataApi?.map((category) => (
                      <div
                        key={category.id}
                        className="flex px-4 cursor-pointer"
                        onClick={toggleDrawer}
                      >
                        <Link href={`/products/apple/iphones/${category.slug}`}>
                          <a>{category.name}</a>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <LoadingComponent />
                  )}
                </div>
              </div>

              <div className="flex px-4 cursor-pointer" onClick={toggleDrawer}>
                <Link href={'/user/profile'}>
                  <a className="flex gap-3 w-full">
                    <UserIcon className="h-5 w-5 text-info-content" />
                    <span className="text-info-content">Minha conta</span>
                  </a>
                </Link>
              </div>

              <div className="flex px-4 cursor-pointer" onClick={toggleDrawer}>
                <Link href={'/institucional'}>
                  <a className="flex gap-3 w-full">
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      className="w-5 h-5"
                    />
                    <span className="text-info-content">
                      Conheça a BuyPhone
                    </span>
                  </a>
                </Link>
              </div>
              <Divider />
              {userData && (
                <div
                  className="flex px-4 cursor-pointer"
                  onClick={toggleDrawer}
                >
                  <div onClick={() => signOut()}>
                    <div className="flex gap-3 items-center w-full">
                      <LogoutIcon className="h-5 w-5 text-info-content" />
                      <span className="text-info-content">Sair</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ul>
      </Drawer>
      <InfoDiscount />
    </>
  )
}
