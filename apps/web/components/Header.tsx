import { Globe, Phone } from "lucide-react";
import Searchbar from "./Searchbar";
import Link from "next/link";
import { CircleUser } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

export default function Header() {
    return (
        <header className="fixed top-0 w-full h-18 py-2 px-6 xl:px-8 shadow-md bg-white z-10">
            <div className="w-full h-full flex items-center justify-between ">
                <div className="flex items-center justify-between gap-4 xl:gap-8">
                    <Link href={"/"}><h1 className="text-xs xl:text-base tracking-tighter font-serif font-semibold text-red-700">PARADISE</h1></Link>

                    <div className="h-10 xl:h-12 w-2xl xl:w-5xl">
                        <Searchbar />
                    </div>
                </div>

                {/* <div><Globe className="w-8 h-8" /></div>
                <div className="flex items-center text-gray-700">
                    <Phone className="w-6 h-6 mr-2" />
                    <div>
                        <div className="text-sm font-medium">0124-6201611</div>
                        <div className="text-xs text-gray-500">Call us to Book now</div>
                    </div>
                </div> */}
                
                <div className="flex gap-3 xl:gap-4 h-full ">
                <Separator orientation="vertical" />
                <div className="flex gap-1 xl:gap-2 items-center h-full p-2 hover:bg-gray-100 hover:outline hover:outline-gray-200 cursor-pointer">
                    <CircleUser className="h-4 w-4 xl:h-6 xl:w-6"/>
                    <span className="text-xs xl:text-sm">Login / Signup</span>
                </div>
                </div>
                


            </div>
        </header>
    )
}