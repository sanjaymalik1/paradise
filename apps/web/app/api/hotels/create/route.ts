// import { NextResponse } from "next/server";
// import prisma from "@/services/prisma";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name, description, city, address, images, category, tags } = body;

//     if (!name || !city || !address) {
//       return NextResponse.json(
//         { success: false, message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const hotel = await prisma.hotel.create({
//       data: {
//         name,
//         description,
//         city,
//         address,
//         images: images || [],
//         category: category || "Standard",
//         tags: tags || [],
//       },
//     });

//     return NextResponse.json({ success: true, hotel }, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import prisma from "@/services/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      description,
      city,
      address,
      images,
      category,
      tags,
      price,
      discountedPrice,
      maxGuests,
      roomSize,
      amenities
    } = body;

    // Validate required fields
    if (!name || !city || !address || !price || !maxGuests) {
      return NextResponse.json(
        {
          success: false,
          message: "name, city, address, price, maxGuests are required"
        },
        { status: 400 }
      );
    }

    const hotel = await prisma.hotel.create({
      data: {
        name,
        description: description || "",
        city,
        address,
        images: images || [],
        category: category || "Standard",
        tags: tags || [],

        // NEW SCHEMA FIELDS
        price,
        discountedPrice: discountedPrice || null,
        maxGuests,
        roomSize: roomSize || null,
        amenities: amenities || [],

        // Auto defaults
        ratingStar: 0.0,
        ratingCount: 0
      }
    });

    return NextResponse.json({ success: true, hotel }, { status: 201 });
  } catch (error: any) {
    console.error("CREATE HOTEL ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message || error
      },
      { status: 500 }
    );
  }
}
