import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Banner1 from '../../assets/images/banner1.webp'
import Banner2 from '../../assets/images/banner2.svg'
import Banner3 from '../../assets/images/banner3.svg'
import Image from 'next/image'

const CarouselComponent = () => {
  return (
    <div className="carousel-wrapper max-w-[2000px] mx-auto hidden md:block">
      <Carousel
        infiniteLoop
        autoPlay
        interval={3000}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
      >
        <Image src={Banner1} layout="responsive" quality={100} />

        <Image src={Banner2} layout="responsive" quality={100} />

        <Image src={Banner3} layout="responsive" quality={100} />
      </Carousel>
    </div>
  )
}
export default CarouselComponent
