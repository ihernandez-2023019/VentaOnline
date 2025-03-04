import { Router } from "express"
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getTopSellingProducts
} from './product.controller.js'
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"
import { validateProduct, validateUpdateProduct } from "../../middlewares/validators.js"


const api = Router()

api.post(
    '/createProduct',
    [
        validateJwt,
        isAdmin,
        validateProduct
    ],
    createProduct
)
api.get(
    '/getProducts',
    [
        validateJwt,
    ],
    getProducts
)
api.get(
    '/getProduct/:id',
    [
        validateJwt,
    ],
    getProductById
)
api.put(
    '/updateProduct/:id',
    [
        validateJwt,
        isAdmin,
        validateUpdateProduct
    ],    
    updateProduct
)
api.delete(
    '/deleteProduct/:id',
    [
        validateJwt,
        isAdmin
    ],
    deleteProduct
)
api.get('/out-of-stock', getTopSellingProducts)
 
export default api