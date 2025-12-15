"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Cities data
const cities = [
  { name: "Bangalore", slug: "bangalore" },
  { name: "Chennai", slug: "chennai" },
  { name: "Delhi", slug: "delhi" },
  { name: "Gurgaon", slug: "gurgaon" },
  { name: "Hyderabad", slug: "hyderabad" },
  { name: "Kolkata", slug: "kolkata" },
  { name: "Mumbai", slug: "mumbai" },
  { name: "Noida", slug: "noida" },
  { name: "Pune", slug: "pune" }
];

// City Link Component
const CityLink = ({ city }: { city: { name: string; slug: string } }) => (
  <Link 
    href={`/hotels/${city.slug}`}
    className="flex items-center text-gray-600 hover:text-red-600 transition-colors py-2 px-1"
  >
    <span className="text-xs xl:text-sm font-medium">{city.name}</span>
    <ChevronDown className="w-3 h-3 ml-1" />
  </Link>
);

// All Cities Dropdown Component
const AllCitiesDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="flex items-center text-gray-600 hover:text-red-600 transition-colors py-2 px-1">
        <span className="text-xs xl:text-sm font-medium">All Cities</span>
        <ChevronDown className="w-3 h-3 ml-1" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-64">
      <div className="grid grid-cols-2 gap-1 p-2">
        {cities.map((city) => (
          <DropdownMenuItem key={city.slug} asChild>
            <Link 
              href={`/hotels/${city.slug}`}
              className="cursor-pointer hover:bg-red-50"
            >
              {city.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem asChild>
          <Link 
            href="/hotels/all-cities"
            className="cursor-pointer hover:bg-red-50 col-span-2 font-medium text-red-600"
          >
            View All Cities
          </Link>
        </DropdownMenuItem>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
);

// Mobile Cities Component
const MobileCities = () => (
  <div className="lg:hidden">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center text-gray-600 hover:text-red-600 transition-colors py-2 px-4 border-l border-gray-200">
          <span className="text-sm font-medium">Cities</span>
          <ChevronDown className="w-3 h-3 ml-1" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          {cities.map((city) => (
            <DropdownMenuItem key={city.slug} asChild>
              <Link 
                href={`/hotels/${city.slug}`}
                className="cursor-pointer hover:bg-red-50 w-full"
              >
                {city.name}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem asChild>
            <Link 
              href="/hotels/all-cities"
              className="cursor-pointer hover:bg-red-50 font-medium text-red-600"
            >
              All Cities
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

// Main CityNav Component
export default function CityNav() {
  return (
    <nav className="max-w-screen bg-gray-50 border-b border-gray-200 px-6 xl:px-18">
      {/* <div className="mx-auto px-4 sm:px-6 lg:px-8"> */}
          
          {/* Desktop City Navigation */}
          <div className="w-full flex items-center justify-between h-10 xl:h-12 text-sm">
            {cities.map((city) => (
              <CityLink key={city.slug} city={city} />
            ))}
            <AllCitiesDropdown />
          </div>

          {/* Mobile City Navigation */}
          {/* <div className="lg:hidden flex items-center justify-center w-full">
            <MobileCities />
          </div> */}

          {/* Empty div for layout balance on desktop */}
          {/* <div className="hidden lg:block"></div> */}
        {/* </div> */}
    </nav>
  );
}