import { Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Play } from 'lucide-react';

export default function MovieCard() {
  return (
    <div className='h-120 w-76 m-auto flex flex-col gap-6 p-3 border rounded-3xl bg-white'>
        <div className='h-[60%] relative'>
            <div className='h-full w-full overflow-hidden rounded-4xl rounded-br-xl'>
                <Image src={"https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpZGVybWFufGVufDB8fDB8fHww"} alt='photo' height={100} width={300} className='object-cover'></Image>
            </div>
            
            <div className='h-32 w-22 rounded absolute bottom-0 left-6 translate-y-1/2 overflow-hidden'>
                <Image src={"https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpZGVybWFufGVufDB8fDB8fHww"} alt='photo' height={1000} width={1000} className='object-cover'></Image>
            </div>
            <div className='h-12 w-12 rounded-full bg-red-700 absolute bottom-0 right-8 translate-y-1/2 flex justify-center items-center'><Play fill='white' strokeWidth={0}/></div>
        </div>
        <div className='flex flex-col self-end w-[55%] gap-2'>
            <h2 className='font-semibold leading-none'>Spider Man Homecoming</h2>
            <div className='flex gap-1'>
                <Star strokeWidth={1} fill='yellow'className='h-4 w-4'/>
                <Star strokeWidth={1} fill='yellow'className='h-4 w-4'/>
                <Star strokeWidth={1} fill='yellow'className='h-4 w-4'/>
                <Star strokeWidth={1} fill='yellow'className='h-4 w-4'/>
                <Star strokeWidth={1} fill='yellow'className='h-4 w-4'/>
            </div>
        </div>
        <div className='flex justify-around text-center'>
            <div className='text-sm flex flex-col gap-2'>
                <span className='text-gray-500'>Length</span>
                <span className='font-bold'>01:37</span>
            </div>
            <div className='text-sm flex flex-col gap-2'>
                <span className='text-gray-500'>Lang</span>
                <span className='font-bold'>Eng</span>
            </div>
            <div className='text-sm flex flex-col gap-2'>
                <span className='text-gray-500'>Rating</span>
                <span className='font-bold'>6.4</span>
            </div>
            <div className='text-sm flex flex-col gap-2'>
                <span className='text-gray-500'>Review</span>
                <span className='font-bold'>45+</span>
            </div>
        </div>
    </div>
  )
}
