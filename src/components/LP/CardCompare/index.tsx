import Image, { StaticImageData } from 'next/image'

interface CardProps {
   image: string | StaticImageData
   title: string
   paragraph: string
   link?: string
}

const CardCompare = ({ image, title, paragraph, link = '#' }: CardProps) => {
   return (
      <a target={'_blank'} href={link}>
         <div className="card bg-base-100 max-h-[340px] md:min-h-[340px] md:hover:bg-gradient-to-r from-sky-500 md:hover:to-indigo-500 md:hover:text-base-100 file:cursor-pointer shadow-xl md:py-3 flex-row md:flex-col duration-300 transition-all md:hover:scale-105">
            <figure className="max-w-[150px] w-44 mx-auto max-h-32 md:pt-10 transition-all duration-500 mt-0 md:hover:-mt-3">
               <Image src={image} quality={100} alt="Imagem" />
            </figure>
            <div className="card-body md:mt-6 p-3 md:p-10">
               <h2 className="card-title text-base">{title}</h2>
               <p className="text-xs">{paragraph}</p>
            </div>
         </div>
      </a>
   )
}

export default CardCompare
