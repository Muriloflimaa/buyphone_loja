import { ReactElement, useContext } from 'react'
import { Theme } from 'react-daisyui'
import { AuthContext } from '../../context/AuthContext'

interface ContainerProps {
  children: ReactElement
}
const Container = ({ children }: ContainerProps) => {
  const { user, isUser } = useContext(AuthContext)
  return (
    <Theme
      dataTheme={`${
        process.env.NEXT_PUBLIC_BLACK_FRIDAY &&
        !!JSON.parse(process.env.NEXT_PUBLIC_BLACK_FRIDAY)
          ? 'dark'
          : !!isUser && user && user.type === 1
          ? 'dark'
          : 'light'
      }`}
      className="bg-base-100"
    >
      {children}
    </Theme>
  )
}

export default Container
