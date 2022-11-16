import { useState } from 'react'

interface CountDownComponentProps {
  width?: string
  text?: string
}
const CountDownComponent = ({ width, text }: CountDownComponentProps) => {
  const [countDownBlackFriday, setCountDownBlackFriday] = useState<
    | { days: number; minutes: number; seconds: number; hours: number }
    | undefined
  >(undefined)
  const [changeText, setChangeText] = useState(true)

  const getCountDown = () => {
    const terminyBlack = process.env.NEXT_PUBLIC_TIME_COUNT_DOWN ?? ''
    var countDownDate = new Date(terminyBlack).getTime()

    // Update the count down every 1 second

    // Get today's date and time
    var now = new Date().getTime()

    // Find the distance between now and the count down date
    var distance = countDownDate - now

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / 1000)
    return {
      days,
      hours,
      minutes,
      seconds,
    }
  }

  setTimeout(() => {
    setChangeText(!changeText)
    setCountDownBlackFriday(getCountDown)
  }, 1400)

  return (
    <span
      className={
        'badge font-semibold px-0 md:px-3 ' +
        (width && width) +
        (text ? text : ' text-[8px] md:text-xs ') +
        (changeText ? ' bg-black text-white' : ' badge-warning text-black')
      }
    >
      {changeText
        ? 'Produto da Black Friday'
        : `Expira em ${
            !!countDownBlackFriday
              ? (countDownBlackFriday.days > 0
                  ? countDownBlackFriday.days + ' dias '
                  : '') +
                +countDownBlackFriday.hours +
                ':' +
                countDownBlackFriday.minutes +
                ':' +
                countDownBlackFriday.seconds
              : '00:00:00'
          }`}
    </span>
  )
}

export default CountDownComponent
