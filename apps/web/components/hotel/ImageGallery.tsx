import { Hotel } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

export default function ImageGallery({hotel} : {hotel : Hotel}) {
  return (
    <div className='w-full h-110 border overflow-hidden flex gap-0.5'>
      <Image src={hotel.images[0]}
        alt='photo'
        width={720}
        height={1000}
        priority={false}
        className='object-cover'></Image>
        <Image src={hotel.images[1]}
        alt='photo'
        width={720}
        height={1000}
        priority={false}
        className='object-cover'></Image>
    </div>
  )
}
