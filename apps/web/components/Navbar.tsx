// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuTrigger 
// } from "@/components/ui/dropdown-menu";
// import { ChevronDown, Globe, Phone, User, Building2, Briefcase } from "lucide-react";

// // Logo Component
// const Logo = () => (
//   <Link href="/" className="text-3xl font-bold text-red-600 tracking-tight">
//     OYO
//   </Link>
// );

// // Navigation Links Component
// const NavLinks = () => (
//   <div className="hidden lg:flex items-center space-x-8">
//     {/* Become a Member */}
//     <Link 
//       href="/membership" 
//       className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
//     >
//       <User className="w-4 h-4 mr-2" />
//       <div>
//         <div className="text-sm font-medium">Become a Member</div>
//         <div className="text-xs text-gray-500">Additional 10% off on stays</div>
//       </div>
//     </Link>

//     {/* OYO for Business */}
//     <Link 
//       href="/business" 
//       className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
//     >
//       <Briefcase className="w-4 h-4 mr-2" />
//       <div>
//         <div className="text-sm font-medium">OYO for Business</div>
//         <div className="text-xs text-gray-500">Trusted by 5000 Corporates</div>
//       </div>
//     </Link>

//     {/* List Your Property */}
//     <Link 
//       href="/partner" 
//       className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
//     >
//       <Building2 className="w-4 h-4 mr-2" />
//       <div>
//         <div className="text-sm font-medium">List your property</div>
//         <div className="text-xs text-gray-500">Start earning in 30 mins</div>
//       </div>
//     </Link>

//     {/* Contact Number */}
//     <div className="flex items-center text-gray-700">
//       <Phone className="w-4 h-4 mr-2" />
//       <div>
//         <div className="text-sm font-medium">0124-6201611</div>
//         <div className="text-xs text-gray-500">Call us to Book now</div>
//       </div>
//     </div>
//   </div>
// );

// // Language Selector Component
// const LanguageSelector = () => (
//   <DropdownMenu>
//     <DropdownMenuTrigger asChild>
//       <Button variant="ghost" className="hidden md:flex items-center text-gray-700">
//         <Globe className="w-4 h-4 mr-2" />
//         English
//         <ChevronDown className="w-4 h-4 ml-1" />
//       </Button>
//     </DropdownMenuTrigger>
//     <DropdownMenuContent>
//       <DropdownMenuItem>English</DropdownMenuItem>
//       <DropdownMenuItem>हिन्दी</DropdownMenuItem>
//       <DropdownMenuItem>తెలుగు</DropdownMenuItem>
//       <DropdownMenuItem>தமிழ்</DropdownMenuItem>
//     </DropdownMenuContent>
//   </DropdownMenu>
// );

// // Login/Signup Component
// const AuthButton = () => (
//   <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
//     <User className="w-4 h-4 mr-2" />
//     Login / Signup
//   </Button>
// );

// // Mobile Menu Component
// const MobileMenu = () => (
//   <div className="lg:hidden">
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="sm">
//           <div className="w-6 h-6 flex flex-col justify-center items-center">
//             <div className="w-4 h-0.5 bg-gray-600 mb-1"></div>
//             <div className="w-4 h-0.5 bg-gray-600 mb-1"></div>
//             <div className="w-4 h-0.5 bg-gray-600"></div>
//           </div>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="w-64">
//         <DropdownMenuItem className="flex-col items-start p-4">
//           <div className="font-medium">Become a Member</div>
//           <div className="text-xs text-gray-500">Additional 10% off on stays</div>
//         </DropdownMenuItem>
//         <DropdownMenuItem className="flex-col items-start p-4">
//           <div className="font-medium">OYO for Business</div>
//           <div className="text-xs text-gray-500">Trusted by 5000 Corporates</div>
//         </DropdownMenuItem>
//         <DropdownMenuItem className="flex-col items-start p-4">
//           <div className="font-medium">List your property</div>
//           <div className="text-xs text-gray-500">Start earning in 30 mins</div>
//         </DropdownMenuItem>
//         <DropdownMenuItem className="flex-col items-start p-4">
//           <div className="font-medium">Contact</div>
//           <div className="text-xs text-gray-500">0124-6201611</div>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   </div>
// );

// // Main Navbar Component
// export default function Navbar() {
//   return (
//     <nav className="w-full bg-white shadow-sm border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Logo />

//           {/* Navigation Links - Desktop */}
//           <NavLinks />

//           {/* Right Side Actions */}
//           <div className="flex items-center space-x-4">
//             <LanguageSelector />
//             <AuthButton />
//             <MobileMenu />
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

import React from 'react'
import { Separator } from './ui/separator'
import { CircleUser } from 'lucide-react'

export default function Navbar() {
  return (
    <div className='h-14 xl:h-16 flex items-center justify-between py-2 px-12 xl:px-16'>
      <div className='tracking-tighter font-semibold font-serif text-red-700'>PARADISE</div>
      <div className="flex gap-3 xl:gap-4 h-full ">
        <Separator orientation="vertical" />
        <div className="flex gap-1 xl:gap-2 items-center h-full p-2 hover:bg-gray-100 hover:outline hover:outline-gray-200 cursor-pointer">
          <CircleUser className="h-4 w-4 xl:h-6 xl:w-6" />
          <span className="text-xs xl:text-sm">Login / Signup</span>
        </div>
      </div>

    </div>
  )
}
