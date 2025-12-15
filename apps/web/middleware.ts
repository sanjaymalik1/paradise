// import { NextRequest, NextResponse } from "next/server";
// import { verifyToken } from "./lib/auth";

// export function middleware(req : NextRequest){
//     const protectedPaths = ["/api/bookings","/api/user"];

//     const pathName = req.nextUrl.pathname;
//     const isProtected = protectedPaths.some((path)=>{
//         return pathName.startsWith(path);
//     });

//     if(!isProtected){
//         return NextResponse.next();
//     }

//     const token= req.headers.get("authorzation")?.replace("Bearer ","");

//     if(!token){
//         return NextResponse.json(
//             {success : false, message : "No token provided"},
//             {status : 401}
//         );
//     }

//     const {valid} = verifyToken(token);

//     if(!valid){
//         return NextResponse.json(
//             {success : false, message : "Invalid or expired token"},
//             {status : 401}
//         );
//     }
    
//     return NextResponse.next();
// }

// export const config = {
//     matcher : ["/api/:path*"]
// }


import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const protectedPaths = ["/api/bookings", "/api/user"];
  const pathname = req.nextUrl.pathname;

  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = req.headers
    .get("authorization")
    ?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json(
      { success: false, message: "No token provided" },
      { status: 401 }
    );
  }

  // ❌ NO verifyToken here
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
