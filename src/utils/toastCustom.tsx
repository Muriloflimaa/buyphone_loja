import Image from 'next/image'
import toast from 'react-hot-toast'
import ErrorImg from '../assets/images/error.webp'
import SuccessImg from '../assets/images/success.webp'

export const ToastCustom = (
  duration: number,
  message: string | any,
  state: string,
  alert?: string
) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        }  z-50 h-auto items-center rounded-lg pointer-events-auto`}
      >
        <div
          className={
            'alert items-start border-l-4 border-green-700 shadow-lg z-50 sm:right-2 w-80 mx-auto ' +
            (!!alert
              ? 'bg-green-200 text-green-900'
              : 'bg-primary text-primary-content')
          }
        >
          <div className="flex gap-3">
            {state === 'error' ? (
              <div className="w-10 h-10 md:w-20 md:h-w-20">
                <Image src={ErrorImg} layout="responsive"></Image>
              </div>
            ) : (
              <div className="w-10 h-10 md:w-20 md:h-w-20">
                <Image src={SuccessImg} layout="responsive"></Image>
              </div>
            )}
            <div>
              <p className="text-xs font-medium">
                {!!alert ? alert : 'Verifique o alerta abaixo'}
              </p>
              <div className="text-xs">
                <p className="mt-1 text-[11px] opacity-70">{message}</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } w-full md:w-1/2 bg-primary text-primary-content h-auto items-center shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 pt-0.5">
              {state === 'error' ? (
                <Image
                  src={ErrorImg}
                  layout="fixed"
                  width={40}
                  height={50}
                ></Image>
              ) : (
                <Image
                  src={SuccessImg}
                  layout="fixed"
                  width={40}
                  height={50}
                ></Image>
              )}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-xs font-medium">{alert}</p>
              <p className="mt-1 text-[11px] opacity-70">{message}</p>
            </div>
          </div>
        </div> */}
      </div>
    ),
    {
      duration: duration,
    }
  )
}
