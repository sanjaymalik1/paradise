"use client"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { MapPin, Calendar as CalendarIcon, Users, Search, Locate } from "lucide-react";
import { addDays, format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function Searchbar() {
    const [city, setCity] = useState("");
    const [start, setStart] = useState<Date | undefined>();
    const [end, setEnd] = useState<Date | undefined>();
    const [rooms, setRooms] = useState("1");
    const [guests, setGuests] = useState("1");
    const [isCheckInOpen, setIsCheckInOpen] = useState(false);
    const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const router = useRouter();

    const handleSearch = () => {
        // TODO: Implement search functionality
        console.log({ location, start, end, rooms, guests });
        if (!city.trim()) {
            setShowAlert(true);
            return;
        }

        // setShowAlert(false);

        const query = new URLSearchParams({
            city,
            start: start?.toISOString() || '',
            end: end?.toISOString() || '',
            rooms: rooms.toString(),
            guests: guests.toString()
        })

        console.log("query from searchbar:  ",query);
        

        router.push(`/search?${query.toString()}`);
    };

    return (
        <div className="bg-white h-full w-full rounded-sm max-w-6xl flex">

            {/* Location Input */}

            <div className="relative w-[40%] h-full">
                {/* <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                <Input
                    placeholder="Search by city, hotel or neighbourhood"
                    value={city}
                    onChange={(e) => {
                        setCity(e.target.value);
                        if (e.target.value.trim()) setShowAlert(false);
                    }}
                    className={`pl-2 xl:pl-4 h-full w-full rounded-l rounded-r-none ${showAlert ? 'border border-red-500 ' : ''
                        }`}
                />
                <Button
                    variant="ghost"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 rounded-full text-xs font-semibold h-6 w-8 xl:h-8 xl:w-22 cursor-pointer"
                >
                    <Locate className="w-4 h-4" />
                    <span className="hidden xl:block">Near me</span>
                </Button>
                {/* Alert Box - Positioned below input */}
                {showAlert && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded shadow-lg px-4 py-3 z-50 whitespace-nowrap">
                        <p className="text-red-600 text-sm font-normal">
                            Please select a destination from the list
                        </p>
                    </div>
                )}
            </div>

            {/* Date Pickers */}
            <div className="w-[15%] h-full">
                <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full h-full rounded-none text-xs xl:text-sm justify-center font-normal"
                        >
                            <CalendarIcon className="hidden xl:block h-4 w-4" />
                            {start ? format(start, "EEE, dd MMM") : format(new Date(), "EEE, dd MMM")}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={start}
                            onSelect={(date) => {
                                setStart(date);
                                setIsCheckInOpen(false);
                            }}
                            initialFocus
                            disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return date < today;
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="w-[15%] h-full">
                <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full h-full rounded-none text-xs xl:text-sm justify-center font-normal"
                        >
                            <CalendarIcon className="hidden xl:block h-4 w-4" />
                            {end ? format(end, "EEE, dd MMM") : format(addDays(new Date(), 1), "EEE, dd MMM")}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={end}
                            onSelect={(date) => {
                                setEnd(date);
                                setIsCheckOutOpen(false);
                            }}
                            initialFocus
                            disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                if (date < today) return true;
                                if (start && date <= start) return true;
                                return false;
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Guests & Rooms */}
            <div className="w-[15%] h-full">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full h-full rounded-none text-xs xl:text-sm tracking-tight justify-center font-normal"
                        >
                            <Users className=" hidden h-1 w-1 xl:block xl:h-4 xl:w-4" />
                            {rooms} Room, {guests} Guest
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className=" w-42 text-xs xl:text-base xl:w-52" align="start">
                        <div className="space-y-1">
                            <div className="text-xs xl:text-sm flex items-center justify-between">
                                <span className=" font-medium">Rooms</span>
                                <Select value={rooms} onValueChange={setRooms}>
                                    <SelectTrigger className="w-14">
                                        <SelectValue className=""/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[1, 2,3,4,5].map((num) => (
                                            <SelectItem key={num} value={num.toString()}
                                            className="">
                                                {num}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs xl:text-sm font-medium">Guests</span>
                                <Select value={guests} onValueChange={setGuests}>
                                    <SelectTrigger className="w-14">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[1, 2].map((num) => (
                                            <SelectItem key={num} value={num.toString()}>
                                                {num}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Search Button */}
            <div className="w-[15%] h-full">
                <Button
                    onClick={handleSearch}
                    className="w-full rounded-l-none rounded-r h-full bg-green-600 hover:bg-green-700 text-white text-base font-medium cursor-pointer
                    xl:tracking-wide xl:text-xl"
                >
                    {/* <Search className="w-5 h-5 mr-2" /> */}
                    Search
                </Button>
            </div>

        </div>
    );
};