import Image from 'next/image'
import toast from 'react-hot-toast'
import ErrorImg from '../assets/images/error.webp'
import SuccessImg from '../assets/images/success.webp'

export const ToastCustom = (
  duration: number,
  message: string | any,
  state: string
) => {
  return toast.custom(
    (t) => (
      <div
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
              <p className="text-xs font-medium">Verifique o alerta abaixo:</p>
              <p className="mt-1 text-[11px] opacity-70">{message}</p>
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
