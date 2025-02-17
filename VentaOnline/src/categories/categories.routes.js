import { Router } from "express"
import { validateJwt, isAdmin} from '../../middlewares/validate.jwt.js'
import {
    saveCategorie,
    getCategories,
    getCategorie,
    editCategorie,
    deleteCategorie
} from './categories.controller.js'

const api = Router()

api.post(
    '/saveCategories',
    [
        validateJwt,
        isAdmin
    ],
    saveCategorie
)

api.get(
    '/getCategories',
    [
        validateJwt,
        isAdmin
    ],
    getCategories
)

api.get(
    '/getCategorie/:id',
    [
        validateJwt,
        isAdmin
    ],
    getCategorie
)

api.put(
    '/editCategorie/:id',
    [
        validateJwt,
        isAdmin
    ],
    editCategorie
)

api.delete(
    '/deleteCategorie/:id',
    [
        validateJwt,
        isAdmin
    ],
    deleteCategorie
)

export default api