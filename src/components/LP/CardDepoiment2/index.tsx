import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image, { StaticImageData } from 'next/image'

interface CardDepoimentProps {
  linkVideo: string
  depoiment: string
  name: string
  image: string | StaticImageData
  date: string
  instagram: string
}

const CardDepoiment2 = ({
  linkVideo,
  depoiment,
  name,
  image,
  date,
  instagram,
}: CardDepoimentProps) => {
  return (
    <>
      <label
        htmlFor={linkVideo}
        className="card cols-span-1 bg-white/10 text-white shadow-xl cursor-pointer transition-all duration-300 hover:scale-105"
      >
        <div className="card-body justify-between">
          <div>
            <FontAwesomeIcon
              icon={faQuoteLeft}
              className="w-5 h-5 text-white absolute top-2"
            />
            <div className="relative md:mb-4">
              <h1 className="text-base text-center md:text-start">
                {depoiment}
              </h1>
              <FontAwesomeIcon
                icon={faQuoteRight}
                className="w-5 h-5 text-white absolute -bottom-5 right-0 hidden md:block"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-3">
            <div className="border-2 border-white shadow-md shadow-white/40 rounded-full flex items-center justify-center">
              <Image
                className="mask mask-circle shadow-lg shadow-white"
                src={image}
                width={70}
                height={70}
                layout="fixed"
                placeholder="blur"
              />
            </div>
            <div className="flex flex-col font-medium items-center md:items-start">
              <p>{name}</p>
              <span className="text-white/50 font-light text-xs">{date}</span>
            </div>
          </div>
        </div>
      </label>

      <input type="checkbox" id={linkVideo} className="modal-toggle" />
      <label htmlFor={linkVideo} className="modal cursor-pointer px-4">
        <label
          className="modal-box  max-w-xl w-full p-10 bg-white text-black relative"
          htmlFor=""
        >
          <div className="relative mb-4">
            <FontAwesomeIcon
              icon={faQuoteLeft}
              className="w-5 h-5 text-black absolute -top-8"
            />
            <h1 className="text-sm mt-2">{depoiment}</h1>
            <FontAwesomeIcon
              icon={faQuoteRight}
              className="w-5 h-5  absolute -bottom-7 right-0"
            />
          </div>
          <div className="flex items-center gap-3">
            <a
              className="border-2 border-black shadow-md shadow-black/40 rounded-full flex items-center justify-center"
              target={'_blank'}
              href={'https://' + instagram}
            >
              <Image
                className="mask mask-circle object-contain shadow-lg shadow-black"
                src={image}
                width={70}
                height={70}
                placeholder="blur"
              />
            </a>

            <div className="flex flex-col font-medium items-start">
              <p>{name}</p>
              <span className="text-black/50 font-light text-xs">{date}</span>
            </div>
          </div>
          <div className="flex justify-center mt-4 w-3/4 mx-auto">
            <div className="w-full flex justify-center">
              <div className="w-full h-auto relative flex">
                <div className="relative w-full h-full pb-[56.25%]">
                  <iframe
                    className="absolute w-full h-full flex border-none shadow-black/40 shadow-md m-0"
                    placeholder="blur"
                    loading="lazy"
                    src={linkVideo}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  )
}

export default CardDepoiment2
