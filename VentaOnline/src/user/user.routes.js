import { Router } from "express"
import { validateJwt, isAdmin, isClient} from '../../middlewares/validate.jwt.js'
import {
    getAdmins,
    getAdmin,
    editAdmin,
    deleteAdmin,
    editClient
}from "./user.controller.js"
import { updateUserAdminValidator, updateUserClientValidator } from '../../middlewares/validators.js'

const api = Router()

api.get(
    '/getUsersAdmin',
    [
        validateJwt,
        isAdmin
    ],
    getAdmins
)
api.get(
    '/getUser/:id',
    [
        validateJwt
    ],
    getAdmin
)
api.put(
    '/editUserAdmin/:id', 
    [
        validateJwt,
        updateUserAdminValidator,
        isAdmin
    ],
    editAdmin
)
api.put(
    '/editUserClient/:id', 
    [
        validateJwt,
        updateUserClientValidator,
        isClient
    ],
    editClient
)
api.delete(
    '/deleteUser/:id',
    [
        validateJwt,
        isAdmin
    ],
    deleteAdmin
)

export default api