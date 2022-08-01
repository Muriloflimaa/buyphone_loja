import { ReactElement } from 'react'
import MyBottomNavigation from '../MyBottomNavigation/MyBottomNavigation'
import NavBar from '../NavBar/NavBar'
interface Homeprops {
    children: ReactElement
}

const Body = ({ children }: Homeprops) => {
    return (
        <div className="max-w-[1600px] mx-auto">
            <NavBar />
            {children}
            <MyBottomNavigation />
        </div>
    )
}
export default Body
