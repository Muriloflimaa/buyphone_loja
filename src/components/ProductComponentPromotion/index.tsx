import { Carousel } from 'react-responsive-carousel'
import { IProduct } from '../../types'
import { verificationPrice } from '../../utils/verificationPrice'
import BannerProductPromotion from '../BannerProductPromotion'

interface ProductProps {
  productBlack: Array<IProduct>
  user: string
  isUser: boolean
}

const ProductComponentPromotion = ({
  productBlack,
  user,
  isUser,
}: ProductProps) => {
  return (
    <div>
      {process.env.NEXT_PUBLIC_BLACK_FRIDAY &&
        !!JSON.parse(process.env.NEXT_PUBLIC_BLACK_FRIDAY) && (
          <Carousel
            infiniteLoop
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
                    miniBanner
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
        )}
    </div>
  )
}

export default ProductComponentPromotion
