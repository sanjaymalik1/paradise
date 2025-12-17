// import prisma from "@/services/prisma";
// import { NextResponse } from "next/server";

// // ✅ FIXED: Handle both ISO strings and YYYY-MM-DD format
// function parseDate(d: string): Date | null {
//   try {
//     // Handle ISO string format (e.g., "2025-11-29T00:00:00.000Z")
//     if (d.includes('T')) {
//       const date = new Date(d);
//       if (isNaN(date.getTime())) return null;
//       // Normalize to UTC midnight
//       return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
//     }
    
//     // Handle YYYY-MM-DD format
//     const [y, m, day] = d.split("-").map(Number);
//     // Validate date components
//     if (!y || !m || !day || m < 1 || m > 12 || day < 1 || day > 31) {
//       return null;
//     }
//     const date = new Date(Date.UTC(y, m - 1, day));
//     // Check if date is valid
//     if (isNaN(date.getTime())) {
//       return null;
//     }
//     return date;
//   } catch {
//     return null;
//   }
// }

// // ✅ Get all dates between check-in and check-out (hotel-night style)
// function getNights(start: Date, end: Date): Date[] {
//   const dates: Date[] = [];
//   const d = new Date(start);
//   while (d < end) {
//     dates.push(new Date(d));
//     d.setUTCDate(d.getUTCDate() + 1);
//   }
//   return dates;
// }

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const city = searchParams.get("city");
//     const startParam = searchParams.get("start");
//     const endParam = searchParams.get("end");
//     const rooms = Number(searchParams.get("rooms") || 1);
//     const guests = Number(searchParams.get("guests") || 1);

//     // ✅ Validation for required fields
//     if (!city?.trim() || !startParam || !endParam) {
//       return NextResponse.json(
//         { success: false, message: "city, start, end are required" },
//         { status: 400 }
//       );
//     }

//     // ✅ Validation for rooms and guests
//     if (rooms < 1 || guests < 1 || !Number.isInteger(rooms) || !Number.isInteger(guests)) {
//       return NextResponse.json(
//         { success: false, message: "rooms and guests must be positive integers" },
//         { status: 400 }
//       );
//     }

//     // ✅ Handle both date formats
//     const startDate = parseDate(startParam);
//     const endDate = parseDate(endParam);

//     if (!startDate || !endDate) {
//       return NextResponse.json(
//         { success: false, message: "Invalid date format. Use YYYY-MM-DD or ISO format" },
//         { status: 400 }
//       );
//     }

//     // ✅ Date validation
//     const today = new Date();
//     today.setUTCHours(0, 0, 0, 0);

//     if (startDate < today) {
//       return NextResponse.json(
//         { success: false, message: "start date cannot be in the past" },
//         { status: 400 }
//       );
//     }

//     if (startDate >= endDate) {
//       return NextResponse.json(
//         { success: false, message: "start date must be before end date" },
//         { status: 400 }
//       );
//     }

//     // ✅ Maximum stay validation
//     const maxStayDays = 30;
//     const stayDuration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
//     if (stayDuration > maxStayDays) {
//       return NextResponse.json(
//         { success: false, message: `Maximum stay is ${maxStayDays} days` },
//         { status: 400 }
//       );
//     }

//     // HOTEL-NIGHT LOGIC: dates between start and end
//     const nights = getNights(startDate, endDate);

//     // Database query
//     const hotels = await prisma.hotel.findMany({
//       where: {
//         city: { contains: city.trim(), mode: "insensitive" },
//       },
//       include: {
//         roomTypes: {
//           include: {
//             inventory: true,
//           },
//         },
//       },
//     });

//     interface AvailableRoomType {
//       id: string;
//       name: string;
//       price: number;
//       images: string[];
//       maxGuests: number;
//       availableRooms: number;
//     }

//     interface HotelResult {
//       id: string;
//       name: string;
//       city: string;
//       address: string;
//       images: string[];
//       tags: string[];
//       category: string | null;
//       roomTypes: AvailableRoomType[];
//     }

//     const results: HotelResult[] = [];

//     for (const hotel of hotels) {
//       const availableRoomTypes: AvailableRoomType[] = [];

//       for (const room of hotel.roomTypes) {
//         if (guests > room.maxGuests) continue;

//         let isAvailable = true;
//         let minAvailable = Infinity;

//         for (const night of nights) {
//           const inv = room.inventory.find((i) => {
//             const db = new Date(i.date);
//             return (
//               db.getUTCFullYear() === night.getUTCFullYear() &&
//               db.getUTCMonth() === night.getUTCMonth() &&
//               db.getUTCDate() === night.getUTCDate()
//             );
//           });

//           if (!inv || inv.available < rooms) {
//             isAvailable = false;
//             break;
//           }

//           minAvailable = Math.min(minAvailable, inv.available);
//         }

//         if (isAvailable) {
//           availableRoomTypes.push({
//             id: room.id,
//             name: room.name,
//             price: room.price,
//             images: room.images,
//             maxGuests: room.maxGuests,
//             availableRooms: minAvailable,
//           });
//         }
//       }

//       if (availableRoomTypes.length > 0) {
//         results.push({
//           id: hotel.id,
//           name: hotel.name,
//           city: hotel.city,
//           address: hotel.address,
//           images: hotel.images,
//           tags: hotel.tags,
//           category: hotel.category,
//           roomTypes: availableRoomTypes,
//         });
//       }
//     }

//     return NextResponse.json({ 
//       success: true, 
//       hotels: results,
//       meta: {
//         city,
//         checkIn: startDate.toISOString().split('T')[0],
//         checkOut: endDate.toISOString().split('T')[0],
//         nights: nights.length,
//         rooms,
//         guests,
//         resultsCount: results.length
//       }
//     });
//   } catch (error) {
//     console.error("SEARCH HOTELS ERROR:", error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         message: "Server error",
//         ...(process.env.NODE_ENV === 'development' && { error: String(error) })
//       },
//       { status: 500 }
//     );
//   }
// }

import prisma from "@/services/prisma";
import { NextResponse } from "next/server";

export const dynamic= "force-dynamic"

// Parse both ISO `2025-11-29T...` and `YYYY-MM-DD`
function parseDate(d: string): Date | null {
  try {
    if (d.includes("T")) {
      const date = new Date(d);
      if (isNaN(date.getTime())) return null;

      return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    }

    const [y, m, day] = d.split("-").map(Number);
    if (!y || !m || !day || m < 1 || m > 12 || day < 1 || day > 31) return null;

    const date = new Date(Date.UTC(y, m - 1, day));
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

// nights = [checkIn, checkOut)
function getNights(start: Date, end: Date) {
  const dates: Date[] = [];
  const curr = new Date(start);

  while (curr < end) {
    dates.push(new Date(curr));
    curr.setUTCDate(curr.getUTCDate() + 1);
  }
  return dates;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const city = searchParams.get("city");
    const startParam = searchParams.get("start");
    const endParam = searchParams.get("end");
    const rooms = Number(searchParams.get("rooms") || 1);
    const guests = Number(searchParams.get("guests") || 1);

    // Basic validation
    if (!city || !startParam || !endParam) {
      return NextResponse.json(
        { success: false, message: "city, start, end are required" },
        { status: 400 }
      );
    }

    if (rooms < 1 || guests < 1 || !Number.isInteger(rooms) || !Number.isInteger(guests)) {
      return NextResponse.json(
        { success: false, message: "rooms and guests must be positive integers" },
        { status: 400 }
      );
    }

    const startDate = parseDate(startParam);
    const endDate = parseDate(endParam);

    if (!startDate || !endDate) {
      return NextResponse.json(
        { success: false, message: "Invalid date format (use ISO or YYYY-MM-DD)" },
        { status: 400 }
      );
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    if (startDate < today) {
      return NextResponse.json(
        { success: false, message: "start date cannot be in the past" },
        { status: 400 }
      );
    }

    if (startDate >= endDate) {
      return NextResponse.json(
        { success: false, message: "start must be before end" },
        { status: 400 }
      );
    }

    const stayDays = (endDate.getTime() - startDate.getTime()) / 86400000;
    if (stayDays > 30) {
      return NextResponse.json(
        { success: false, message: "Maximum stay allowed is 30 days" },
        { status: 400 }
      );
    }

    const nights = getNights(startDate, endDate);

    // Fetch hotels in city with their inventory
    const hotels = await prisma.hotel.findMany({
      where: { city: { contains: city.trim(), mode: "insensitive" } },
      include: { inventory: true },
    });

    const results: any[] = [];

    for (const hotel of hotels) {
      // Check guest capacity
      if (guests > hotel.maxGuests) continue;

      let hotelIsAvailable = true;
      let minAvailable = Infinity;

      for (const night of nights) {
        const inv = hotel.inventory.find((i) => {
          const d = new Date(i.date);
          return (
            d.getUTCFullYear() === night.getUTCFullYear() &&
            d.getUTCMonth() === night.getUTCMonth() &&
            d.getUTCDate() === night.getUTCDate()
          );
        });

        if (!inv || inv.available < rooms) {
          hotelIsAvailable = false;
          break;
        }

        minAvailable = Math.min(minAvailable, inv.available);
      }

      if (hotelIsAvailable) {
        results.push({
          id: hotel.id,
          name: hotel.name,
          city: hotel.city,
          address: hotel.address,
          category: hotel.category,
          images: hotel.images,
          tags: hotel.tags,
          price: hotel.price,
          discountedPrice: hotel.discountedPrice,
          maxGuests: hotel.maxGuests,
          amenities: hotel.amenities,
          ratingStar: hotel.ratingStar,
          ratingCount: hotel.ratingCount,
          availableRooms: minAvailable,
        });
      }
    }

    return NextResponse.json({
      success: true,
      hotels: results,
      meta: {
        city,
        checkIn: startDate.toISOString().split("T")[0],
        checkOut: endDate.toISOString().split("T")[0],
        nights: nights.length,
        rooms,
        guests,
        resultsCount: results.length,
      },
    });
  } catch (error: any) {
    console.error("SEARCH HOTELS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
