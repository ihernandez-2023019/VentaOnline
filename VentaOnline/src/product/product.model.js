import { Schema, model, Types } from "mongoose"
import Categorie from "../categories/categories.model.js"

export const productSchema = Schema(
    {
        name:{
            type: String,
            required: [true, 'Name is required'],
            maxLength: [30, `Can't be overcome 30 characters`]
        },
        brand:{
            type: String,
            required: [true, 'Brand is required']
        },
        categorie:{
            type: Types.ObjectId,
            ref: Categorie,
            required: [true, 'Categorie is required']
        },
        price:{
            type: Number,
            required: [true, 'Price is required']
        },
        dateOfEntrance:{
            type: String,
            required: [true, 'Date of Entrance is required']
        },
        stock:{
            type: Number,
            required: [true, 'Stock is required']
        }
    }
)

export default model('Product', productSchema)