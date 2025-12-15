
import { Button } from "@/components/ui/button";
import Searchbar from "./Searchbar";




// Continue Search Component
const ContinueSearch = () => {
  const searchSuggestions = [
    { location: "Janakpuri", type: "Guests" },
    { location: "MG-Road", type: "Guests" },
    { location: "Bangalore", type: "Guests" },
    { location: "Chennai", type: "Guests" }
  ];

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
        <span className="text-white font-medium">Continue your search</span>
        <div className="flex flex-wrap gap-3">
          {searchSuggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm"
            >
              {suggestion.location} • {suggestion.type}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main HeroSection Component
export default function HeroSection() {
  return (
    <section className="relative bg-linear-to-br from-gray-500 via-gray-600 to-gray-500 py-10 xl:py-16">
      {/* Background overlay */}
      {/* <div className="absolute inset-0 bg-black/20"></div> */}

      <div className="flex flex-col gap-6 items-center">
        {/* Main Headline */}
        <div className="">
          <h1 className="text-2xl xl:text-4xl font-bold text-white">
            Over 174,000+ hotels and homes across 35+ countries
          </h1>
        </div>

        {/* Search Bar */}
        <div className="h-12 w-3xl xl:h-16 xl:w-6xl">
          <Searchbar/>
        </div>
        

        {/* Continue Search */}
        {/* <ContinueSearch /> */}
      </div>
    </section>
  );
}