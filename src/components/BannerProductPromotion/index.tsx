import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { StaticImageData } from 'next/image'
import BannerPromotion from '../../assets/images/bannerblackpromotion.webp'
import BannerPromotionMobile from '../../assets/images/bannerblackmobile.webp'
import MiniBannerPromotion from '../../assets/images/miniBannerBlack.webp'
import { moneyMask } from '../../utils/masks'
import Link from 'next/link'
import BlurImage from '../BlurImage'

interface BannerProductPromotionProps {
  name: string
  price: number | string
  oudPrice: number | string
  link: string
  image: string | StaticImageData
  color: string
  memory: string
  mobileOrDesktop: string
  miniBanner?: boolean
}

const BannerProductPromotion = ({
  name,
  price,
  color,
  oudPrice,
  image,
  link,
  memory,
  mobileOrDesktop,
  miniBanner,
}: BannerProductPromotionProps) => {
  return (
    <>
      <div className="carousel-wrapper relative h-full">
        <div
          className={`flex ${
            miniBanner
              ? 'items-end px-4 justify-around'
              : 'items-center justify-center'
          } lg:gap-10 absolute h-full w-full z-10 ${
            mobileOrDesktop == 'desktop' ? 'flex-row' : 'flex-col mt-14 w-full'
          }`}
        >
          <div
            className={`relative flex flex-col ${
              miniBanner ? 'md:gap-2 gap-1 lg:mb-8' : 'gap-3'
            } ${
              mobileOrDesktop == 'desktop'
                ? 'text-start max-w-xs '
                : 'text-center items-center w-full gap-3 mt-24 md:mt-0'
            }`}
          >
            <h1
              className={`${
                miniBanner
                  ? 'text-2xl md:text-3xl xl:text-5xl'
                  : 'text-3xl lg:text-5xl'
              }  text-[#FF316A] font-bold`}
            >
              {name}
            </h1>
            <h2
              className={`${
                miniBanner
                  ? 'text-md md:text-xl xl:text-2xl'
                  : 'text-2xl lg:text-3xl'
              }  text-white flex flex-row gap-3 items-center justify-start`}
            >
              {color}{' '}
              <FontAwesomeIcon icon={faCircle} className="text-xs w-3 h-3" />{' '}
              {memory}
            </h2>

            <p
              className={`${
                miniBanner
                  ? 'text-md md:text-lg xl:text-xl'
                  : 'text-xl lg:text-3xl'
              }  line-through decoration-red-600`}
            >
              {oudPrice > 0
                ? `R$ ${moneyMask(oudPrice.toString())}`
                : 'Confira'}
            </p>

            <p
              className={`${
                miniBanner
                  ? 'text-xl md:text-3xl xl:text-4xl'
                  : 'text-2xl lg:text-5xl'
              } text-white font-semibold `}
            >
              {price > 0 ? `R$ ${moneyMask(price.toString())}` : 'Confira'}
            </p>
            <button
              className={`btn border-none bg-[#FF316A] text-white rounded-full w-2/3 max-w-[150px] ${
                miniBanner && 'btn-sm'
              }`}
            >
              <Link href={`/products/apple/iphones${link}`}>
                <a>Confira</a>
              </Link>
            </button>
          </div>

          <div
            className={`relative h-auto ${miniBanner && '-mb-32'} ${
              mobileOrDesktop == 'desktop'
                ? 'lg:mt-24 w-80 max-w-[200px] lg:max-w-[400px]'
                : 'w-72 max-w-xs'
            }`}
          >
            <BlurImage
              classname={`absolute object-contain w-full  ${
                mobileOrDesktop == 'mobile' && 'mt-12'
              }`}
              src={image}
              width={775}
              height={1038}
            />
          </div>
        </div>
        <Image
          src={
            miniBanner
              ? MiniBannerPromotion
              : mobileOrDesktop == 'desktop'
              ? BannerPromotion
              : BannerPromotionMobile
          }
          quality={100}
          placeholder="blur"
          layout="responsive"
        ></Image>
      </div>
    </>
  )
}

export default BannerProductPromotion
