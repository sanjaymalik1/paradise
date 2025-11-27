import prisma from "@/services/prisma";
import { NextResponse } from "next/server";
export async function GET(req : Request){
    try{
        const {searchParams} = new URL(req.url);

        const city = searchParams.get("city");
        const start = searchParams.get("start");
        const end = searchParams.get("end");

        if(!city || !start || !end){
            return NextResponse.json(
                {success : false, message : "city, start, and end are required"},
                {status : 400}
            )
        }

        const startDate = new Date(start);
        const endDate = new Date(end);

        if(isNaN(startDate.getTime()) || isNaN(endDate.getTime())){
            return NextResponse.json(
                {success : false, message : "Invalid date format"},
                {status : 400}
            )
        }

        if(startDate > endDate){
            return NextResponse.json(
                {success : false, message : "start must be before end"},
                {status : 400}
            )
        }

        //fetch all hotels in a city

        const hotels = await prisma.hotel.findMany({
            where : {city},
            include : {
                roomTypes : true
            }
        })

        const results = [];

        for(const hotel of hotels){
            const availableRoomTypes = []

            for(const room of hotel.roomTypes){
                //fetch inventory for given date range
                const inventory= await prisma.inventory.findMany({
                    where : {roomTypeId : room.id,
                        date : {
                            gte : startDate,
                            lte : endDate
                        }
                    }
                })

                const totalDays = (endDate.getTime()-startDate.getTime())/(1000*60*60*24) + 1;

                if(inventory.length !== totalDays){
                    continue;
                }

                const minAvailability = Math.min(...inventory.map(d => d.available));

                if(minAvailability > 0){
                    availableRoomTypes.push({
                        ...room,
                        availableRooms : minAvailability
                    })
                }

            }

            if(availableRoomTypes.length > 0){
                results.push({
                    ...hotel,
                    roomTypes : availableRoomTypes 
                })
            }
        }
        

        return NextResponse.json(
            {success: true, hotels : results},
            {status : 200}
        )
    }catch(error : unknown){
         console.error("SEARCH HOTELS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error instanceof Error ? error.message : error
      },
      { status: 500 }
    );
    }
}