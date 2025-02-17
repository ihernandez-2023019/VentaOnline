import { Schema } from "mongoose"

const productSchema = Schema(
    {
        name:{
            type: String,
            required: [true, 'Name is required'],
            maxLength: [30, `Can't be overcome 30 characters`]
        },
        description:{
            type: String,
            required: [true, 'Description is required']
        },
        categorie:{
            type: String,
            required: [true, 'Categorie is required']
        },
        price:{
            type: String,
            required: [true, 'Price is required']
        },
        dateOfEntrance:{
            type: String,
            required: [true, 'Date of Entrance is required']
        },
        supplier:{
            type: String,
            requried: [true, 'supplier is required']
        }
    }
)

export default model('Product', productSchema)