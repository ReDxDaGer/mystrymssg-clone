import {resend} from '@/lib/resend';
import VerificationEmail from '../../emails/VerificationEmail';
import { ApiResponse } from '@/types/ApiResponse';


export async function sendVerificationsEmail(
    email: string,
    username: string,
    password: string,
    verifyCode: string): Promise<ApiResponse>{
        try{
            await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email,
                subject: 'Mystry Verification Code',
                react: VerificationEmail({username , otp: verifyCode}),
              });

            return {success: true, message: "Email sent successfully"};
        }catch(emailError){
            console.error("Error Sending verification email !!",emailError);
            return {success: false, message: "Error Sending verification email"};
        }     
};