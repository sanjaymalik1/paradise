// import prisma from "@/services/prisma";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { roomTypeId, startDate, endDate, available } = body;

//     // 1. Basic validation
//     if (!roomTypeId || !startDate || !endDate || !available) {
//       return NextResponse.json(
//         { success: false, message: "roomTypeId, startDate, endDate, available are required" },
//         { status: 400 }
//       );
//     }

//     // 2. Check if roomType exists
//     const roomType = await prisma.roomType.findUnique({
//       where: { id: roomTypeId }
//     });

//     if (!roomType) {
//       return NextResponse.json(
//         { success: false, message: "RoomType not found" },
//         { status: 404 }
//       );
//     }

//     // 3. Convert dates to JS Date objects
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     if (start > end) {
//       return NextResponse.json(
//         { success: false, message: "startDate cannot be after endDate" },
//         { status: 400 }
//       );
//     }

//     // Prevent setting inventory for past dates
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // normalize

//     if (start < today) {
//       return NextResponse.json(
//         { success: false, message: "Cannot set inventory for past dates" },
//         { status: 400 }
//       );
//     }

//     // 4. Generate all dates in range
//     const operations = [];
//     let current = new Date(start);

//     while (current <= end) {
//       const dateISO = new Date(current);

//       // Upsert = Create if not exists, Update if exists
//       operations.push(
//         prisma.inventory.upsert({
//           where: {
//             roomTypeId_date: {
//               roomTypeId,
//               date: dateISO,
//             },
//           },
//           update: { available },
//           create: {
//             roomTypeId,
//             date: dateISO,
//             available,
//           },
//         })
//       );

//       current.setDate(current.getDate() + 1);
//     }

//     // 5. Execute all updates
//     await Promise.all(operations);

//     return NextResponse.json(
//       { success: true, message: "Inventory updated successfully" },
//       { status: 200 }
//     );

//   } catch (error: any) {
//     console.error("INVENTORY SET ERROR:", error);

//     return NextResponse.json(
//       { success: false, message: "Server error", error: error.message || error },
//       { status: 500 }
//     );
//   }
// }


import prisma from "@/services/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { hotelId, startDate, endDate, available } = body;

    // 1. Basic validation
    if (!hotelId || !startDate || !endDate || available == null) {
      return NextResponse.json(
        {
          success: false,
          message: "hotelId, startDate, endDate, available are required",
        },
        { status: 400 }
      );
    }

    // 2. Check if hotel exists
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
    });

    if (!hotel) {
      return NextResponse.json(
        { success: false, message: "Hotel not found" },
        { status: 404 }
      );
    }

    // 3. Convert dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return NextResponse.json(
        { success: false, message: "startDate cannot be after endDate" },
        { status: 400 }
      );
    }

    // Block past inventory updates
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return NextResponse.json(
        { success: false, message: "Cannot set inventory for past dates" },
        { status: 400 }
      );
    }

    // 4. Generate all dates between start → end
    const operations = [];
    let current = new Date(start);

    while (current <= end) {
      const dateISO = new Date(current);

      operations.push(
        prisma.inventory.upsert({
          where: {
            hotelId_date: {
              hotelId,
              date: dateISO,
            },
          },
          update: { available },
          create: {
            hotelId,
            date: dateISO,
            available,
          },
        })
      );

      current.setUTCDate(current.getUTCDate() + 1); // timezone-safe increment
    }

    // 5. Execute all writes
    await Promise.all(operations);

    return NextResponse.json(
      { success: true, message: "Inventory updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("INVENTORY SET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message || error,
      },
      { status: 500 }
    );
  }
}
