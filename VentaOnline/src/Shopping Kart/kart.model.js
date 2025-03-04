import { Schema, model, Types } from "mongoose";
import Product from "../product/product.model.js";
import User from "../user/user.model.js";

const cartSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: User,
            required: [true, "User is required"]
        },
        items: [
            {
                product: {
                    type: Types.ObjectId,
                    ref: Product,
                    required: [true, "Product is required"]
                },
                quantity: {
                    type: Number,
                    required: [true, "Quantity is required"],
                    min: [1, "Quantity must be at least 1"]
                }
            }
        ]
    },
    { timestamps: true }
);

export default model("Cart", cartSchema);