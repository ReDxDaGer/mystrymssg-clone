import {z} from 'zod';

export const usernameValidation = z.string().min(3 , "Username must be 3 characters").max(20)
.regex(/^[a-zA-Z0-9_]+$/ , "Username can only contain letters, numbers and underscores");

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email"}),
    password: z.string().min(6 , {message: "Password must be 6 characters"}),
});