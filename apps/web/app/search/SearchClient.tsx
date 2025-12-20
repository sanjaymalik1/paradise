"use client";

import Header from "@/components/Header";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import HotelCard from "@/components/HotelCard";
import { Separator } from "@/components/ui/separator";
import { Hotel } from "@prisma/client";
import Filters from "@/components/Filters";
import SortBy from "@/components/SortBy";
import Link from "next/link";

export const DEFAULT_FILTERS = {
  price: {
    min: 0,
    max: 4000
  },
  categories: [] as string[],
  facilities: [] as string[]
};

export type SortOption = "Guest Ratings" | "Price Low to High" | "Price High to Low"

export default function SearchClient() {
  const params = useSearchParams();
  const city = params.get("city");
  const start = params.get("start");
  const end = params.get("end");
  const rooms = params.get("rooms");
  const guests = params.get("guests");

  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [filters, setFilters] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_FILTERS;

    const storedFilters = localStorage.getItem("hotelFilters");

    return storedFilters ? JSON.parse(storedFilters) : DEFAULT_FILTERS
  })
  const [sortBy, setSortBy] = useState<SortOption>(()=>{
    if (typeof window === "undefined") return "Guest Ratings";
    const storedSortBy = localStorage.getItem("sortBy") as SortOption;

    return storedSortBy ? storedSortBy : "Guest Ratings"});


  console.log("start:  ", start);
  console.log("end:  ", end);


  useEffect(() => {
    async function fetchHotels() {
      setLoading(true);

      const res = await fetch(
        `/api/hotels/search?city=${city}&start=${start}&end=${end}&rooms=${rooms || 1}&guests=${guests || 1}`
      );
      // const res = await fetch("/api/hotels")
      const data = await res.json();
      if (data.success) {
        setHotels(data.hotels);
        setResultsCount(data.hotels.length)
      }
      setLoading(false);
    }

    fetchHotels();
  }, [city, start, end, rooms, guests]);

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel: Hotel) => {
      const priceMatch = filters.price.max >= hotel.price && filters.price.min <= hotel.price;

      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(hotel.category);

      const facilityMatch = filters.facilities.length === 0 || filters.facilities.every((facility: string) => hotel.amenities.includes(facility))

      return priceMatch && categoryMatch && facilityMatch
    })
  }, [hotels, filters])

  const sortedHotels = useMemo(() => {
    const list = [...filteredHotels];

    switch (sortBy) {
      case "Guest Ratings":
        return list.sort((a: Hotel, b: Hotel) => b.ratingStar - a.ratingStar);
      case "Price High to Low":
        return list.sort((a: Hotel, b: Hotel) => b.price - a.price);

      case "Price Low to High":
        return list.sort((a: Hotel, b: Hotel) => a.price - b.price);

      default:
        return list;
    }
  }, [filteredHotels, sortBy])

  if (loading) return <p className="p-6">Loading results...</p>;


  return (
    <div className="h-dvh ">
      <Header />
      <div className="flex w-full max-h-screen overflow-hidden pt-18">
        <div className="w-[25%] xl:w-[22%] border-r rounded-sm py-6 px-5 xl:px-6 overflow-auto filters-scroll">
          <Filters filters={filters} setFilters={setFilters} />

        </div>

        <div className=" w-[75%] xl:w-[78%] overflow-auto p-4 ">
          <div className="flex justify-between items-center mb-8">
            <div className="font-medium text-xl tracking-wide">{filteredHotels.length} hotels in India</div>
            <div className="flex items-center">
              <span className="mr-3 text-sm">Sort By</span>
              <SortBy sortBy={sortBy} setSortBy={setSortBy} />
            </div>
          </div>

          <Separator className="mb-8 xl:mb-10" />
          <div className="w-full flex flex-col gap-8 xl:gap-10">
            {
              sortedHotels.map((hotel: Hotel, index: number) => {
                return (
                  <div key={hotel.id}>
                    <Link href={`/hotels/${hotel.id}`}>
                      <HotelCard hotel={hotel} priority={index === 0} />  
                    </Link>
                    <Separator className="mt-8 xl:mt-10" />
                  </div>
                )
              })
            }
          </div>
        </div>


      </div>
    </div>
  )
}
