"use client"

import React, { useEffect, useState } from 'react'
import { Separator } from './ui/separator'
import { Slider } from './ui/slider';
import { DEFAULT_FILTERS } from '@/app/search/page';

const hotelCategories = [
  {
    name: "PARADISE Rooms",
    description: "Super affordable stays with essential amenities",
  },
  {
    name: "Townhouse",
    description: "Your friendly, premium neighbourhood hotel - Serviced by OYO",
  },
  {
    name: "Flagship",
    description: "Affordable hotels at Prime locations - Serviced by OYO",
  },
  {
    name: "Home",
    description: "Villas and apartments with extra space and privacy",
  },
  {
    name: "Capital O",
    description: "Premium hotels with spacious rooms for business travellers & families",
  },
  {
    name: "Collection O",
    description: "A space for new-age travellers - Serviced by OYO",
  },
  {
    name: "Spot On",
    description: "Budget stay with comfortable bed and clean washroom",
  },
  {
    name: "Townhouse Oak",
    description: "A touch of luxury for leisure and business travellers",
  },
];

type FiltersState = {
  price: {
    min: number,
    max: number
  },
  categories: string[],
  facilities: string[]
}

type FiltersProps = {
  filters: FiltersState,
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

export default function Filters({ filters, setFilters }: FiltersProps) {
  const [showAll, setShowAll] = useState(false)

  const visibleCategories = showAll ? hotelCategories : hotelCategories.slice(0, 5);

  function toggleCategory(category: string) {
    setFilters((prev: FiltersState) => ({
      ...prev,
      categories: prev.categories.includes(category) ?
        prev.categories.filter((c) => c !== category) :
        [...prev.categories, category]
    }))
  }

  function toggleFacility(facility: string) {
    setFilters((prev: FiltersState) => ({
      ...prev,
      facilities: prev.facilities.includes(facility) ? prev.facilities.filter(f => f !== facility) : [...prev.facilities, facility]
    }))
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
    localStorage.removeItem("hotelFilters")
  }

  const isAnyFilterActive = filters.price.min !== 0 || filters.price.max !== 3000 || filters.categories.length > 0 || filters.facilities.length > 0

  useEffect(()=>{
    localStorage.setItem("hotelFilters",JSON.stringify(filters))
  },[filters])

  return (
    <div className='flex flex-col gap-4 xl:gap-6'>
      <div className='flex justify-between items-end'>
        <h2 className='text-2xl font-medium '>Filters</h2>
        {
          isAnyFilterActive && <span className='text-red-500 cursor-pointer font-medium w-fit text-sm'
            onClick={resetFilters}>Clear All</span>
        }
      </div>
      <Separator />
      <div className='flex flex-col gap-5 xl:gap-6 mb-10'>
        <h3 className='font-bold tracking-wide xl:text-lg'>Price</h3>
        <div className='px-4 mb-2'>
          <Slider
            value={[filters.price.min, filters.price.max]}
            onValueChange={([min, max]) => setFilters((prev: { price: { min: number, max: number } }) => ({
              ...prev,
              price: { min, max }
            }))}
            min={0}
            max={3000}
            aria-label="Price range slider"
            className='cursor-pointer'
            showTooltip
          />
        </div>
      </div>
      <Separator />
      <div className='flex flex-col gap-5 xl:gap-6'>
        <h3 className='font-bold xl:text-lg tracking-wide'>Categories</h3>
        <div className='flex flex-col gap-3 xl:gap-5'>
          {
            visibleCategories.map((category, index) => (
              <div key={index} className='text-md flex'>
                <input type="checkbox" name={category.name} id ={category.name} className='mr-3 min-h-4 min-w-4 self-start mt-1.5 cursor-pointer ring-green-500 accent-green-600'
                  checked={filters.categories.includes(category.name)}
                  onChange={() => toggleCategory(category.name)} />
                <label htmlFor={category.name}>
                  <div className='cursor-pointer text-sm xl:text-[16px]'>
                    <span className='font-medium'>{category.name}- </span>
                    <span className='text-gray-800'>{category.description}</span>
                  </div>
                </label>

              </div>
            ))
          }
        </div>
        {
          showAll ? <div onClick={() => setShowAll(false)} className='text-red-500 cursor-pointer font-medium w-fit'>- View Less</div> : <div onClick={() => setShowAll(true)} className='text-red-500 cursor-pointer font-medium w-fit'>+ View All</div>
        }

      </div>
      <Separator />
      <div className='flex flex-col gap-5 xl:gap-6'>
        <h3 className='font-bold xl:text-lg tracking-wide'>Hotel Facilities</h3>
        <div className='flex flex-col gap-3 xl:gap-5'>
          {
            ["Private Kitchen", "TV", "Parking", "Restaurant"].map((facility, index) => (
              <div key={index} className='flex'>
                <input type="checkbox" id={facility} className='mr-3 min-h-4 min-w-4 self-start mt-1.5 cursor-pointer accent-green-600'
                  checked={filters.facilities.includes(facility)}
                  onChange={() => toggleFacility(facility)} />
                <label htmlFor={facility}>
                  <span className='text-gray-800 cursor-pointer text-sm xl:text-[16px]'>{facility}</span>
                </label>
              </div>
            ))
          }
        </div>
      </div>
      <Separator />
    </div>
  )
}
