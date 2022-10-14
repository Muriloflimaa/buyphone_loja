import { faCircleCheck, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BadgeCheckIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import styles from '../../../styles/styles.module.scss'
import Client from '../../assets/images/client_lyvia.webp'

export const CardDepoiments = () => {
  return (
    <div className="w-full flex flex-col md:flex-row max-w-5xl mx-auto p-10">
      <div className="md:w-2/3">
        <div className="flex gap-3 relative">
          <div className={styles.effect_border}>
            <Image
              className={'mask mask-circle '}
              src={Client}
              width={130}
              height={130}
              layout="fixed"
            />
          </div>

          <div className="flex flex-col items-start text-info-content">
            <span className="flex items-center gap-1">
              <span> Lyvia nagib</span> <BadgeCheckIcon className="w-5 h-5" />
            </span>
            <p>Fisioterapeuta</p>
            <p>@livia</p>
          </div>
        </div>
        <div className="relative md:pr-10 text-center md:text-start mt-4 px-5 md:px-0 text-info-content">
          <span>
            “Comprei dois celulares, um pra mim e um pra minha irmã, dois
            iPhones 11. O preço é muito abaixo. Vale muito a pena!”
          </span>
          <FontAwesomeIcon
            icon={faQuoteRight}
            className="text-info-content/20 h-8 w-8 absolute left-0 top-0 -mt-4 -ml-3 rotate-180"
          />
        </div>
      </div>

      <div className="flex justify-center md:w-1/3">
        <div className="w-full flex justify-center">
          <div className="w-full h-auto relative flex">
            <div className="relative w-full h-full pb-[56.25%]">
              <iframe
                className="absolute w-full h-full flex border-none rounded-3xl shadow-black/40 shadow-md m-0"
                placeholder="blur"
                loading="lazy"
                src="https://www.youtube.com/embed/Npmw1UcMnxM"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
