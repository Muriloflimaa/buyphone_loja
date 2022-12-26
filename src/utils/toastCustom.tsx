import Image from 'next/image'
import toast from 'react-hot-toast'
import BelaError from '../assets/images/bela_error_toast.webp'
import BelaSuccess from '../assets/images/bela_success_toast.webp'

export const ToastCustom = (
  duration: number,
  message: string | any,
  state: string,
  alert = 'Verifique o alerta abaixo'
) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        }  z-50 h-auto items-center rounded-lg pointer-events-auto`}
      >
        <div
          className={`alert ${
            state === 'error' ? 'bg-red-200' : 'bg-green-200'
          } items-start border-l-4 ${
            state === 'error' ? 'border-red-700' : 'border-green-700'
          }  shadow-lg z-50 sm:right-2 w-80 mx-auto  text-green-900`}
        >
          <div className="flex gap-3">
            {state === 'error' ? (
              <div className="h-full">
                <Image
                  src={BelaError}
                  quality={100}
                  width="60px"
                  height="70px"
                  alt="Imagem personagem Belatriz"
                ></Image>
              </div>
            ) : (
              <div className="h-full">
                <Image
                  src={BelaSuccess}
                  quality={100}
                  width="60px"
                  height="70px"
                  alt="Imagem personagem Belatriz"
                ></Image>
              </div>
            )}
            <div>
              <p
                className={`
                  'text-xs ' 
                  ${
                    state === 'error'
                      ? 'text-red-600 font-bold'
                      : 'text-green-600 font-medium'
                  }
                `}
              >
                {alert}
              </p>
              <div className="text-xs">
                <p
                  className={`mt-1 text-[11px] opacity-70 ${
                    state === 'error' ? 'text-red-600' : 'text-green-600'
                  }`}
                >
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
