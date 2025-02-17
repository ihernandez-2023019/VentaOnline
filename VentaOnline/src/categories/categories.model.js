import { Schema, model } from "mongoose"

export const categoriesSchema = Schema(
    {
        name:{
            type: String,
            required: [true, 'Name is required'],
            maxLenght: [25, `Can't be overcome 25 characters`]
        },
        description:{
            type: String,
            required: [true, 'Description is required']
        },
        subCategories:{
            type: String,
            maxLenght: [25, `Can't be overcome 25 characters`]
        }
    }
)

export default model('Categories', categoriesSchema)