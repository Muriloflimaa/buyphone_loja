import {
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useCart } from '../../context/UseCartContext'

export default function MyBottomNavigation() {
  const router = useRouter()
  const [pos, setPos] = useState('')
  const [move, setMove] = useState('-150%')
  const [color, setColor] = useState('#7959FD')
  const positions = [10, 30, 50, 70, 90]
  const colors = ['#FFE85B', '#EE466B', '#7959FD', '#3E9EFB', '#4CF0DE']
  const { cart } = useCart()
  const [cartSize, setCartSize] = useState<number>()

  useEffect(() => {
    if (cart) {
      setCartSize(cart.length)
    }
  }, [cart])

  const handleSlide = (where: number) => {
    setMove(positions[where] + '%')
    setColor(colors[where])
    setPos(positions[where].toString())
  }
  useEffect(() => {
    if (router.asPath === '/rota-do-slide-0-aqui-esta-desativado') {
      handleSlide(0)
      return
    }

    if (router.asPath === '/user/profile') {
      handleSlide(1)
      return
    }

    if (router.asPath === '/') {
      handleSlide(2)
      return
    }

    if (
      router.asPath === '/cart' ||
      router.asPath == '/shipping' ||
      router.asPath == '/shipping/payment/pix' ||
      router.asPath == '/shipping/address' ||
      router.asPath == '/shipping/payment' ||
      router.asPath == '/shipping/payment/custom' ||
      router.asPath == '/shipping/payment/credit' ||
      router.asPath == '/shipping/payment/credit-checkout' ||
      router.asPath == '/shipping/payment/match-installments' ||
      router.asPath == '/shipping/payment/pix-checkout'
    ) {
      handleSlide(3)
      return
    }

    if (router.asPath === '/myshopping') {
      handleSlide(4)
      return
    } else {
      handleSlide(2)
    }
  }, [router.asPath])

  return (
    <div className="flex z-50 justify-around items-center max-w-[1600px] fixed bottom-0 w-full h-12 p-0 bg-black md:hidden">
      <div
        className={
          'flex justify-center items-center absolute w-[151px] h-[100px] -mt-[14px] transition-all duration-300 ease-in-out bg-curved'
        }
        style={{ transform: 'translateX(-50%)', left: `${move}` }}
      >
        <span
          className="block rounded-[50%] h-[56px] w-[56px] -mt-[15px] transition-all ease-in-out duration-500"
          style={{ backgroundColor: `${color}` }}
        />
      </div>

      <div
        onClick={() => /*handleSlide(0),*/ router.back()}
        className={
          'w-auto text-PrimaryText cursor-pointer z-50 ease-in-out transition-all duration-300 ' +
          (pos === '10' ? '-mt-7 scale-125' : 'mt-0 scale-100 ')
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="h-5 w-5 text-PrimaryText"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
      </div>

      <Link href="/user/profile" passHref>
        <div
          onClick={() => handleSlide(1)}
          className={
            'w-auto text-PrimaryText cursor-pointer z-50  ease-in-out transition-all duration-300 ' +
            (pos === '30' ? '-mt-7 scale-125' : 'mt-0 scale-100 ')
          }
        >
          <UserCircleIcon
            id="ChartBarIcon"
            className="h-5 w-5 text-PrimaryText"
          />
        </div>
      </Link>
      <Link href="/" passHref>
        <div
          onClick={() => handleSlide(2)}
          className={
            'w-auto text-PrimaryText cursor-pointer z-50 ease-in-out transition-all duration-300 ' +
            (pos === '50' ? '-mt-7 scale-125' : 'mt-0 scale-100 ')
          }
        >
          <HomeIcon id="HomeIcon" className="h-5 w-5 text-PrimaryText" />
        </div>
      </Link>
      <Link href="/cart" passHref>
        <div
          onClick={() => handleSlide(3)}
          className={
            'w-auto text-PrimaryText cursor-pointer z-50 ease-in-out transition-all duration-300 ' +
            (pos === '70' ? '-mt-7 scale-125' : 'mt-0 scale-100 ')
          }
        >
          <div className=" justify-end flex-col items-center cursor-pointer  relative">
            <ShoppingCartIcon className="h-5 w-5 text-PrimaryText" />
            {cartSize && cartSize > 0 ? (
              <div className="absolute">
                <span className="flex h-3 w-3 relative -mt-[1.6rem] ml-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </Link>
      <Link href="/myshopping" passHref>
        <div
          onClick={() => handleSlide(4)}
          className={
            'w-auto text-PrimaryText cursor-pointer z-50 ease-in-out transition-all duration-300 ' +
            (pos === '90' ? '-mt-7 scale-125' : 'mt-0 scale-100 ')
          }
        >
          <ShoppingBagIcon className="h-5 w-5 text-PrimaryText" />
        </div>
      </Link>
    </div>
  )
}
