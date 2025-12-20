import Header from '@/components/Header'
import Ammenities from '@/components/hotel/Ammenities';
import ImageGallery from '@/components/hotel/ImageGallery';
import prisma from '@/services/prisma';
import { Icon, Star } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'
import { Check } from 'lucide-react';
import { AmenityIcons } from '@/lib/amenityIcons';

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const hotel = await prisma.hotel.findUnique({
        where: {
            id
        }
    });

    if (!hotel) notFound();

    // console.log(hotel);

    function ratingComment(ratingStar: number) {
        if (ratingStar >= 4.9) return "Fabulous"
        if (ratingStar >= 4.5) return "Excellent"
        if (ratingStar >= 4.0) return "Very Good"
        return "Good"
    }

    function getAmenityIcon(ammenity : keyof typeof AmenityIcons){
        const IconComponent = AmenityIcons[ammenity];
        return <IconComponent className='h-4 w-4'/>
    }

    return (
        <div>
            <Header />
            <div className='pt-18 pb-40'>
                <div>
                    <ImageGallery hotel={hotel} />
                </div>
                <div className='pl-40 pt-8'>
                    <div className='w-[52%] flex flex-col gap-10 relative'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-4xl font-bold leading-snug'>{hotel.name}</h1>
                            <p className='text-gray-400 text-lg'>{hotel.address}</p>
                            <div className='bg-gray-200 rounded-xs w-fit px-1 text-xs py-0.5 font-semibold'>{hotel.category}</div>
                        </div>
                        <div className='flex flex-col gap-8'>
                            <h2 className='text-2xl font-bold tracking-tight'>Ammenities</h2>
                            <Ammenities hotel={hotel} />
                        </div>

                        <div>
                            <h2 className='text-2xl font-bold tracking-tight mb-6'>About this hotel</h2>
                            <p className='text-gray-600'>{hotel.description}</p>
                        </div>

                        <div>
                            <h2 className='text-2xl font-bold tracking-tight mb-6'>Choose your room</h2>
                            <div className='rounded-t-md bg-gray-600 flex gap-1 items-center pl-4 py-1'>
                                <Star strokeWidth={0} fill='yellow' className='h-3 w-3' />
                                <span className='text-white text-xs font-semibold'>SELECTED CATEGORY</span>
                            </div>
                            <div className='p-4 pl-6 flex justify-between h-fit border'>
                                <div className='flex flex-col justify-between'>
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex gap-2 items-center'>
                                            <span className='text-xl font-semibold tracking-wide'>Classic</span>
                                            <div className='h-5 w-5 bg-green-500 rounded-full flex items-center justify-center'><Check stroke='white' className='h-4 w-4'/></div>
                                        </div>

                                        <p className='text-sm'>Room size: {hotel.roomSize}</p>
                                    </div>
                                    <div className='flex gap-5'>
                                        <div className='flex gap-1'>
                                            <span className='flex items-center justify-center'>{getAmenityIcon(hotel.amenities[0] as keyof typeof AmenityIcons)}</span>
                                            <span>{hotel.amenities[0]}</span>
                                        </div>
                                        <div className='flex gap-1'>
                                            <span className='flex items-center justify-center'>{getAmenityIcon(hotel.amenities[1] as keyof typeof AmenityIcons)}</span>
                                            <span>{hotel.amenities[1]}</span></div>
                                    </div>
                                </div>
                                <div className='w-44 h-30 overflow-hidden rounded-md border'>
                                    <Image src={hotel.images[1]}
                                        alt='hotel'
                                        width={1000}
                                        height={1000}
                                        priority={false}
                                        className='object-cover h-full'></Image>
                                </div>
                            </div>
                            <div className='p-4 pl-6 flex justify-between border border-t-0 rounded-b-md'>
                                <div>
                                    <div className='flex gap-2 items-end'>
                                        <span className='font-bold text-xl'>Rs{hotel.discountedPrice}</span>
                                        <del className='text-gray-600'><span>Rs{hotel.price}</span></del>
                                    </div>
                                    <div className='text-gray-500 text-sm'>+ Rs{hotel.discountedPrice ? Math.round(0.08 * hotel.discountedPrice) : Math.round(0.08 * hotel.price)} taxes & fees</div>
                                </div>
                                <div className='border rounded flex gap-1 w-44 h-12 items-center justify-center cursor-pointer'>
                                    <span className='h-4 w-4 rounded-full bg-green-500 flex items-center justify-center'><Check stroke='white' className='h-3 w-3'/></span>
                                    <span className='text-sm font-semibold'>SELECTED</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className='text-2xl font-bold tracking-tight mb-6'>Ratings and Reviews</h2>
                            <div className='w-[35%] py-4 border rounded-md flex flex-col items-center justify-center gap-1'>
                                <div className={`w-16 rounded-sm py-1 flex justify-center items-center gap-2 text-xl font-bold text-white ${hotel.ratingStar < 4.0 ? "bg-green-300" : "bg-green-600"}`}>{hotel.ratingStar} <Star fill='white' className='h-4 w-4' /></div>
                                <span className='text-sm font-semibold tracking-tight'>{ratingComment(hotel.ratingStar)}</span>
                                <span className='text-xs'>{hotel.ratingCount} Ratings</span>
                            </div>

                        </div>

                        <div className='absolute top-0 right-0 rounded-xs flex flex-col items-center'>
                            <div className={`w-full p-1 flex justify-center items-center gap-2 text-xl font-bold text-white ${hotel.ratingStar < 4.0 ? "bg-green-300" : "bg-green-600"}`}>{hotel.ratingStar} <Star fill='white' className='h-4 w-4' /></div>
                            <div className='text-xs text-center bg-gray-100 p-1 font-medium'>{hotel.ratingCount} Ratings</div>
                            

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
