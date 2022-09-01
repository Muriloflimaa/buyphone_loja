import {
    BellIcon,
    CashIcon,
    ChartBarIcon,
    HomeIcon,
    ShoppingCartIcon
} from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const MyBottomNavigation = () => {
    const router = useRouter()
    const [pos, setPos] = useState('')
    const [move, setMove] = useState('-150%')
    const [color, setColor] = useState('#7959FD')
    const positions = [10, 30, 50, 70, 90]
    const colors = ['#FFE85B', '#EE466B', '#7959FD', '#3E9EFB', '#4CF0DE']

    const handleSlide = (where: number) => {
        setMove(positions[where] + '%')
        setColor(colors[where])
        setPos(positions[where].toString())
    }
    useEffect(() => {
        if (
            router.asPath === '/cart' ||
            router.asPath === '/shipping' ||
            router.asPath === '/shipping/address'
        ) {
            handleSlide(3)
        }

        if (router.asPath === '/') {
            handleSlide(2)
        }
    }, [router.asPath])

    return (
        <div className="flex justify-around items-center max-w-[1600px] fixed bottom-0 w-full h-16 p-0 bg-black md:hidden">
            <div
                className={
                    'flex justify-center items-center absolute w-[151px] h-[100px] -mt-[28px] transition-all duration-300 ease-in-out bg-curved'
                }
                style={{ transform: 'translateX(-50%)', left: `${move}` }}
            >
                <span
                    className="block rounded-[50%] h-[66px] w-[66px] transition-all ease-in-out duration-500"
                    style={{ backgroundColor: `${color}` }}
                />
            </div>

            <div
                onClick={() => handleSlide(0)}
                className={
                    'w-auto text-PrimaryText cursor-pointer z-50 ease-in-out transition-all duration-300 ' +
                    (pos === '10' ? '-mt-7 scale-125' : 'mt-0 scale-100 ')
                }
            >
                <ChartBarIcon
                    id="ChartBarIcon"
                    className="h-5 w-5 text-PrimaryText"
                />
            </div>
            <div
                onClick={() => handleSlide(1)}
                className={
                    'w-auto text-PrimaryText cursor-pointer z-50  ease-in-out transition-all duration-300 ' +
                    (pos === '30' ? '-mt-7 scale-125' : 'mt-0 scale-100 ')
                }
            >
                <CashIcon id="CashIcon" className="h-5 w-5 text-PrimaryText" />
            </div>
            <div
                onClick={() => handleSlide(2)}
                className={
                    'w-auto text-PrimaryText cursor-pointer z-50 ease-in-out transition-all duration-300 ' +
                    (pos === '50' ? '-mt-7 scale-125' : 'mt-0 scale-100 ')
                }
            >
                <HomeIcon
                    onClick={() => router.push('/')}
                    id="HomeIcon"
                    className="h-5 w-5 text-PrimaryText"
                />
            </div>
            <Link href="/cart" passHref>
                <div
                    onClick={() => handleSlide(3)}
                    className={
                        'w-auto text-PrimaryText cursor-pointer z-50 ease-in-out transition-all duration-300 ' +
                        (pos === '70' ? '-mt-7 scale-125' : 'mt-0 scale-100 ')
                    }
                >
                    <ShoppingCartIcon
                        id="ShoppingCartIcon"
                        className="h-5 w-5 text-PrimaryText"
                    />
                </div>
            </Link>
            <div
                onClick={() => handleSlide(4)}
                className={
                    'w-auto text-PrimaryText cursor-pointer z-50 ease-in-out transition-all duration-300 ' +
                    (pos === '90' ? '-mt-7 scale-125' : 'mt-0 scale-100 ')
                }
            >
                <BellIcon className="h-5 w-5 text-PrimaryText" />
            </div>
        </div>
    )
}
export default MyBottomNavigation
