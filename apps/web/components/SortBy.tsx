"use client"

import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SortOption } from "@/app/search/SearchClient"
import { useEffect } from 'react';

export default function SortBy({ sortBy, setSortBy }: { sortBy: SortOption, setSortBy: React.Dispatch<React.SetStateAction<SortOption>> }) {
  useEffect(() => {
    localStorage.setItem("sortBy", sortBy)
  }, [sortBy])
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <div aria-label="Open menu" className="w-40 h-10 cursor-pointer font-semibold flex justify-center items-center text-sm gap-1 border border-gray-300 ">
            {sortBy}<ChevronDown className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 rounded-none" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => {
              setSortBy("Guest Ratings")
            }} className="rounded-none cursor-pointer">
              Guest Ratings
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => {
              setSortBy("Price Low to High")
            }} className="rounded-none cursor-pointer">
              Price Low to High
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => {
              setSortBy("Price High to Low")
            }} className="rounded-none cursor-pointer">
              Price High to Low
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
