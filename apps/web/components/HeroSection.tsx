"use client"

import Searchbar from "./Searchbar";

// Main HeroSection Component
export default function HeroSection() {
  return (
    <section className="relative overflow-visible bg-linear-to-br from-gray-500 via-gray-600 to-gray-500 py-10 xl:py-16 z-10">
      {/* Background overlay */}
      {/* <div className="absolute inset-0 bg-black/20"></div> */}

      <div className="flex flex-col gap-6 items-center overflow-visible">
        {/* Main Headline */}
        <div className="">
          <h1 className="text-2xl xl:text-4xl font-bold text-white">
            Over 174,000+ hotels and homes across 35+ countries
          </h1>
        </div>

        {/* Search Bar */}
        <div className="h-12 w-3xl xl:h-16 xl:w-6xl relative z-20">
          <Searchbar/>
        </div>
        

        {/* Continue Search */}
        {/* <ContinueSearch /> */}
      </div>
    </section>
  );
}