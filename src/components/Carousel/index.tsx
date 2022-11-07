import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import BannerBlackFriday from '../../assets/images/bannerblackfriday.webp'

interface imageProps {
  image: Array<StaticImageData>
}

const CarouselComponent = (image: imageProps) => {
  return (
    <div className="carousel-wrapper">
      <Carousel
        infiniteLoop
        autoPlay
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        swipeable={false}
      >
        {image.image.map((res) => {
          return res.src ===
            '/_next/static/media/bannerblackfriday.7e0558cb.webp' ? (
            <a
              target={'_blank'}
              href="https://api.whatsapp.com/send?phone=5518981367275&text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20BlackFriday."
            >
              <Image
                placeholder="blur"
                key={res.src}
                src={res}
                layout="responsive"
                quality={100}
              />
            </a>
          ) : (
            <Image
              placeholder="blur"
              key={res.src}
              src={res}
              layout="responsive"
              quality={100}
            />
          )
        })}
      </Carousel>
    </div>
  )
}
export default CarouselComponent
