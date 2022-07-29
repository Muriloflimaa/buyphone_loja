import * as React from 'react'
import {
    SearchIcon,
    ChartBarIcon,
    CashIcon,
    HomeIcon,
    ShoppingCartIcon,
    BellIcon,
} from '@heroicons/react/solid'

const MyBottomNavigation = () => {
    const [value, setValue] = React.useState(3)
    const [move, setMove] = React.useState('50%')
    const [color, setColor] = React.useState('#7959FD')
    const positions = [10, 30, 50, 70, 90]
    const [pos, setPos] = React.useState('50')
    const colors = ['#FFE85B', '#EE466B', '#7959FD', '#3E9EFB', '#4CF0DE']

    const handleSlide = (where) => {
        const moveTo = positions[where] + '%'
        setMove(moveTo)
        setColor(colors[where])

        if (moveTo == '10%') {
            setPos('10')
        }
        if (moveTo == '30%') {
            setPos('30')
        }
        if (moveTo == '50%') {
            setPos('50')
        }
        if (moveTo == '70%') {
            setPos('70')
        }
        if (moveTo == '90%') {
            setPos('90')
        } else {
            return 0
        }
    }

    return (
        <div
            className="flex justify-around items-center fixed bottom-0 w-full h-16 p-0 bg-black"
            value={value}
            onChange={( newValue ) => { setValue(newValue)}}
        >
            <div
                className="flex justify-center items-center absolute w-[151px] h-[100px] -mt-[28px] left-[50%] transition-all duration-300 ease-in-out bg-curved"
                style={{ transform: 'translateX(-50%)', left: `${move}` }}
            >
                <span
                    className="block bg-[#7959FD] rounded-[50%] h-[66px] w-[66px] transition-all ease-in-out duration-500"
                    style={{ backgroundColor: `${color}` }}
                />
            </div>

            <div
                onClick={() => handleSlide(0)}
                className={
                    pos == '10'
                        ? 'w-auto text-PrimaryText cursor-pointer z-50 -mt-7 scale-125 ease-in-out duration-300'
                        : 'w-auto text-PrimaryText cursor-pointer z-50 mt-0 scale-100 ease-in-out duration-300'
                }
            >
                <ChartBarIcon
                    id="ChartBarIcon"
                    className="h-5 w- text-PrimaryText"
                />
            </div>
            <div
                onClick={() => handleSlide(1)}
                className={
                    pos == '30'
                        ? 'w-auto text-PrimaryText cursor-pointer z-50 -mt-7 scale-125 ease-in-out duration-300'
                        : 'w-auto text-PrimaryText cursor-pointer z-50 mt-0 scale-100 ease-in-out duration-300'
                }
            >
                <CashIcon id="CashIcon" className="h-5 w-5 text-PrimaryText" />
            </div>
            <div
                onClick={() => handleSlide(2)}
                className={
                    pos == '50'
                        ? 'w-auto text-PrimaryText cursor-pointer z-50 -mt-7 scale-125 ease-in-out duration-300'
                        : 'w-auto text-PrimaryText cursor-pointer z-50 mt-0 scale-100 ease-in-out duration-300'
                }
            >
                <HomeIcon id="HomeIcon" className="h-5 w-5 text-PrimaryText" />
            </div>
            <div
                onClick={() => handleSlide(3)}
                className={
                    pos == '70'
                        ? 'w-auto text-PrimaryText cursor-pointer z-50 -mt-7 scale-125 ease-in-out duration-300'
                        : 'w-auto text-PrimaryText cursor-pointer z-50 mt-0 scale-100 ease-in-out duration-300'
                }
            >
                <ShoppingCartIcon
                    id="ShoppingCartIcon"
                    className="h-5 w-5 text-PrimaryText"
                />
            </div>
            <div
                onClick={() => handleSlide(4)}
                className={
                    pos == '90'
                        ? 'w-auto text-PrimaryText cursor-pointer z-50 -mt-7 scale-125 ease-in-out duration-300'
                        : 'w-auto text-PrimaryText cursor-pointer z-50 mt-0 scale-100 ease-in-out duration-300'
                }
            >
                <BellIcon className="h-5 w-5 text-PrimaryText" />
            </div>
        </div>
    )
}
export default MyBottomNavigation
