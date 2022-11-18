import Image, { ImageProps, StaticImageData } from 'next/image'
import React, {
  ForwardRefRenderFunction,
  HTMLAttributes,
  useState,
} from 'react'

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
interface blurImageProps extends ImageProps {
  classname?: HTMLAttributes<HTMLDivElement> | string
}

function BlurImage({ src, classname, ...props }: blurImageProps) {
  const [isLoading, setLoading] = useState(true)

  return (
    <Image
      {...props}
      src={src}
      quality={100}
      objectFit="cover"
      className={cn(
        `duration-300 ease-in-out ${classname}`,
        isLoading
          ? 'grayscale blur-2xl scale-110'
          : 'grayscale-0 blur-0 scale-100'
      )}
      onLoadingComplete={() => setLoading(false)}
    />
  )
}

export default BlurImage
