import { Carousel } from 'react-responsive-carousel'
import { IProduct, IUser } from '../../types'
import { verificationPrice } from '../../utils/verificationPrice'
import BannerProductPromotion from '../BannerProductPromotion'

interface ProductProps {
  productBlack: Array<IProduct>
  user: IUser | null
  isUser: boolean
}

const BannerDesktopPromotion = ({
  productBlack,
  user,
  isUser,
}: ProductProps) => {
  return (
    <div>
      {process.env.NEXT_PUBLIC_BLACK_FRIDAY &&
        !!JSON.parse(process.env.NEXT_PUBLIC_BLACK_FRIDAY) && (
          <div className="carousel-wrapper max-w-[2000px] mx-auto relative mt-14 hidden md:block">
            <Carousel
              infiniteLoop
              // autoPlay
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
                      mobileOrDesktop={'desktop'}
                      link={`/${res.category_slug.replace('-3-geracao', '')}/${
                        res.slug
                      }`}
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

export default BannerDesktopPromotion
