import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

const CarouselComponent = () => {
    return (
        <div className="carousel-wrapper max-w-7xl mx-auto hidden md:block rounded-xl">
            <Carousel
                infiniteLoop
                useKeyboardArrows
                autoPlay
                showStatus={false}
                showThumbs={false}
                className="rounded-xl"
            >
                <div className="rounded-xl">
                    <img
                        src="https://loja.buyphone.com.br/img/banner1.webp"
                        className="w-full rounded-xl"
                        alt="Banner 1"
                        aria-hidden="true"
                    />
                </div>

                <div className="rounded-xl">
                    <img
                        src="https://loja.buyphone.com.br/img/banner2.webp"
                        className="w-full rounded-xl"
                        alt="Banner 2"
                        aria-hidden="true"
                    />
                </div>
            </Carousel>
        </div>
    )
}
export default CarouselComponent
