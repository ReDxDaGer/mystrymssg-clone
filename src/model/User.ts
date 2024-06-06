import mongoose , {Schema , Document} from "mongoose";


export interface Messgae extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Messgae> = new Schema({
    content: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date, 
        required: true,
        default: Date.now
    }
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpire: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Messgae[];

}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String, 
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        match:[/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, 'Please fill a valid email address']
    },
    password: {
        type: String, 
        required: [true , 'Password is required'],
    },
    verifyCode: {
        type: String, 
        required: [true , 'Verify code is required'],
    },
    isVerified: {
        type: Boolean, 
        default: false
    },
    verifyCodeExpire: {
        type: Date, 
        required: true
    },
    isAcceptingMessages: {
        type: Boolean, 
        default: true,
    },
    messages: [MessageSchema]
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>('User', UserSchema));

export default UserModel;