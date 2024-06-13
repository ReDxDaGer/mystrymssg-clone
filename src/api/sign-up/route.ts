import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationsEmail } from "@/helpers/sendVerificationsEmail";

export async function POST(req:Request){
    await dbConnect();

    try{

    }catch(error){
        console.error("Error requesting User ", error)
        return Response.json(
            {
                
            }
        )
    }
}