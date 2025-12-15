import { Button } from '@/components/ui/button'
import React from 'react'

export default function HotelCard() {
  return (
    <div className='w-full h-68 flex gap-1'>
      <div className='xl:w-120 border border-gray-500'>Image</div>

      <div className='h-full w-full flex-1 flex flex-col border border-gray-400'>
        <div className='border border-black'>
          <h1 className='font-bold
            xl:text-xl '>Hotel Name</h1>
          <p className='text-lg'>Address</p>
        </div>

        <div className='mt-auto flex items-end'>
          <div className=''>
            <div className='flex gap-2 items-center border'>
              <span className='font-bold text-2xl'>Rs1000</span><del className="text-gray-600"><span className='text-gray-600'>Rs2000</span></del><span className='text-sm text-orange-400'>50% off</span>
            </div>
            <span className='text-xs text-gray-500 border mt-0'>+ 100 taxes & fees . per room per night</span>
          </div>
          <div className='ml-auto'>
            <Button className='mr-4 rounded bg-white text-black border border-black cursor-pointer hover:bg-white
                              font-bold text-md'>View Details</Button>
            <Button className='rounded bg-green-600 cursor-pointer hover:bg-green-600 font-bold text-md'>Book Now</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
