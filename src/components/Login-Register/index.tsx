import { ArrowLeftIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import LogoSvg from '../../assets/images/LogoPurple.webp'
import styles from './styles.module.scss'

interface Homeprops {
  children: ReactElement
}

const LoginRegister = ({ children }: Homeprops) => {
  const [showBack, setShowBack] = useState(false)
  const router = useRouter()
  useEffect(() => {
    if (router.asPath == '/terms' || router.asPath == '/politics') {
      setShowBack(true)
    } else {
      setShowBack(false)
    }
  }, [router])

  return (
    <>
      <div className="glass z-10 fixed left-0 w-full h-full"></div>
      <ul className={styles.circles}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>

      <div className="px-4 min-h-screen flex justify-center items-center mx-auto">
        <div className="card bg-white z-50 w-full flex flex-col shadow-lg max-w-md">
          <div className="card-body w-full ">
            <div className="w-full">
              <div className="flex justify-center">
                <Image
                  src={LogoSvg}
                  layout="fixed"
                  quality={100}
                  width={160}
                  height={80}
                  className="object-contain"
                  alt="Logo BuyPhone"
                />
              </div>
              {showBack === true ? (
                <div className="flex justify-center pt-4">
                  <button
                    className="flex gap-2 font-bold text-lg justify-center items-center py-4 text-default"
                    onClick={() => router.back()}
                  >
                    <ArrowLeftIcon className="w-5 h-5" />
                    Clique para voltar
                  </button>
                </div>
              ) : (
                ''
              )}

              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default LoginRegister
