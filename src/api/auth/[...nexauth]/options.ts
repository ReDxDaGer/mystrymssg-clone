import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "text"},
            password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any>{
                await dbConnect();
                try{
                    const User = await UserModel.findOne({$or:[
                    {email: credentials.identifier},
                    {username: credentials.identifier}
                ]})

                if(!User){
                    throw new Error("No user found!!")
                }

                if(!User.isVerified){
                    throw new Error("User is not verified, Please Verify your account first!!")
                }

                await bcrypt.compare(credentials.password, User.password);

                }catch(error: any){
                    throw new Error("Error while authorizing the user" , error);
                }
            }
        })
    ]
}