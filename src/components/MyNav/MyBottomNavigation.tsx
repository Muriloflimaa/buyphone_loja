import { makeStyles } from '@mui/styles'
import * as React from 'react'
import { SearchIcon } from '@heroicons/react/solid'

interface IStyle {
    make: {
        style: {}
    }
}

const useStyles = makeStyles(() => ({
    styleBottomNavigation: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '70px',
        padding: 0,
        backgroundColor: '#000000',
        '& .Mui-selected': {
            color: '#FFFFFF',
            borderRadius: '50%',
            '& .MuiSvgIcon-root': {
                marginTop: '-26px',

                transition: '.5s linear all',
            },
        },
    },
    styleBottomNavigationAction: {
        minWidth: 'auto',
        color: '#FFFFFF',
    },
    styleBallBar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '151px',
        height: '103px',
        top: '-32px',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='151' height='35' viewdiv='0 0 151 35' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M75 1C39 0.999476 29.5 34.0066 0 34.0066L150 34.0068C127 32.0068 105.5 1.00044 75 1Z' fill='black' stroke='black'/%3E%3C/svg%3E")`,
        left: '50vw',
        transition: '.3s ease-in-out all',
    },
    styleBall: {
        display: 'block',
        backgroundColor: '#7959FD',
        borderRadius: '50%',
        height: '66px',
        width: '66px',

        transition: '.5s ease-in-out all',
    },
}))

export default function MyBottomNavigation() {
    const [value, setValue] = React.useState(3)
    const [move, setMove] = React.useState('50vw')
    const [color, setColor] = React.useState('#7959FD')
    const classes = useStyles()

    const positions = [10, 30, 50, 70, 90]
    const colors = ['#FFE85B', '#EE466B', '#7959FD', '#3E9EFB', '#4CF0DE']

    const handleSlide = (where: number) => {
        const moveTo = positions[where] + 'vw'
        setMove(moveTo)
        setColor(colors[where])
    }

    return (
        <div
            className={classes.styleBottomNavigation}
            value={value}
            onChange={(event: any, newValue: any) => {
                setValue(newValue)
            }}
        >
            <div
                className={classes.styleBallBar}
                style={{ transform: 'translateX(-50%)', left: `${move}` }}
            >
                <span
                    className={classes.styleBall}
                    style={{ backgroundColor: `${color}` }}
                />
            </div>
            <div
                onClick={() => handleSlide(0)}
                className={classes.styleBottomNavigationAction}
            >
                <SearchIcon className="h-5 w-5 text-PrimaryText" />
            </div>
            <div
                onClick={() => handleSlide(1)}
                className={classes.styleBottomNavigationAction}
            >
                <SearchIcon className="h-5 w-5 text-PrimaryText" />
            </div>
            <div
                onClick={() => handleSlide(2)}
                className={classes.styleBottomNavigationAction}
            >
                <SearchIcon className="h-5 w-5 text-PrimaryText" />
            </div>
            <div
                onClick={() => handleSlide(3)}
                className={classes.styleBottomNavigationAction}
            >
                <SearchIcon className="h-5 w-5 text-PrimaryText" />
            </div>
            <div
                onClick={() => handleSlide(4)}
                className={classes.styleBottomNavigationAction}
            >
                <SearchIcon className="h-5 w-5 text-PrimaryText" />
            </div>
        </div>
    )
}
