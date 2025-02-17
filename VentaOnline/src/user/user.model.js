import { Schema, model } from "mongoose"

const userSchema = Schema(
    {
        name:{
            type: String,
            required: [true, 'Name is required'],
            maxLenght: [25, `Can't be overcome 25 characters`]
        },
        surname:{
            type: String,
            required: [true, 'Surname is required'],
            maxLenght: [25, `Can't be overcome 25 characters`]
        },
        username:{
            type: String,
            required: [true, 'Username is required'],
            unique: [true, 'Username is already taken'],
            lowercase: true,
            maxLenght: [25, `Can't be overcome 15 characters`]
        },
        email:{
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        password:{
            type: String,
            required: [true, 'Password is required'],
            minLenght: [8, 'Password must be 8 characters'],
            maxLenght: [100, `Can't be overcome 100 characters`],
        },
        phone:{
            type: String,
            required: [true, 'Phone is required'],
            minLenght: [8, `Can't be overcome 16 characters`],
            maxLenght: [15, 'Phone must be 15 numbers'],
        },
        rol:{
            type: String,
            uppercase: true,
            enum: ['ADMIN', 'CLIENT']
        }
    }
)

export default model('User', userSchema)