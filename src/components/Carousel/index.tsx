import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

interface imageProps {
  image: Array<StaticImageData & { link?: string }>
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
          return (res.link && res.link.substring(0, 1) === '/') ||
            (res.link && res.link.substring(0, 1) === '#') ? (
            <Link key={res.src} href={res.link}>
              <a>
                <Image
                  placeholder="blur"
                  className="object-contain"
                  src={res}
                  layout="responsive"
                  quality={100}
                />
              </a>
            </Link>
          ) : res.link ? (
            <Link key={res.src} href={res.link}>
              <a target={'_blank'}>
                <Image
                  placeholder="blur"
                  className="object-contain"
                  src={res}
                  layout="responsive"
                  quality={100}
                />
              </a>
            </Link>
          ) : (
            <Image
              placeholder="blur"
              className="object-contain"
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
