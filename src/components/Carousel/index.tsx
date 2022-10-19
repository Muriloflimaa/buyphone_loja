import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Image, { StaticImageData } from 'next/image'

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
          return (
            <Image key={res.src} src={res} layout="responsive" quality={100} />
          )
        })}
      </Carousel>
    </div>
  )
}
export default CarouselComponent
