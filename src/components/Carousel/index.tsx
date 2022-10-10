import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Banner1 from '../../assets/images/banner1.webp'
import Image from 'next/image'

const CarouselComponent = () => {
  return (
    <div className="carousel-wrapper mx-auto hidden md:block rounded-xl">
      <Carousel
        infiniteLoop
        autoPlay
        showStatus={false}
        showThumbs={false}
        showArrows={false}
      >
        <Image src={Banner1} layout="responsive" quality={100} />

        <div className="rounded-xl">
          <img
            src="https://loja.buyphone.com.br/img/banner1.webp"
            className="w-full rounded-xl"
            alt="Banner 2"
            aria-hidden="true"
          />
        </div>

        <div className="rounded-xl">
          <img
            src="https://loja.buyphone.com.br/img/banner2.webp"
            className="w-full rounded-xl"
            alt="Banner 3"
            aria-hidden="true"
          />
        </div>
      </Carousel>
    </div>
  )
}
export default CarouselComponent
