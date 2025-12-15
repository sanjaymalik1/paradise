"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import type { Hotel } from '@prisma/client'
import Image from 'next/image'
import { Star } from 'lucide-react';
import { AmenityIcons } from '@/lib/amenityIcons'

function ratingComment(ratingStar: number) {
  if (ratingStar >= 4.9) return "Fabulous"
  if (ratingStar >= 4.5) return "Excellent"
  if (ratingStar >= 4.0) return "Very Good"
  return "Good"
}

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className='w-full h-52 flex gap-3 xl:gap-4
    xl:h-62'>
      <div className='w-80 overflow-hidden relative
      xl:w-md'>
        <Image src={hotel.images[1]} alt='hotel photo' className='object-cover h-full w-full'
          width={1000}
          height={1000}></Image>
        <div className='absolute top-2 left-2 px-2 py-1 bg-white rounded font-semibold tracking-tighter text-xs flex items-center justify-center
        xl:font-bold xl:tracking-normal'>{hotel.category}</div>
      </div>

      <div className='h-full w-full flex-1 flex flex-col gap-4 xl:gap-6'>
        <div className=''>
          <h1 className='font-medium text-lg
            xl:text-2xl xl:font-bold'>{hotel.name}</h1>
          <p className='text-md xl:text-lg '>{hotel.address}</p>
        </div>

        <div>
          <div className='flex gap-1 items-center xl:gap-2'>
            <div className='min-w-9 xl:min-w-10 px-1 text-white text-xs font-medium xl:font-bold xl:text-sm tracking-tighter xl:tracking-tight bg-green-500 flex justify-center items-center rounded-xs'>{(hotel.ratingStar)}<Star className='h-3 w-3 ml-1 font-bold fill-white' /></div>
            <div className='text-xs text-gray-600 font-medium'>({hotel.ratingCount} Ratings)</div><span className='relative bottom-1'>.</span>
            <div className='text-xs text-gray-600 font-medium'>{ratingComment(hotel.ratingStar)}</div>
          </div>
          <div className='flex gap-3 text-sm mt-1 xl:gap-5 xl:text-lg'>
            {
              hotel.amenities.slice(0, 3).map((amenity, index) => {
                const IconComponent = AmenityIcons[amenity as keyof typeof AmenityIcons];
                return <div key={index} className='flex gap-1 items-center'><span>{IconComponent && <IconComponent className='text-gray-800 w-4 h-4 xl:w-5 xl:h-5' />}</span>{amenity}</div>
              })

            }
            {
              hotel.amenities.length > 3 && <div className='tracking-tighter xl:tracking-tight'><span className='relative bottom-0.5'>+</span> {hotel.amenities.length - 3} more</div>
            }
          </div>
        </div>

        <div className='mt-auto flex items-end'>
          <div className=''>
            <div className='flex gap-2 items-center'>
              <span className='font-bold text-xl xl:text-2xl'>Rs{hotel.discountedPrice ? hotel.discountedPrice : hotel.price}</span>
              <del className="text-gray-600"><span className='text-gray-600 text-sm xl:text-base'>Rs{hotel.price}</span></del>
              <span className='text-xs xl:text-sm text-orange-400'>{hotel.discountedPrice ? Math.round((hotel.price - hotel.discountedPrice) / hotel.price * 100) : 0}% off</span>
            </div>
            <p className='text-xs tracking-tighter xl:tracking-normal text-gray-500'>+ Rs{hotel.discountedPrice ? Math.round(0.08 * hotel.discountedPrice) : Math.round(0.08 * hotel.price)} taxes & fees <span className='relative bottom-0.5'>.</span> per room per night</p>
          </div>

          <div className='ml-auto flex'>
            <Button className='mr-2 h-8 w-20 xl:h-10 xl:w-30 xl:mr-4 rounded-xs bg-white text-black border border-black cursor-pointer hover:bg-white
                              font-semibold xl:font-bold xl:tracking-wide text-xs xl:text-base'>View Details</Button>
            <Button className='rounded-xs h-8 w-18 xl:h-10 xl:w-28 bg-green-600 cursor-pointer hover:bg-green-600 font-semibold xl:font-bold xl:tracking-wide text-xs xl:text-base'>Book Now</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
