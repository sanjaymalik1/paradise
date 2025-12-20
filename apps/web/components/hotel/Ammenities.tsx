"use client"

import React, { useState } from 'react'
import { Hotel } from '@prisma/client'
import { AmenityIcons } from '@/lib/amenityIcons';

export default function Ammenities({ hotel }: { hotel: Hotel }) {
    const [showAll, setShowAll] = useState(false);

    const visibleAmmenities = showAll ? hotel.amenities : hotel.amenities.slice(0, 3);


    return (
        <div>
            <div className='grid grid-cols-3 gap-4'>
                {
                    visibleAmmenities.map((ammenity, index) => {
                        const IconComponent = AmenityIcons[ammenity as keyof typeof AmenityIcons];
                        return <div key={index} className='flex gap-2 items-center text-lg'><span>{IconComponent && <IconComponent className='text-gray-800 w-4 h-4 xl:w-5 xl:h-5' />}</span>{ammenity}</div>
                    })
                }

            </div>
            {
                showAll ? <div className='text-red-600 font-semibold cursor-pointer mt-4' onClick={() => setShowAll(false)}>Show Less</div>
                    : <div className='text-red-600 font-semibold cursor-pointer mt-4' onClick={() => setShowAll(true)}>Show More</div>
            }
        </div>

    )
}
