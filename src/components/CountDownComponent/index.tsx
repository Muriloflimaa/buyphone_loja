interface CountDownComponentProps {
  changeText: boolean
  countDownBlackFriday: {
    days: number
    minutes: number
    seconds: number
    hours: number
  }
}
const CountDownComponent = ({
  changeText,
  countDownBlackFriday,
}: CountDownComponentProps) => {
  return (
    <span
      className={
        'badge font-semibold text-[8px] px-0 md:text-xs md:px-3 ' +
        (changeText ? 'bg-black text-white' : 'badge-warning text-black')
      }
    >
      {changeText
        ? 'Produto da Black Friday'
        : `Expira em ${
            !!countDownBlackFriday &&
            countDownBlackFriday.days +
              'd ' +
              countDownBlackFriday.hours +
              'h ' +
              countDownBlackFriday.minutes +
              'm ' +
              countDownBlackFriday.seconds +
              's '
          }`}
    </span>
  )
}

export default CountDownComponent
