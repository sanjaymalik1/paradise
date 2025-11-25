import jwt from "jsonwebtoken";

export function verifyToken(token : string){
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET!);
        return {valid : true, decoded};
    }catch(error){
        return {valid : false, decoded : null};
    }
}