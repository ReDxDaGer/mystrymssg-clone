import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationsEmail } from "@/helpers/sendVerificationsEmail";

export async function POST(request : Request){
    await dbConnect();

    try{
        const {username , email , password} = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username, 
            isVerified : true
        })

        if(existingUserVerifiedByUsername){
            return Response.json(
                {
                    success: false,
                    message: "Username already exists"
                },
                {
                    status: 400
                }
            )
        }
        const existingUserByEmail = await UserModel.findOne({email})
        
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json(
                    {
                    success: false,
                    message: "User Already Exists with this email"
                },
                {
                    status: 400
                }
            );
            }
            else{
                const hashedPassword = await bcrypt.hash(password, 10)

                existingUserByEmail.verifyCode = verifyCode;

                existingUserByEmail.verifyCodeExpire = new Date(Date.now() + 3600000);

                await existingUserByEmail.save();

            }
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10)
            
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpire: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: []
            })

            await newUser.save();
        }

        const emailResponse = await sendVerificationsEmail(email,username,password,verifyCode);

        if(!emailResponse.success){
            return Response.json(
                {
                    success: false,
                    message: "Error sending verification email"
                },
                {
                    status: 500
                }
            );
        }

        return Response.json(
            {
                success: true,
                message: "User registered successfully. Please Verify you email"
            },
            {
                status: 201
            }
        )

    }catch(error){
        console.error("Error requesting User ", error)
        return Response.json(
            {
                success: false,
                message: "Error regestring User"
            },
            {
                status: 500
            }
        )
    }
}