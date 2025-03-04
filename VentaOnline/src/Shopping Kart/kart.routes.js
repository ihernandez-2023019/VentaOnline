import { Router } from "express";
import {
    addToCart,
    getCart,
    removeFromCart,
    updateCartItem
} from "./kart.controller.js";
import {
    validateAddToCart,
    validateGetCart,
    validateRemoveFromCart,
    validateUpdateCartItem
} from "../../middlewares/validators.js";

const api = Router();

api.post(
    "/add",
    [validateAddToCart],
    addToCart
);

api.get(
    "/getKart/:userId",
    [validateGetCart],
    getCart
);

api.delete(
    "/remove",
    [validateRemoveFromCart],
    removeFromCart
);

api.put(
    "/update",
    [validateUpdateCartItem],
    updateCartItem
);

export default api;