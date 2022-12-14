import { Carousel } from 'react-responsive-carousel'
import { IProduct } from '../../types'
import { verificationPrice } from '../../utils/verificationPrice'
import BannerProductPromotion from '../BannerProductPromotion'

interface ProductProps {
  productBlack: Array<IProduct>
  user: string
  isUser: boolean
}

const BannerMobilePromotion = ({
  productBlack,
  user,
  isUser,
}: ProductProps) => {
  return (
    <div>
      {process.env.NEXT_PUBLIC_BLACK_FRIDAY &&
        JSON.parse(process.env.NEXT_PUBLIC_BLACK_FRIDAY) && (
          <div className="carousel-wrapper max-w-[2000px] mx-auto relative block md:hidden mt-4">
            <Carousel
              infiniteLoop
              autoPlay
              interval={4000}
              showIndicators={false}
              showStatus={false}
              showThumbs={false}
              swipeable={false}
            >
              {productBlack &&
                productBlack.map((res) => {
                  const returnPrice = verificationPrice(res, user, isUser)
                  return (
                    <BannerProductPromotion
                      key={res.id}
                      mobileOrDesktop={'mobile'}
                      link={`/${res.category_slug}/${res.slug}`}
                      color={res.color}
                      name={res.name}
                      memory={res.memory}
                      price={returnPrice.ourPrice}
                      oudPrice={returnPrice.averagePrice}
                      image={res.media[0].original_url}
                    />
                  )
                })}
            </Carousel>
          </div>
        )}
    </div>
  )
}

export default BannerMobilePromotion
