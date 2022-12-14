import Image, { StaticImageData } from 'next/image'

interface CardLojasProps {
  image: string | StaticImageData
  width: number
}
const CardLojas = ({ image, width }: CardLojasProps) => {
  return (
    <div className="md:min-w-[200px] min-w-[150px] bg-white md:bg-black/60 cursor-pointer p-5 w-32 md:w-52 min-h-[6rem] max-h-[6rem] flex items-center justify-center rounded-lg md:hover:bg-white transition duration-300 hover:bg-white">
      <Image
        className="md:grayscale md:hover:grayscale-0 object-contain"
        src={image}
        alt="Logo Markt"
        quality={100}
      ></Image>
    </div>
  )
}

export default CardLojas
