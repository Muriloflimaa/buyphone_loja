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
        <div className="alert items-start border-l-4 border-green-700 shadow-lg z-50 sm:right-2 w-80 mx-auto bg-green-200 text-green-900">
          <div className="flex gap-3 ">
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
              <p
                className={
                  'text-xs ' +
                  (state === 'error'
                    ? 'text-red-600 font-bold'
                    : 'text-black font-medium')
                }
              >
                {!!alert ? alert : 'Verifique o alerta abaixo'}
              </p>
              <div className="text-xs">
                <p className="mt-1 text-[11px] opacity-70 text-black">
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      duration: duration,
    }
  )
}
