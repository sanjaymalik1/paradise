import { HotelCard } from "@/app/components/HotelCard";

export default function SearchResults() {
  // Example hotel data
  const hotel = {
    images: [
      "/images/hotel1.jpg",
      "/images/hotel1-2.jpg",
      "/images/hotel1-3.jpg",
      "/images/hotel1-4.jpg",
    ],
    name: "Townhouse DSIDC Bawana Formerly Kanhaiya Residency",
    location: "Bawana, Delhi",
    rating: 4.6,
    ratingText: "31 Ratings · Excellent",
    amenities: ["Free Wifi", "Geyser", "Power backup", "+ 3 more"],
    price: 821,
    oldPrice: 3523,
    discount: "73% off",
    taxesAndFees: "₹126 taxes & fees · per room per night",
    isCompanyServiced: true,
    isWizardMember: true,
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <HotelCard {...hotel} />
    </div>
  );
}
