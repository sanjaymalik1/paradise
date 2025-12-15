import { NextResponse } from "next/server";
import prisma from "@/services/prisma";

// ----------------------
// MOCK DATA
// ----------------------
export const hotels = [
  {
    name: "OYO Rooms Classic Stay",
    city: "Delhi",
    address: "Near Karol Bagh Market, DB Gupta Road, Delhi",
    category: "OYO Rooms",
    description:
      "A comfortable budget-friendly hotel located in the heart of Karol Bagh, offering clean rooms and quick access to the metro.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
    ],
    tags: ["Affordable", "Near Metro", "Free Wifi"],
    price: 999,
    discountedPrice: 799,
    maxGuests: 2,
    roomSize: 180,
    amenities: ["AC", "TV", "Free Wifi", "Room Service", "Power Backup"],
    ratingCount: 112,
    ratingStar: 4.0
  },

  {
    name: "Townhouse Urban Premium",
    city: "Bengaluru",
    address: "100 Feet Road, Indiranagar, Bengaluru",
    category: "Townhouse",
    description:
      "Modern boutique-style hotel featuring elegant interiors, perfect for business travelers and couples visiting Indiranagar.",
    images: [
      "https://images.unsplash.com/photo-1551776235-dde6d4829808",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd"
    ],
    tags: ["Premium", "Business Friendly", "Trendy Interiors"],
    price: 1899,
    discountedPrice: 1499,
    maxGuests: 2,
    roomSize: 220,
    amenities: ["AC", "TV", "Free Wifi", "Elevator", "Parking"],
    ratingCount: 240,
    ratingStar: 4.3
  },

  {
    name: "Flagship Prime Comfort",
    city: "Mumbai",
    address: "Opp. Andheri Metro Station, Mumbai",
    category: "Flagship",
    description:
      "A centrally located hotel in Andheri offering spacious rooms, bright lighting, and excellent transport connectivity.",
    images: [
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb21009",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    ],
    tags: ["Prime Location", "Work Desk", "Modern Rooms"],
    price: 1599,
    discountedPrice: 1199,
    maxGuests: 2,
    roomSize: 200,
    amenities: ["AC", "TV", "Free Wifi", "CCTV", "Power Backup"],
    ratingCount: 178,
    ratingStar: 4.2
  },

  {
    name: "Home Luxe Villa Stay",
    city: "Goa",
    address: "Arpora, Near Baga Beach, Goa",
    category: "Home",
    description:
      "A serene villa-style property featuring spacious rooms, private balconies, and easy access to Baga Beach.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
    ],
    tags: ["Villa", "Private Stay", "Kitchen"],
    price: 3499,
    discountedPrice: 2799,
    maxGuests: 2,
    roomSize: 350,
    amenities: ["AC", "TV", "Private Kitchen", "Free Wifi"],
    ratingCount: 132,
    ratingStar: 4.5
  },

  {
    name: "Capital O Corporate Residency",
    city: "Hyderabad",
    address: "Gachibowli, Near DLF Cyber City, Hyderabad",
    category: "Capital O",
    description:
      "A premium hotel with spacious rooms and work-friendly furniture, located close to Hyderabad’s major IT hubs.",
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
    ],
    tags: ["Business Hotel", "Premium", "Work Desk"],
    price: 2399,
    discountedPrice: 1899,
    maxGuests: 2,
    roomSize: 260,
    amenities: ["AC", "TV", "Free Wifi", "Parking", "Elevator"],
    ratingCount: 301,
    ratingStar: 4.4
  },

  {
    name: "Collection O Trendy Suites",
    city: "Chennai",
    address: "T Nagar, Pondy Bazaar, Chennai",
    category: "Collection O",
    description:
      "A contemporary hotel offering stylish interiors and premium comfort, located near Chennai’s busiest shopping district.",
    images: [
      "https://images.unsplash.com/photo-1584132869992-1c7a1e6f9a8f",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd"
    ],
    tags: ["Trendy", "Modern", "Young Travellers"],
    price: 1999,
    discountedPrice: 1599,
    maxGuests: 2,
    roomSize: 210,
    amenities: ["AC", "TV", "Free Wifi", "In-house Restaurant"],
    ratingCount: 167,
    ratingStar: 4.2
  },

  {
    name: "Spot On Budget Stay Inn",
    city: "Pune",
    address: "Viman Nagar, Near Airport Road, Pune",
    category: "Spot On",
    description:
      "A clean and well-maintained budget lodging offering essential comforts for short stays.",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
      "https://images.unsplash.com/photo-1551776235-dde6d4829808"
    ],
    tags: ["Budget", "Clean Rooms", "Near Airport"],
    price: 699,
    discountedPrice: 549,
    maxGuests: 2,
    roomSize: 150,
    amenities: ["Fan", "TV", "Clean Washroom"],
    ratingCount: 90,
    ratingStar: 3.8
  },

  {
    name: "Townhouse Oak Luxury Retreat",
    city: "Jaipur",
    address: "Near Hawa Mahal, Jaipur",
    category: "Townhouse Oak",
    description:
      "A luxurious, aesthetically designed hotel featuring premium wood interiors and excellent city views.",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    ],
    tags: ["Luxury", "Elegant Interiors", "Business Friendly"],
    price: 2799,
    discountedPrice: 2199,
    maxGuests: 2,
    roomSize: 280,
    amenities: ["AC", "TV", "Free Wifi", "Restaurant", "Parking"],
    ratingCount: 220,
    ratingStar: 4.6
  },

  {
    name: "OYO Rooms Transit Stay",
    city: "Kolkata",
    address: "Dumdum Airport Road, Kolkata",
    category: "OYO Rooms",
    description:
      "A simple and comfortable hotel located close to the airport, ideal for quick transit stays.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb"
    ],
    tags: ["Affordable", "Airport Nearby", "Clean Rooms"],
    price: 899,
    discountedPrice: 699,
    maxGuests: 2,
    roomSize: 160,
    amenities: ["AC", "TV", "Free Wifi", "Support 24/7"],
    ratingCount: 122,
    ratingStar: 4.0
  },

  {
    name: "Capital O Mountain Retreat",
    city: "Manali",
    address: "Old Manali Road, Near Manu Temple, Manali",
    category: "Capital O",
    description:
      "A peaceful hillside hotel with warm interiors and scenic balcony views of the surrounding mountains.",
    images: [
      "https://images.unsplash.com/photo-1501117716987-c8e1ecb21009",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    ],
    tags: ["Mountain View", "Balcony Rooms", "Nature Stay"],
    price: 2199,
    discountedPrice: 1699,
    maxGuests: 2,
    roomSize: 240,
    amenities: ["AC", "TV", "Free Wifi", "Heater"],
    ratingCount: 188,
    ratingStar: 4.5
  }
];


// Generate inventory for next 10 days
function generateInventory(roomTypeId: string) {
  const today = new Date();
  const inventory = [];

  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    inventory.push({
      roomTypeId,
      date,
      available: 5,
    });
  }

  return inventory;
}

// ----------------------
// SEED ROUTE
// ----------------------
// export async function POST() {
//   try {
//     // 1️⃣ Insert hotels
//     // for (const hotel of hotels) {
//     //   await prisma.hotel.create({
//     //     data : {...hotel}
//     //   });
//     // }

//     // 2️⃣ Insert room types
//     for (const rt of roomTypes) {
//     //   await prisma.roomType.create({
//     //     data : {...rt}
//     //   });

//     //   // 3️⃣ Insert inventory for each room type
//       const inventory = generateInventory(rt.id);

//       for (const inv of inventory) {
//         await prisma.inventory.upsert({
//           where: {
//             roomTypeId_date: {
//               roomTypeId: inv.roomTypeId,
//               date: inv.date,
//             },
//           },
//           update: {},
//           create: inv,
//         });
//       }
//     }


//     return NextResponse.json({
//       success: true,
//       message: "Mock data inserted successfully!",
//     });

    
//   } catch (error) {
//     console.error("SEED ERROR:", error);
//     return NextResponse.json(
//       { success: false, message: "Seed failed", error },
//       { status: 500 }
//     );
//   }
// }


export async function POST() {
  try {

    // Insert data
    await prisma.hotel.createMany({
      data: hotels,
    });

    return NextResponse.json(
      { message: "Hotels seeded successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Seed Error:", error);
    return NextResponse.json(
      { error: "Failed to seed hotels", details: error.message },
      { status: 500 }
    );
  }
}
